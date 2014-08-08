# Nar.js [![Build Status](https://api.travis-ci.org/legokichi/Nar.js.png)](http://travis-ci.org/legokichi/Nar.js)

[![npm](https://nodei.co/npm/legokichi.Nar.js.png?downloads=true&stars=true)](https://nodei.co/npm/legokichi.nar.js/)

read .nar file of "Nanika Archive".

## Document

- [Nar.js wiki](https://github.com/legokichi/Nar.js/wiki/IframeInserter)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))

## How to use

### Browser

```js
  new Nar("./nar/emily4.nar", function(nar) {

    nar.shell.master["surface0.png"].load(function(img) {
      document.body.appendChild(img);
    });

    nar.ghost.master["descript.txt"].load(function(txt) {
      var pre = document.createElement("pre");
      pre.innerHTML = txt;
      document.body.appendChild(pre);
    });

  });
```

## Features

- Text file encoding is converted to "UTF-8".
- Image file is converted to "[object HTMLImageElement]".
- The others get as blob Object.

## Dependence

- zip.js, mime-types.js, inflate.js <[zip.js](http://gildas-lormeau.github.com/zip.js/)>
- encoding.js <[Unzipper.js](https://github.com/polygonplanet/Unzipper.js/)>



## Acknowledgements

- ls for developing the original Ukagaka software <[usada.sakura.vg](http://usada.sakura.vg/)>
- SSP project <[ssp.shillest.net](http://ssp.shillest.net/)> for high quality Ukagaka clones. (I did not use their code, but studied them extensively)
- Thanks for ["UKAGAKA" System Documentation Project](http://code.google.com/p/ukadoc/)

## See also

* [Ikagaka.js](https://github.com/legokichi/ikagaka.js/)
