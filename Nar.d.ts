declare class Nar {
  constructor(); // stable
  install: { [key: string]: string; }; // stable
  directory: { [filepath: string]: JSZipObject; }; // stable
  loadFromBuffer(buffer: ArrayBuffer, callback: (error: any) => void ): void; // stable
  loadFromBlob(file: Blob, callback: (error: any) => void ): void; // stable
  loadFromURL(src: string, callback: (error: any) => void ): void; // stable
}


declare module Nar {
  function unzip(buffer: ArrayBuffer): any; // stable
  function convert(buffer: ArrayBuffer): string; // stable
  function wget(url: string, responseType: string, callback: (error: any, response: any) => void): void; // stable
  function parseDescript(text: string): { [key: string]: string; }; // stable
}

declare module 'nar' {
  var foo: typeof Nar;
  module rsvp {
    export var Nar: typeof foo;
  }
  export = rsvp;
}
