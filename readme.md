Nar.js
======================
  Nar.js can read .nar file of "Nanika Archive".

Usage
----------

```html
<script src="./vender/encoding.js"></script>
<script src="./vender/jszip.min.js"></script>
<script src="./vender/XHRProxy.min.js"></script>
<script>
var nar = new Nar()
nar.loadFromURL("./vender/mobilemaster.nar", function(err){
  if(!!err) return console.error(err.stack);) {

  console.log(nar.tree);

});
</script>
```
