# Nar.js

## Usage

[wiki](https://github.com/Ikagaka/Nar.js/wiki/Nar.js)

### browser

```html
<script src="./vender/encoding.js"></script>
<script src="./vender/jszip.min.js"></script>
<script src="./vender/XHRProxy.min.js"></script>
<script src="./vender/WMDescript.js"></script>
<script src="./Nar.js"></script>
<script>
var narloader = new NarLoader();
narloader.loadFromURL("./vender/mobilemaster.nar", function(err, nar){
  if(!!err) return console.error(err.stack);

  console.log(nar);
});
</script>
```

### node.js

```javascript
var NarLoader = require('ikagaka.nar.js').NarLoader;
narloader.loadFromBuffer(buffer, function(err, nar){
  if(!!err) return console.error(err.stack);

  console.log(nar);
}
```
