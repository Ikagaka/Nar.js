
declare class Nar {
  constructor();
  tree: any; // directory tree | null
  loadFromBuffer(buffer: ArrayBuffer, callback: (error: any) => void ): void;
  loadFromURL(src: string, callback: (error: any) => void ): void;
}

declare module Nar {
  function unzip(buffer: ArrayBuffer): any; // directory tree
  function convert(buffer: ArrayBuffer): string;
  function wget(url: string, responseType: string, callback: (error: any, response: any) => void): void;
}

declare module "nar" {
  export = Nar;
}
