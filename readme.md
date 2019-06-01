# HELP DOCS
## Bu projenin amacı:
Diyelim ki bir tane web siteniz var ve kullanıcılar nasıl kullanacaklarını, sitenizin özelliklerini tam olarak bilmiyorlar. Bu projede sitenizin yardım dokümanını oluşturabilirsiniz ve sitenize plugin edebilirsiniz. 
## Projenin özellikleri:
- Kullanıcıların ve müşterilerin ulaşabileceği bölümler vardır.
- Müşteriler sadece single page olarak projeyi görebilirler. Kullanıcı olmayan kişiler diğer sayfalara ulaşamazlar.
- Kullanıcı diğer sayfaları görmek için öncelikle login olmalıdır. Sadece kullanıcının böyle bir ekranın olduğunu bilmeleri için sayfaya login olabilecekleri bir alan koyulmamıştır. Sadece kullanıcı ‘user_login_show’ urli ile giriş yapabilir.
- Register diye bir alan yoktur. Sadece bu siteyi kullanan kişi girebilir.
- Login olan kullanıcı ana sayfada yönetim alanını görebilecektir.
- Bu projede içerik, menü hepsi dinamiktir. Kullanıcı hangi dokümanı anlatmak isterse onun bilgilerini girebilir.
- Yönetim alanında oluşturabileceği içerik ve menü alanı vardır.
- Oluşturmak istediği menüde 2 seçeneği vardır. Sadece menüde tıklayınca gideceği başlık bulunsun istiyorsa üst menü sayfasına gitmelidir.
- Üst menü sayfasında üst menü oluştur, düzenle ve sil seçenekleri vardır. Bunlara tıklayınca bir modal açılacaktır ve bilgileri girebileceğiniz bir alan vardır. Sil seçeneğini swal ile oluşturdum.
- Üst menüyü oluşturduktan sonra bu başlığın daha detaylı olmasını isterseniz alt menü diye bir seçenek vardır. Alt menü sayfasında alt menüyü oluştur, düzenle ve sil seçenekleri vardır. Bu seçenekler modal ile oluşturuldu. Alt menü oluşturken, oluşturmak istediğiniz alt menünün üst menüsünü seçebilirsiniz. Sil seçeneği swal ile oluşturdum.
- Oluşturduğunuz menünün içeriğini girebileceğiniz bir içerik sayfası vardır. Bu sayfada içerik oluştur, düzenle ve sil seçenekleri vardır. İçerikleri girebileceğiniz alanı CKEditör ile oluşturdum. Böylelikle dokümanın tasarımına siz karar verebilirsiniz. 
- CKEditörde yüklemek istediğiniz resimi  ckeditörüm image kısmında seçerek boyutunu belirleyebilirsiniz ya da resimi sürükle bırak yöntemiyle sunucuya yükleyebilirsiniz. 
- Sürekli siteme resimi yüklemek yerine size ek bir seçenek daha sunuyorum. Yüklediğiniz içerik veri tabanına kayıt edilir. Bu resimleri galeri sayfasından ulaşabilirsiniz ya da resimi yüklerken sunucuya göz at seçeneğiyle resime ulaşabilirsiniz.
- Oluşturduğunuz bütün içerikler veri tabanına kaydedilir ve kaydettiğiniz sıraya göre müşterinin görebileceği sayfada yerini alır.
- Yönetim sayfasında oluşturduğunuz bütün içerikleri Datatable ile listeledim.
- Müşterilerin arama yapabileceği search bölümü yaptım. Girdikleri içeriği ileri geri butonlarıyla hangi bölümlerde geçtiğini görebilir.
## Geliştirme Ortamı
PyCharm/Postgresql/Html/Css/Bootstrap/Javascript/jQuery
## Dil
Python Django

