// tslint:disable:no-console

export class NES {
  public load(nesFile: ArrayBuffer): void {
    console.log(nesFile);
  }

  public start(): void {
    console.log('Start nes.');
  }
}
