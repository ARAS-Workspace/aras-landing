# Gizlilik Bildirimi — ARAS Workspace (aras.tc)

**Son Güncelleme:** Şubat 2026

## Genel Bakış

ARAS Workspace ([aras.tc](https://www.aras.tc/)), Cloudflare Pages üzerinde barındırılan statik bir açılış sayfasıdır. Bu bildirim, web sitesinin hangi verileri işlediğini, bu verilerin nasıl ele alındığını ve hangi teknolojilerin kullanıldığını açıklamaktadır.

## Bu Web Sitesi Hangi Verileri İşler?

### IP Adresi

Web sitesini ziyaret ettiğinizde, IP adresiniz Cloudflare tarafından sağlanan `CF-Connecting-IP` HTTP başlığı kullanılarak elde edilir. Bu, Cloudflare ağından geçen her isteğe Cloudflare'ın eklediği standart bir başlıktır.

- **Nasıl çalışır:** Web sitesi, `CF-Connecting-IP` başlığını okuyan ve IP adresinizi `/ip` API uç noktası aracılığıyla döndüren bir Cloudflare Worker (`_worker.js`) kullanır.
- **Amaç:** IP adresiniz, sayfa üzerindeki terminal tarzı arayüzde **yalnızca size** gösterilir.
- **Depolama:** IP adresiniz herhangi bir sunucuya, veritabanına veya üçüncü tarafa **kaydedilmez, günlüklenmez veya iletilmez**. Yalnızca tarayıcınıza döndürülen HTTP yanıtında bulunur.

### Konum Verisi

Yaklaşık konum bilgisi (şehir, bölge, ülke), Cloudflare'ın `request.cf` nesnesinden elde edilir. Bu coğrafi konum verisi, Cloudflare tarafından uç sunucu düzeyinde IP adresinize dayanarak belirlenir.

- **Nasıl çalışır:** Cloudflare Worker, `request.cf.city`, `request.cf.region` ve `request.cf.country` değerlerini okur ve bunları IP adresinizle birlikte `/ip` API uç noktası aracılığıyla döndürür.
- **Amaç:** Yaklaşık konumunuz, sayfa üzerinde **yalnızca size** gösterilir.
- **Depolama:** Konum verisi herhangi bir sunucuya, veritabanına veya üçüncü tarafa **kaydedilmez, günlüklenmez veya iletilmez**.
- **Doğruluk:** Bu, Cloudflare'ın IP veritabanına dayalı yaklaşık bir coğrafi konumdur. Kesin fiziksel konumunuzu değil, bağlı olduğunuz ağın konumunu yansıtır.

## Teknik Uygulama

### Cloudflare Worker (`_worker.js`)

Web sitesi, gelişmiş modda bir Cloudflare Pages Worker kullanmaktadır. Worker:

1. `/ip` uç noktasına gelen istekleri yakalar
2. `CF-Connecting-IP` başlığını ve `request.cf` nesnesini okur
3. IP ve konum bilgilerinizi içeren bir JSON yanıtı döndürür — örn. `{"ip": "203.0.113.1", "location": "Istanbul, 34, TR"}`
4. Diğer tüm istekleri statik dosyalara (HTML, CSS, fontlar, görseller) yönlendirir

Worker'da günlük kaydı, analitik veya harici API çağrısı bulunmaz. Verileri tamamen Cloudflare'ın uç sunucusunda işler ve doğrudan tarayıcınıza döndürür.

### İstemci Tarafı Davranış

`index.html` sayfası yüklendiğinde tek bir `fetch('/ip')` isteği yapar. Döndürülen IP ve konum verisi DOM'a işlenir. Başka herhangi bir yere veri gönderilmez.

## Bu Web Sitesinin Yapmadıkları

- **Analitik veya telemetri yoktur.** Google Analytics, Plausible, Fathom veya başka herhangi bir analitik hizmeti kullanılmaz.
- **İzleme çerezleri veya parmak izi takibi yoktur.** Çerez oluşturulmaz. Parmak izi betikleri yüklenmez.
- **Üçüncü taraf betikleri yoktur.** Sayfa harici JavaScript yüklemez. Tüm fontlar kendi sunucusunda barındırılır.
- **Veri toplama yoktur.** IP ve konum bilgileriniz size gösterilir ve atılır — hiçbir zaman kaydedilmez.
- **Kullanıcı hesabı veya kayıt yoktur.** Web sitesi kullanıcı hesabı yönetmez.
- **Veri paylaşımı yoktur.** Standart Cloudflare altyapısı dışında herhangi bir üçüncü tarafa veri iletilmez.
- **Kullanıcı verilerinin sunucu tarafında günlüklenmesi yoktur.** Cloudflare Worker herhangi bir günlük, veritabanı veya depolama birimine yazma işlemi yapmaz.

## Dış Ağ Bağlantıları

### Cloudflare (Altyapı)

Web sitesi Cloudflare Pages üzerinde barındırılmaktadır. Tüm istekler Cloudflare'ın küresel ağı üzerinden geçer. Cloudflare'ın kendi gizlilik politikası, altyapı düzeyindeki işlemleri için geçerlidir:

- **Cloudflare Gizlilik Politikası:** [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/)

Bu web sitesi tarafından başka herhangi bir harici hizmet veya API ile iletişim kurulmaz.

## Veri Depolama

### Kalıcı Depolama Yoktur

Bu web sitesi, kullanıcı verileri için herhangi bir veritabanı, günlük dosyası, çerez, localStorage (tema tercihi dışında) veya kalıcı depolama mekanizması **kullanmaz**.

Tarayıcı depolamasının tek kullanımı, tema tercihiniz (koyu/açık mod) için `localStorage`'dır ve bu kişisel veri içermez.

## Açık Kaynak ve Şeffaflık

ARAS Workspace açık kaynaklı bir projedir. Cloudflare Worker, HTML sayfası ve tüm varlıklar dahil olmak üzere kod tabanının tamamı GitHub üzerinde herkese açık ve denetlenebilir durumdadır:

**Repository:** [github.com/ARAS-Workspace/aras-landing](https://github.com/ARAS-Workspace/aras-landing)

Web sitesinin üretim dağıtımı, Cloudflare Pages'in CI/CD entegrasyonu aracılığıyla doğrudan bu repository üzerinden yönetilmektedir. Bu şu anlama gelir:

- **Her kod değişikliği izlenebilir.** Web sitesine yapılan tüm güncellemeler herkese açık repository'ye commit edilir ve dağıtım pipeline'ını tetikler.
- **Gizli değişiklik yoktur.** Üretim ortamı, GitHub'da inceleyebileceğiniz kaynak kodun aynısından derlenir ve dağıtılır.
- **Denetlenebilir altyapı.** IP verilerinizi işleyen `_worker.js` dosyası herkese açık repository'nin bir parçasıdır ve herkes tarafından incelenebilir.

## Haklarınız ve Kontrolünüz

- **Şeffaflık:** Tüm kaynak kodu açık kaynaklıdır ve GitHub üzerinde denetlenebilir
- **Doğrulanabilir dağıtım:** Üretim sitesi, doğrudan herkese açık repository üzerinden CI/CD aracılığıyla dağıtılır
- **Silinecek veri yoktur:** Kişisel veri saklanmadığından, silinmesini talep edecek bir şey bulunmamaktadır
- **Tema tercihi:** Bu alan adı için tarayıcınızın localStorage'ını temizleyerek tema tercihinizi sıfırlayabilirsiniz

## Bu Bildirimde Yapılacak Değişiklikler

Bu gizlilik bildirimi, web sitesi geliştikçe güncellenebilir. Değişiklikler, güncellenmiş tarih ile bu dosyaya yansıtılacak ve herkese açık GitHub repository'sinde görünür olacaktır.

## İletişim

Bu gizlilik bildirimi veya ARAS Workspace web sitesi hakkında sorularınız için:

**Rıza Emre ARAS** — [r.emrearas@proton.me](mailto:r.emrearas@proton.me)