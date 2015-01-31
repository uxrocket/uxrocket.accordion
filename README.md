UX Rocket Accordion
==================

İçerikler görütülenirken hareketin geçişi CSS3 transition ile tanımlanmıştır. Eski tarayıcılarda efektsiz olarak çalışmaktadır.


```HTML
<div class="collapsible">
    <h3 class="collapsible-header"></h3>
    <div class="collapsible-content"></div>
</div>
<div class="collapsible">
    <h3 class="collapsible-header"></h3>
    <div class="collapsible-content"></div>
</div>
```

### Notlar
Aynı ebeveyn içindeki akordiyon elemanlar birbirleri ile etkileşimli olarak çalışırlar. Bir akordiyonun açık gelmesi için `current` classı eklenmesi yeterlidir.

### Tanımlar
Property			 | Default			    | Açıklama
-------------------- | -------------------- | ------------------------------------------------------------------------
header               | .collapsible-header  | Akordiyonun açılma/kapanma aksiyonlarını tetikleyen başlık satırı
content              | .collapsible-content | Akordiyonun içeriği. Metin, tablo, form, resim içerik kısıtlaması yoktur.
current              | current              | Aktif olan akordiyon elemanı için tanımlanan CSS classı.
closeSiblings        | true                 | Akordiyon açıldığında, aynı ebeveyn içindeki diğer akordiyonların kapanması ya da açık kalmasını belirler. `true` değerinde, diğer akordiyonlar kapanır.
animateWith			 | css					| __css__ ya da __js__ parametrelerini alır. Akordiyonlar açılıp/kapanırken animasyonun CSS ile mi yoksa JS ile mi olacağını belirler. JS durumunda slideUp/Down şeklinde çalışır. CSS durumunda ise CSS ile tanımlanmış şekilde çalışır.
duration			 | 200					| JS animate kullanırken, animasyon süresini belirler.

Callback			 | &nbsp;
-------------------- | -----
onReady              | Akordiyon plugini elemanlara bağlandığında çalışacak fonksiyonu çağırır.
onOpen       	     | Akordiyon elemanı açıldığında çalışacak fonksiyonu çağırır.
onClose		         | Akordiyon elemanı kapandığından çalışacak fonksiyonu çağırır.

### Public Metodlar
Method						     | Açıklama
-------------------------------- | -------------------------------------------------------
$(selector).collapsible(options) | Bu method plugini manuel olarak bir elemana bağlamanızı sağlar.
$.uxcollapsible                  | Bu method pluginin detayını görmenizi sağlar.
$.uxcollapsible.version          | Sayfaya eklenmiş pluginin versiyon numarasını gösterir.
$.uxcollapsible.settings         | Aktif pluginin ayarlarını gösterir.
