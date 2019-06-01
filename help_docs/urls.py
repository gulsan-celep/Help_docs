from django.urls import path

from help_docs import views

urlpatterns = [
    path('', views.anasayfa, name='anasayfa'),
    path('content_list', views.content_list, name='content_list'),
    path('upload_image', views.upload_image, name='upload_image'),
    path('ust_menu_ekle', views.ust_menu_ekle, name='ust_menu_ekle'),
    path('edit_ustmenu', views.edit_ustmenu, name='edit_ustmenu'),
    path('delete_menu', views.delete_menu, name='delete_menu'),
    path('edit_alt_menu', views.edit_alt_menu, name='edit_alt_menu'),
    path('delete_alt_menu', views.delete_alt_menu, name='delete_alt_menu'),
    path('ust_menu_olustur', views.ust_menu_olustur, name='ust_menu_olustur'),
    path('alt_menu_olustur', views.alt_menu_olustur, name='alt_menu_olustur'),
    path('alt_menu_ekle', views.alt_menu_ekle, name='alt_menu_ekle'),
    path('new_Content', views.new_Content, name='new_Content'),
    path('delete_icerik', views.delete_icerik, name='delete_icerik'),
    path('menu_filter', views.menu_filter, name='menu_filter'),
    path('edit_icerik', views.edit_icerik, name='edit_icerik'),
    path('icerik_save', views.icerik_save, name='icerik_save'),
    path('show_content/<int:id>', views.show_content, name='show_content'),
    path('user_login', views.user_login, name='user_login'),
    path('user_login_show', views.user_login_show, name='user_login_show'),
    path('user_logout', views.user_logout, name='user_logout'),
    path('image_gallery', views.image_gallery, name='image_gallery'),
    path('delete_image', views.delete_image, name='delete_image'),
    path('get_ust_menu_data', views.get_ust_menu_data, name='get_ust_menu_data'),
    path('get_alt_menu_data', views.get_alt_menu_data, name='get_alt_menu_data'),
    path('get_content_data', views.get_content_data, name='get_content_data'),
]
