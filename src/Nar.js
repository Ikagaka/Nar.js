(function() {
  this.Nar = (function() {
    var blobToBuffer, bufferToText, error, extractFileBlobFromZipBlob, fileBlobToPrimitive, pathHashToDirectoryTree, urlToBlob, urlToImage, zipBlobToPathHash;

    zip.useWebWorkers = true;

    zip.workerScriptsPath = "lib/";

    function Nar(url, callback) {
      var nar;

      nar = this;
      urlToBlob(url, function(blob) {
        return zipBlobToPathHash(blob, function(hash) {
          return pathHashToDirectoryTree(hash, function(tree) {
            var key, val;

            for (key in tree) {
              val = tree[key];
              nar[key] = val;
            }
            return callback(nar);
          });
        });
      });
    }

    error = function(e) {
      console.error(e);
      throw e;
    };

    urlToBlob = function(url, next) {
      var xhr;

      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.error = error;
      xhr.onload = function(e) {
        if (xhr.status === 200) {
          return next(xhr.response);
        } else {
          return error(e);
        }
      };
      return xhr.send();
    };

    zipBlobToPathHash = function(blob, next) {
      var load;

      load = function(callback) {
        var _this = this;

        return extractFileBlobFromZipBlob(blob, this.filename, function(file) {
          return fileBlobToPrimitive(file, _this.mimetype, callback);
        });
      };
      return zip.createReader(new zip.BlobReader(blob), (function(reader) {
        return reader.getEntries(function(entries) {
          var entry, hash, _i, _len;

          hash = {};
          for (_i = 0, _len = entries.length; _i < _len; _i++) {
            entry = entries[_i];
            hash[entry.filename] = Object.create({
              load: load
            }, {
              filename: {
                value: entry.filename
              },
              mimetype: {
                value: zip.getMimeType(entry.filename)
              }
            });
          }
          reader.close();
          return next(hash);
        });
      }), error);
    };

    pathHashToDirectoryTree = function(hash, next) {
      var ary, dir, i, obj, parent, path, root, val, _i, _len;

      parent = root = {};
      for (path in hash) {
        val = hash[path];
        ary = path.split("/");
        for (i = _i = 0, _len = ary.length; _i < _len; i = ++_i) {
          dir = ary[i];
          obj = i === ary.length - 1 ? val : {};
          parent = parent[dir] = parent[dir] || obj;
        }
        parent = root;
      }
      return setTimeout(function() {
        return next(root);
      });
    };

    extractFileBlobFromZipBlob = function(blob, filename, callback) {
      return zip.createReader(new zip.BlobReader(blob), (function(reader) {
        return reader.getEntries(function(entries) {
          var entry, mimetype, _i, _len;

          for (_i = 0, _len = entries.length; _i < _len; _i++) {
            entry = entries[_i];
            if (entry.filename !== filename) {
              continue;
            }
            mimetype = zip.getMimeType(filename);
            return entry.getData(new zip.BlobWriter(mimetype), function(file) {
              reader.close();
              return callback(file);
            });
          }
        });
      }), function() {
        return callback(null);
      });
    };

    fileBlobToPrimitive = function(blob, mimetype, callback) {
      var url;

      if (typeof mimetype === "string") {
        if (/^text/.test(mimetype)) {
          return blobToBuffer(blob, function(buffer) {
            return bufferToText(buffer, callback);
          });
        } else if (/^image/.test(mimetype)) {
          url = URL.createObjectURL(blob);
          return urlToImage(url, callback);
        }
      } else {
        return callback(blob);
      }
    };

    blobToBuffer = function(blob, next) {
      var reader;

      reader = new FileReader;
      reader.onerrer = error;
      reader.onload = function() {
        return next(reader.result);
      };
      return reader.readAsArrayBuffer(blob);
    };

    bufferToText = function(buffer, next) {
      var text, uint8Ary, unicode;

      uint8Ary = new Uint8Array(buffer);
      unicode = Encoding.convert(uint8Ary, "UNICODE", "AUTO");
      text = Encoding.codeToString(unicode);
      return setTimeout(function() {
        return next(text);
      });
    };

    urlToImage = function(src, next) {
      var img;

      img = new Image;
      img.onerror = error;
      img.onload = function() {
        return next(img);
      };
      return img.src = src;
    };

    return Nar;

  })();

}).call(this);
