# Nar.js

Nanika Archive Reader

## Usage

[wiki](https://github.com/Ikagaka/Nar.js/wiki/Nar.js)

### browser

```html
<script src="./node_modules/encoding-japanese/encoding.min.js"></script>
<script src="./vendor/jszip.min.js"></script>
<script src="./vendor/XHRProxy.min.js"></script>
<script src="./vendor/WMDescript.js"></script>
<script src="./Nar.js"></script>
<script>
var loader = new Nar.Loader();
loader.loadFromURL("./vendor/mobilemaster.nar", function(err, nar){
  if(!!err) return console.error(err.stack);

  console.log(nar);
});
</script>
```

### node.js

```javascript
var loader = new require('ikagaka.nar.js').Loader;
loader.loadFromBuffer(buffer, function(err, nar){
  if(!!err) return console.error(err.stack);

  console.log(nar);
});
```
