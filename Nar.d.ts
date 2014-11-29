interface Loader {
  loadFromBuffer(buffer: ArrayBuffer, callback: (error: any, nar: Nar) => void ): void;
  loadFromBlob(  file: Blob,          callback: (error: any, nar: Nar) => void ): void;
  loadFromURL(   src: string,         callback: (error: any, nar: Nar) => void ): void;
}

interface Nar {
  install: { [key: string]: string; };
  directory: JSZipDirectory;
  grep(reg: RegExp): string[];
  getDirectory(reg: RegExp): { [filePath: string]: JSZipObject; };
}

declare var Nar: {
  new (directory: { [filePath: string]: JSZipObject; }): Nar;
  convert(buffer: ArrayBuffer): string;
  parseDescript(text: string): { [key: string]: string; };
  Loader: {
    new (): Loader;
    unzip(buffer: ArrayBuffer): { [filePath: string]: JSZipObject; };
    wget(url: string, responseType: string, callback: (error: any, response: any) => void): void;
  }
}
