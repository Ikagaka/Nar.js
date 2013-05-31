class this.Nar


  zip.useWebWorkers = true
  zip.workerScriptsPath = "lib/"


  constructor: (url, callback)->
    nar = @
    urlToBlob url, (blob)->
      zipBlobToPathHash blob, (hash)->
        pathHashToDirectoryTree hash, (tree)->
          for key, val of tree
            nar[key] = val
          callback(nar)

  error = (e)->
    console.error e
    throw e

  urlToBlob = (url, next)->
    xhr = new XMLHttpRequest
    xhr.open("GET", url, true)
    xhr.responseType = "blob"
    xhr.error = error
    xhr.onload = (e)->
      if xhr.status is 200 then next(xhr.response)
      else                      error(e)
    xhr.send()

  zipBlobToPathHash = (blob, next)->
    load = (callback)->
      extractFileBlobFromZipBlob blob, @filename, (file)=>
        fileBlobToPrimitive file, @mimetype, callback
    zip.createReader new zip.BlobReader(blob), ((reader)->
      reader.getEntries (entries)->
        hash = {}
        for entry in entries
          hash[entry.filename] = Object.create {load: load},
            filename: {value: entry.filename}
            mimetype: {value: zip.getMimeType(entry.filename)}
        reader.close()
        next(hash)
    ), error

  pathHashToDirectoryTree = (hash, next)->
    parent = root = {}
    for path, val of hash
      ary = path.split("/")
      for dir, i in ary
        obj = if i is ary.length - 1 then val else {}
        parent = parent[dir] = parent[dir] or obj
      parent = root
    setTimeout -> next(root)


  extractFileBlobFromZipBlob = (blob, filename, callback)->
    zip.createReader new zip.BlobReader(blob), ((reader)->
      reader.getEntries (entries)->
        for entry in entries
          if entry.filename isnt filename then continue
          mimetype = zip.getMimeType(filename)
          return entry.getData new zip.BlobWriter(mimetype), (file)->
            reader.close()
            callback(file)
    ), -> callback(null)

  fileBlobToPrimitive = (blob, mimetype, callback)->
    if typeof mimetype is "string"
      if /^text/.test mimetype
        blobToBuffer blob, (buffer)->
          bufferToText buffer, callback
      else if /^image/.test mimetype
        url = URL.createObjectURL(blob)
        urlToImage url, callback
    else callback(blob)

  blobToBuffer = (blob, next)->
    reader = new FileReader
    reader.onerrer = error
    reader.onload  = -> next(reader.result)
    reader.readAsArrayBuffer(blob)

  bufferToText = (buffer, next)->
    uint8Ary = new Uint8Array(buffer)
    unicode  = Encoding.convert(uint8Ary, "UNICODE", "AUTO")
    text     = Encoding.codeToString(unicode)
    setTimeout -> next(text)

  urlToImage = (src, next)->
    img = new Image
    img.onerror = error
    img.onload  = -> next(img)
    img.src = src

