if this["process"]?
  JSZip = require('jszip')
  Encoding = require('encoding-japanese')
  WMDescript = require('ikagaka.wmdescript.js')
  XMLHttpRequest = require('uupaa.nodeproxy.js')
else
  JSZip = @JSZip
  Encoding = @Encoding
  WMDescript = @WMDescript
  XMLHttpRequest = @XHRProxy


class Loader

  loadFromBuffer: (buffer, callback)->
    try
      nar = new Nar(Loader.unzip(buffer))
    catch err
      return callback(err, null)
    setTimeout ->
      callback(null, nar)

  loadFromURL: (src, callback)->
    Loader.wget src, "arraybuffer", (err, buffer)=>
      if !!err then return callback(err, null)
      @loadFromBuffer(buffer, callback)

  loadFromBlob: (blob, callback)->
    url = URL.createObjectURL(blob)
    @loadFromURL url, (err, nar)->
      URL.revokeObjectURL(url)
      callback(err, nar)

  @unzip = (buffer)->
    zip = new JSZip()
    zip.load(buffer)
    dic = {}
    for filePath of zip.files
      path = filePath.split("\\").join("/")
      dic[path] = zip.files[filePath]
    dic

  @wget = (url, type, callback)->
    xhr = new XMLHttpRequest()
    xhr.addEventListener "load", ->
      if 200 <= xhr.status && xhr.status < 300
        if !!xhr.response.error
        then callback(new Error(xhr.response.error.message), null)
        else callback(null, xhr.response)
      else callback(new Error(xhr.status), null)
    xhr.open("GET", url)
    xhr.responseType = type
    xhr.send()
    undefined


class Nar

  constructor: (@directory) ->
    if !@directory["install.txt"]
      throw new Error("install.txt not found")
    @install = Nar.parseDescript(Nar.convert(@directory["install.txt"].asArrayBuffer()))

  grep: (regexp)->
    Object.keys(@directory).filter (path)-> regexp.test(path)

  getDirectory: (regexp)->
    @grep(regexp)
      .reduce(((dir, path, zip)=>
        dir[path.replace(regexp, "")] = @directory[path]
        dir
      ), {})

  @convert = (buffer)->
    Encoding.codeToString(Encoding.convert(new Uint8Array(buffer), 'UNICODE', 'AUTO'))

  @parseDescript = (text)->
    WMDescript.parse(text)

  @Loader = Loader


if module?.exports?
  module.exports = Nar
else if @Ikagaka?
  @Ikagaka.Nar = Nar
else
  @Nar = Nar
