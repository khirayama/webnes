// tslint:disable:no-any
import { NES } from 'nes/NES';

window
  .fetch('/roms/nestest.nes')
  .then((res: any) => {
    return res.arrayBuffer();
  })
  .then((nesFile: ArrayBuffer) => {
    const nes: NES = new NES();
    nes.load(nesFile);
    nes.start();
  });
