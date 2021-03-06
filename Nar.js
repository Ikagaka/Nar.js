// Generated by CoffeeScript 1.8.0
(function() {
  var Encoding, JSZip, Loader, Nar, WMDescript, XMLHttpRequest;

  if (this["process"] != null) {
    JSZip = require('jszip');
    Encoding = require('encoding-japanese');
    WMDescript = require('ikagaka.wmdescript.js');
    XMLHttpRequest = require('uupaa.nodeproxy.js');
  } else {
    JSZip = this.JSZip;
    Encoding = this.Encoding;
    WMDescript = this.WMDescript;
    XMLHttpRequest = this.XHRProxy;
  }

  Loader = (function() {
    function Loader() {}

    Loader.prototype.loadFromBuffer = function(buffer, callback) {
      var err, nar;
      try {
        nar = new Nar(Loader.unzip(buffer));
      } catch (_error) {
        err = _error;
        return callback(err, null);
      }
      return setTimeout(function() {
        return callback(null, nar);
      });
    };

    Loader.prototype.loadFromURL = function(src, callback) {
      return Loader.wget(src, "arraybuffer", (function(_this) {
        return function(err, buffer) {
          if (!!err) {
            return callback(err, null);
          }
          return _this.loadFromBuffer(buffer, callback);
        };
      })(this));
    };

    Loader.prototype.loadFromBlob = function(blob, callback) {
      var url;
      url = URL.createObjectURL(blob);
      return this.loadFromURL(url, function(err, nar) {
        URL.revokeObjectURL(url);
        return callback(err, nar);
      });
    };

    Loader.unzip = function(buffer) {
      var dic, filePath, path, zip;
      zip = new JSZip();
      zip.load(buffer);
      dic = {};
      for (filePath in zip.files) {
        path = filePath.split("\\").join("/");
        dic[path] = zip.files[filePath];
      }
      return dic;
    };

    Loader.wget = function(url, type, callback) {
      var xhr;
      xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function() {
        if (200 <= xhr.status && xhr.status < 300) {
          if (!!xhr.response.error) {
            return callback(new Error(xhr.response.error.message), null);
          } else {
            return callback(null, xhr.response);
          }
        } else {
          return callback(new Error(xhr.status), null);
        }
      });
      xhr.open("GET", url);
      xhr.responseType = type;
      xhr.send();
      return void 0;
    };

    return Loader;

  })();

  Nar = (function() {
    function Nar(directory) {
      this.directory = directory;
      if (!this.directory["install.txt"]) {
        throw new Error("install.txt not found");
      }
      this.install = Nar.parseDescript(Nar.convert(this.directory["install.txt"].asArrayBuffer()));
    }

    Nar.prototype.grep = function(regexp) {
      return Object.keys(this.directory).filter(function(path) {
        return regexp.test(path);
      });
    };

    Nar.prototype.getDirectory = function(regexp) {
      return this.grep(regexp).reduce(((function(_this) {
        return function(dir, path, zip) {
          dir[path.replace(regexp, "")] = _this.directory[path].asArrayBuffer();
          return dir;
        };
      })(this)), {});
    };

    Nar.convert = function(buffer) {
      return Encoding.codeToString(Encoding.convert(new Uint8Array(buffer), 'UNICODE', 'AUTO'));
    };

    Nar.parseDescript = function(text) {
      return WMDescript.parse(text);
    };

    Nar.Loader = Loader;

    return Nar;

  })();

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = Nar;
  } else if (this.Ikagaka != null) {
    this.Ikagaka.Nar = Nar;
  } else {
    this.Nar = Nar;
  }

}).call(this);
