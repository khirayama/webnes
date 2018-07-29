// tslint:disable:no-any no-suspicious-comment
import { log } from 'log';

declare var window: any;

export class NesDebugger {
  private debugInfo: ([string] | [string, number] | [string, number, number])[];

  constructor() {
    log.info('nesDebugger.constructor');
    window.__disassembled = (): void => {
      this.displayDisassembled();
    };
  }

  public setup(rom: Uint8Array): void {
    log.info('nesDebugger.setup');
    // TODO
  }

  private displayDisassembled(): void {
    log.info('nesDebugger.displayDisassembled');
    this.debugInfo.forEach(
      (d: [string] | [string, number] | [string, number, number]): void => {
        log.info(d);
      },
    );
  }
}
