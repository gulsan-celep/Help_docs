from django.db import models
from ckeditor.fields import RichTextField

class UstMenu(models.Model):
    isim = models.CharField(max_length=100, verbose_name='Kategori İsim')

    class Meta:
        verbose_name_plural = 'Ust Menu'

    def __str__(self):
        return self.isim


class AltMenu(models.Model):
    menu_isim = models.CharField(max_length=100, verbose_name='Kategori İsim')
    ust_menu = models.ForeignKey(UstMenu,on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Alt Menu'

    def __str__(self):
        return self.menu_isim


class NewContent(models.Model):
    content = RichTextField()
    ust_menu = models.ForeignKey(UstMenu, on_delete=models.CASCADE)
    alt_menu = models.ForeignKey(AltMenu, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'İçerik'

    def __str__(self):
        return self.content


class Document(models.Model):
    document = models.FileField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)


class ViewPermissions(models.Model):
    class Meta:
        managed = False

        permissions = (
            ('view_content_list', 'İçerik sekmesini görebilir.'),
            ('view_new_Content', 'İçerik oluşturulduğu sekmeyi görebilir.'),
            ('view_show_content', 'İçerik sekmesini görebilir.'),
            ('view_alt_menu_olustur', 'Alt menü sekmesini görebilir.'),
            ('view_ust_menu_olustur', 'Üst menü sekmesini görebilir.'),
            ('view_image_gallery', 'Image sekmesini görebilir.'),
        )
