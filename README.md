UX Rocket Accordion
==================
İçeriklerin açılır/kapanır şekilde gözükmesini sağlar. Açılıp/kapanma için CSS ya da JS animasyonları seçilebilir. _Overwrite_ ihtiyacının azaltılması için, plugin stilleri içinde sadece açma/kapama işlemleri için ihtiyaç duyulan tanımlar bulunmaktadır.

## Kurulum
UX Rocket Accordion'u ihtiyacınıza göre `dist` klasöründeki dosyaları projenizin içerisine kopyalayarak ya da `lib` klasöründeki kaynak kodlarını projenize ekleyerek kullanmaya başlayabilirsiniz. Ya da, [npm](https://www.npmjs.org/) veya [bower](http://bower.io) paket olarak kullanabilirsiniz. Bunun için, aşağıdaki komutları çağırmanız yeterlidir.

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
// styles.scss
// Plugin stilleri
@import "<path-to-accordion>/lib/_uxrocket-accordion";

// Sonra kendi stilleriniz
```

```JS
// app.js
// Grunt ya da Gulp kullanıyorsanız JS içerisine import etmeniz gerekmiyor.
// Codekit ve benzeri araçlar için. 
// @codekit-append '<path-to-accordion>/lib/uxrocket.accordion.js'
```

### Doğrudan Kullanım İçin
__HTML__ nizin içinde jQuery'den sonra `uxrocket.accordion.min.js` dosyasını ekleyiniz ve `head` içine 
```HTML
<head>
    ...
    <link rel="stylesheet" href="<path-to-accordion>/dist/uxrocket.accordion.min.css" />
    <script src="<path-to-jquery>/jquery.js"></script>
    <script src="<path-to-accordion>/dist/uxrocket.accordion.min.js"></script>
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
    $('.collapsible').collapsible();
    
    // özelleştirilmiş
    $('.collapsiple').collapsible({
        closeSiblings: true
    });
});
```

### Notlar
__Bir Elemanı Başlangıçta Açık Getirme__
Aynı ebeveyn içindeki akordiyon elemanlar birbirleri ile etkileşimli olarak çalışırlar. Bir akordiyonun açık gelmesi için `uxr-collapsible-current` classı eklenmesi yeterlidir.

__İç içe Akordiyon__
Akordiyon elemanları çalışırken her zaman `>` şeklinde seçilen ilk seviye _header_ ve _content_ olarak belirlenmiş elemanları kontrol etmektedir. Dolayısı ile bir _content_ içine tanımlanacak yukarıdaki [örnekte](#doğrudan-kullanım-İçin) belirtilen yapıda istenildiği kadar iç içe akordiyon oluşturulabilir.

__Yana Açılır Akordiyon__
Bazı durumlarda akordiyon elemanların alta doğru değil de yana doğru açılması istenebilir. _JS Animasyon_ kullanıldığı durumlarda bunu `slideUp/Down` metodları kullanıldığı için yana doğru açmak kolayca mümkün olmayacak. Dilenirse, yana açmak istenen elemanların _runtime_ sırasında `animate` metodu _overwrite_ edilebilir. _CSS Animasyon_ kullanıldığı durumlarda ise, kolayca aşağıdaki yöntem izlenebilir

```scss
.uxr-collapsible-animateCSS > .uxr-collapsible-content {
  width: 0;
}

.uxr-collapsible-current.uxr-collapsible-animateCSS > .uxr-collapsible-content {
  width: auto;
}
```


### Tanımlar
Property			 | Default			    | Açıklama
-------------------- | -------------------- | ------------------------------------------------------------------------
header               | .collapsible-header  | Akordiyonun açılma/kapanma aksiyonlarını tetikleyen başlık satırı
content              | .collapsible-content | Akordiyonun içeriği. Metin, tablo, form, resim içerik kısıtlaması yoktur.
closeSiblings        | false                | Akordiyon açıldığında, aynı ebeveyn içindeki diğer akordiyonların kapanması ya da açık kalmasını belirler. `true` değerinde, diğer akordiyonlar kapanır.
animateWith			 | css					| __css__ ya da __js__ parametrelerini alır. Akordiyonlar açılıp/kapanırken animasyonun CSS ile mi yoksa JS ile mi olacağını belirler. JS durumunda `slideUp`/`slideDown` şeklinde çalışır. CSS durumunda ise CSS ile tanımlanmış şekilde çalışır.
duration			 | 200					| JS animate kullanırken, animasyon süresini belirler.

Callback			 | &nbsp;
-------------------- | -----
onReady              | Akordiyon plugini elemanlara bağlandığında çalışacak fonksiyonu çağırır.
onOpen       	     | Akordiyon elemanı açıldığında çalışacak fonksiyonu çağırır.
onClose		         | Akordiyon elemanı kapandığından çalışacak fonksiyonu çağırır.
waitOnOpen		     | Akordiyon elemanına tıklandığında init olur ve fonksiyonun true dönmesini bekler.

Event   			 | &nbsp;
-------------------- | -----
uxrexpanded             | Bir `uxr-collapsible-node` elemanı açıldığında, bu eleman üzerinde _trigger_ metodu ile çalışan _event_ tir. Plugin bind olurken yapılan `onOpen` callbacki de bu event ile çalışmaktadır.
uxrcollapsed         | Bir `uxr-collapsible-node` elemanı kapandığında, bu eleman üzerinde _trigger_ metodu ile çalışan _event_ tir. Plugin bind olurken yapılan `onClose` callbacki de bu event ile çalışmaktadır.

### Public Metodlar
Method						     | Açıklama
-------------------------------- | -------------------------------------------------------
$(selector).collapsible(options) | Bu method plugini manuel olarak bir elemana bağlamanızı sağlar.
$.uxcollapsible                  | Bu method pluginin detayını görmenizi sağlar.
$.uxcollapsible.version          | Sayfaya eklenmiş pluginin versiyon numarasını gösterir.
$.uxcollapsible.settings         | Aktif pluginin ayarlarını gösterir.
