
declare module Nar {
  interface DirectoryElement {
    dir: boolean;
    folder: { [name: string]: DirectoryElement; }
    file: {
      asArrayBuffer: ()=> ArrayBuffer;
      asText: ()=> string;
    }
  }
  function loadFromBuffer(buffer: ArrayBuffer, callback: (error: any) => void ): void;
  function loadFromURL(src: string, callback: (error: any) => void ): void;
  function unzip(buffer: ArrayBuffer): DirectoryElement; // https://github.com/borisyankov/DefinitelyTyped/blob/master/jszip/jszip.d.ts
  function convert(buffer: ArrayBuffer): string;
  function wget(url: string, responseType: string, callback: (error: any, response: any) => void): void;
  function parseDescript(text: string): { [key: string]: string; };
}

declare module "nar" {
  export = Nar;
}
