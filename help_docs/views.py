from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from help_docs.forms import DocumentForm
from help_docs.models import UstMenu, AltMenu, NewContent, Document


def anasayfa(request):
    posts = UstMenu.objects.all().order_by('id')
    response = list()
    for post in posts:
        temp = dict()
        temp['id'] = post.id
        temp['name'] = post.isim
        temp['alt_menu'] = []
        alt_menuler = AltMenu.objects.filter(ust_menu=post).order_by('id')
        for alt in alt_menuler:
            temp2 = dict()
            temp2['id'] = alt.id
            temp2['name'] = alt.menu_isim
            temp['alt_menu'].append(temp2)
        response.append(temp)
    contents = NewContent.objects.all().order_by('id')
    return render(request, 'base.html', {'response': response, 'contents': contents})


@permission_required('help_docs.view_image_gallery', raise_exception=True)
def image_gallery(request):
    image = Document.objects.all()
    print(image)
    return render(request, 'image_gallery.html', {'image': image})


@permission_required('help_docs.view_content_list', raise_exception=True)
def content_list(request):
    return render(request, 'content_list.html')


@permission_required('help_docs.view_new_Content', raise_exception=True)
def new_Content(request):
    alt = AltMenu.objects.all()
    ust = UstMenu.objects.all()
    return render(request, 'new_content.html', {'alt': alt, 'ust': ust})


@csrf_exempt
@permission_required('help_docs.view_show_content', raise_exception=True)
def show_content(request, id):
    if request.method == 'POST':
        response = dict()
        icerik = NewContent.objects.get(id=id)
        response['content'] = icerik.content
        response['ust_menu'] = icerik.ust_menu.id
        return JsonResponse(response, safe=False)
    else:
        id = id
        response = UstMenu.objects.all()
        content = NewContent.objects.get(id=id)
        selectedd_ust_menu = content.ust_menu.id
        selectedd_alt_menu = content.alt_menu.id if content.alt_menu else ""
        return render(request, 'edit_content.html', {'id': id, 'response': response, 'ust': selectedd_ust_menu, 'alt': selectedd_alt_menu})


@csrf_exempt
def menu_filter(request):
    response = list()
    id = request.POST.get('id')
    alt_menu = AltMenu.objects.filter(ust_menu_id=id)
    for alt in alt_menu:
        temp = dict()
        temp["id"] = alt.id
        temp["name"] = alt.menu_isim
        response.append(temp)
    return JsonResponse(response, safe=False)


@csrf_exempt
def icerik_save(request):
    response = {}
    if request.method == 'POST':
        icerik = NewContent()
        icerik.content = request.POST.get('content', None)
        id = request.POST.get('id')
        icerik.ust_menu = UstMenu.objects.get(id=id)
        alt_id = request.POST.get('alt_id')
        if alt_id:
            icerik.alt_menu = AltMenu.objects.get(id=alt_id)
        icerik.save()
        response['status'] = True
    else:
        response['status'] = False
    return JsonResponse(response, safe=False)


@permission_required('help_docs.view_alt_menu_olustur', raise_exception=True)
def alt_menu_olustur(request):
    ust_menus = UstMenu.objects.all()
    return render(request, 'alt_menu.html', {'ust':ust_menus})


@permission_required('help_docs.view_ust_menu_olustur', raise_exception=True)
def ust_menu_olustur(request):
    return render(request, 'ust_menu.html')


@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        document = Document()
        document.document = request.FILES['upload']
        document.save()
        url = document.document.url
        retdata = {'url': url, 'uploaded': '1',
                   'fileName': document.document.name}
        return JsonResponse(retdata)


@csrf_exempt
def ust_menu_ekle(request):
    response = {}
    if request.method == 'POST':
        menu = UstMenu()
        menu.isim = request.POST.get('ad', None)
        menu.save()
        response['status'] = True
    else:
        response['status'] = False
    return JsonResponse(response, safe=False)


@csrf_exempt
def alt_menu_ekle(request):
    response = {}
    if request.method == 'POST':
        alt_menu = AltMenu()
        alt_menu.menu_isim = request.POST.get('adi')
        alt_menu.ust_menu = UstMenu.objects.get(id=request.POST.get('sec'))
        alt_menu.save()
        response['status'] = True
    else:
        response['status'] = False
    return JsonResponse(response, safe=False)


def get_ust_menu_data(request):
    ust_menus = UstMenu.objects.all()
    response = list()
    for ust_menu in ust_menus:
        temp = dict()
        temp['id'] = ust_menu.id
        temp['name'] = ust_menu.isim
        response.append(temp)
    return JsonResponse(response, safe=False)


def get_content_data(request):
    contents = NewContent.objects.all()
    response = list()
    for content in contents:
        temp = dict()
        temp['id'] = content.id
        temp['content'] = content.content
        temp['ust_menu'] = content.ust_menu.isim
        temp['alt_menu'] = content.alt_menu.menu_isim if content.alt_menu else "---"
        response.append(temp)
    return JsonResponse(response, safe=False)


def get_alt_menu_data(request):
    alts = AltMenu.objects.all()
    response = list()
    for alt in alts:
        temp = dict()
        temp['id'] = alt.id
        temp['name'] = alt.menu_isim
        temp['ust_menu'] = alt.ust_menu.isim
        response.append(temp)
    return JsonResponse(response, safe=False)


@csrf_exempt
def edit_ustmenu(request):
    response = dict()
    try:
        if request.method == 'GET':
            id = request.GET.get('id')
            menu = UstMenu.objects.get(id=id)
            response['ustmenu'] = menu.isim
            response['status'] = True
        else:
            id = request.POST.get('id')
            menu = UstMenu.objects.get(id=id)
            isim = request.POST.get('ad')
            menu.isim = isim
            menu.save()
            response['status'] = True
    except Exception as e:
        print(str(e))
        response['status'] = False
    return JsonResponse(response, safe=False)


@csrf_exempt
def delete_menu(request):
    id = request.POST.get('id')
    try:
        ust_menu = UstMenu.objects.get(id=id)
        print(ust_menu)
        ust_menu.delete()
        return JsonResponse({'message': True}, safe=False)
    except Exception as e:
        return JsonResponse({'message': False}, safe=False)


@csrf_exempt
def delete_image(request):
    id = request.POST.get('id')
    try:
        image = Document.objects.get(id=id)
        image.delete()
        return JsonResponse({'message': True}, safe=False)
    except Exception as e:
        return JsonResponse({'message': False}, safe=False)


@csrf_exempt
def edit_alt_menu(request):
    response = dict()
    try:
        if request.method == 'GET':
            id = request.GET.get('id')
            menu = AltMenu.objects.get(id=id)
            response['ust_menu'] = menu.ust_menu.id
            response['altmenu'] = menu.menu_isim
            response['status'] = True
        else:
            id = request.POST.get('id')
            menu = AltMenu.objects.get(id=id)
            isim = request.POST.get('ad')
            menu.menu_isim = isim
            menu.save()
            response['status'] = True
    except Exception as e:
        print(str(e))
        response['status'] = False
    return JsonResponse(response, safe=False)


@csrf_exempt
def delete_alt_menu(request):
    id = request.POST.get('id')
    print(id)
    try:
        alt_menu = AltMenu.objects.get(id=id)
        print(alt_menu)
        alt_menu.delete()
        return JsonResponse({'message': True}, safe=False)
    except Exception as e:
        return JsonResponse({'message': False}, safe=False)


@csrf_exempt
def delete_icerik(request):
    id = request.POST.get('id')
    try:
        content = NewContent.objects.get(id=id)
        content.delete()
        return JsonResponse({'message': True}, safe=False)
    except Exception as e:
        return JsonResponse({'message': False}, safe=False)


@csrf_exempt
def edit_icerik(request):
    response = dict()
    if request.method == 'POST':
        id = request.POST.get('id')
        content = NewContent.objects.get(id=id)
        icerik = request.POST.get('editor')
        content.content = icerik
        ust_id = request.POST.get('ust_id')
        content.ust_menu = UstMenu.objects.get(id=ust_id)
        alt_id = request.POST.get('alt_id')
        if alt_id:
            content.alt_menu = AltMenu.objects.get(id=alt_id)
        content.save()
        response['status'] = True
    else:
        id = request.GET.get('id')
        print()
        content = NewContent.objects.get(id=id)
        response['content'] = content.content
        response['ust_menu'] = content.ust_menu.isim
        if content.alt_menu:
            response['altmenu'] = content.alt_menu
            response['status'] = False
    return JsonResponse(response, safe=False)


def user_login_show(request):
    return render(request, 'user_login.html', {})


def user_login(request):
    response = {}
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        if user.is_active:
            response['status'] = True
            response['username'] = user.username
            login(request, user)
        else:
            response['status'] = False
    return JsonResponse(response, safe=False)


def user_logout(request):
    logout(request)
    return redirect('anasayfa')
