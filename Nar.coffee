
class Nar

  XMLHttpRequest = window["XMLHttpRequest"]
  Encoding = window["Encoding"]
  JSZip = window["JSZip"]

  constructor: ->
    @tree = null

  loadFromBuffer: (buffer, callback)->
    @tree = Nar.unzip(buffer)
    console.log @tree
    setTimeout => callback(null, @)

  loadFromURL: (src, callback)->
    Nar.wget src, "arraybuffer", (err, buffer)=>
      if !!err then return callback(err, null)
      @loadFromBuffer(buffer, callback)

  @unzip = (buffer)->
    zip = new JSZip()
    zip.load(buffer)
    files = zip.files
    parent = root = {}
    for path, val of files
      ary = path.split("/")
      for dir, i in ary
        obj = if i is ary.length - 1 then new val else {}
        parent = parent[dir] = parent[dir] or obj
      parent = root
    root

  @convert = (buffer)->
    Encoding.codeToString(Encoding.convert(new Uint8Array(buffer), 'UNICODE', 'AUTO'))

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
