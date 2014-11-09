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
Aynı ebeveyn içindeki akordiyon elemanlar birbirleri ile etkileşimli olarak çalışırlar. Bir akordiyonun açık gelmesi için `current {.classname}` classı eklenmesi yeterlidir.

### Tanımlar
Property			 | Default			    | Açıklama
-------------------- | -------------------- | ------------------------------------------------------------------------
header               | .collapsible-header  | Akordiyonun açılma/kapanma aksiyonlarını tetikleyen başlık satırı
content              | .collapsible-content | Akordiyonun içeriği. Metin, tablo, form, resim içerik kısıtlaması yoktur.
current              | current              | Aktif olan akordiyon elemanı için tanımlanan CSS classı.
closeSiblings        | true                 | Akordiyon açıldığında, aynı ebeveyn içindeki diğer akordiyonların kapanması ya da açık kalmasını belirler. `true` değerinde, diğer akordiyonlar kapanır.

### Public Metodlar
Method						     | Açıklama
-------------------------------- | -------------------------------------------------------
$(selector).collapsible(options) | Bu method plugini manuel olarak bir elemana bağlamanızı sağlar.
$.uxcollapsible                  | Bu method pluginin detayını görmenizi sağlar.
$.uxcollapsible.version          | Sayfaya eklenmiş pluginin versiyon numarasını gösterir.
$.uxcollapsible.settings         | Aktif pluginin ayarlarını gösterir.
