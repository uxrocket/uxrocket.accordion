UX Rocket Accordion
==================
İçerikler görütülenirken hareketin geçişi CSS3 transition ile tanımlanmıştır. Eski tarayıcılarda efektsiz olarak çalışmaktadır.

## Kurulum
UX Rocket Accordion'u `lib` klasöründeki dosyaları projenizin içerisine kopyalayarak kullanmaya başlayabilirsiniz. Ya da, [npm](https://www.npmjs.org/) veya [bower](http://bower.io) paket olarak kullanabilirsiniz. Bunun için, aşağıdaki komutları çağırmanız yeterlidir.

__npm__
```Shell
npm install uxrocket.accordion
```

ya da __bower__

```Shell
bower install uxrocket.accordion
```

### Geliştirme İçin
Geliştirme sırasında sisteminize doğrudan ekleyerek kullanmak için, `lib` klasörü içindeki kaynak dosyalarını `Sass` ve `JS` dosyalarınızın içerisine __import__ gerekmektedir.

```SCSS
// Plugin stilleri
@import "<path-to-accordion>/lib/uxrocket-accordion";

// Sonra kendi stilleriniz
```

```JS
// Grunt ya da Gulp kullanıyorsanız JS içerisine import etmeniz gerekmiyor.
// Codekit ve benzeri araçlar için. 
// @codekit-append '<path-to-accordion>/lib/uxrocket.accordiong.js'
```

### Doğrudan Kullanım İçin
__HTML__ nizin içinde jQuery'den sonra `uxrocket.accordion.js` dosyasını ekleyiniz ve `head` içine 
```HTML
<head>
    ...
    <link rel="stylesheet" href="<path-to-accordion>/dist/uxrocket-accordion.css" />
    <script src="<path-to-jquery>/jquery.js"></script>
    <script src="<path-to-accordion>/uxrocket.accordion.js"></script>
    ...
</head>
```


## Kullanım
Elemanların birbirleri ile etkileşimi ve açılma/kapanma işlemleri için minimum HTML yapısı aşağıdaki gibidir.
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

Yukarıdaki gibi HTML yapısını oluşturduktan sonra JavaScript içerisinde plugini aşağıdaki gibi çağırabilirsiniz.
```JavaScript
$(function(){
    // standart 
    $('.collapsible').accordion();
    
    // özelleştirilmiş
    $('.collapsiple').accordion({
        closeSiblings: false
    });
});
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
