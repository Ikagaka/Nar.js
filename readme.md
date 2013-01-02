Nar.js
======================
  Nar.js can read .nar file of "Nanika Archive".

Demo
----------
* https://dl.dropbox.com/u/265158/GitHub/nar.js/index.html
* It use [Emily/Phase4.5](http://ssp.shillest.net/ghost.html) as demo.

Usage
----------
    new Nar("./nar/emily4.nar", function(nar) {

      console.dir(nar);

      nar.shell.master["surface0.png"].load(function(img) {
        document.body.appendChild(img);
      });

      nar.ghost.master["descript.txt"].load(function(txt) {
        var pre = document.createElement("pre");
        pre.innerHTML = txt;
        document.body.appendChild(pre);
      });

    });

Features
----------------
* Text file encoding is converted to "UTF-8".
* Image file is converted to "[object HTMLImageElement]".
* The others get as blob Object.
* If you read a file once, it is cached.

Dependence
----------
* zip.js, mime-types.js, inflate.js <[zip.js](http://gildas-lormeau.github.com/zip.js/)>
* encoding.js <[Unzipper.js](https://github.com/polygonplanet/Unzipper.js/)>

License
----------
Creative Commons [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/)

Copyright &copy; 2012 Legokichi Duckscallion

Acknowledgements
----------
* ls for developing the original Ukagaka software <[usada.sakura.vg](http://usada.sakura.vg/)>
* SSP project <[ssp.shillest.net](http://ssp.shillest.net/)> for high quality Ukagaka clones. (I did not use their code, but studied them extensively)
* Thanks for ["UKAGAKA" System Documentation Project](http://code.google.com/p/ukadoc/)

See also
----------
* [Ikagaka.js](https://github.com/legokichi/ikagaka.js/)

Author
----------
Legokichi Duckscallion