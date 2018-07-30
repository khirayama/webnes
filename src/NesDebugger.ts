// tslint:disable:no-suspicious-comment
import { log } from 'log';
import { dict } from 'nes/NES';

// tslint:disable-next-line:no-any
declare var window: any;

type debugInfoType = [string] | [string, number] | [string, number, number];

export class NesDebugger {
  private debugInfo: debugInfoType[];

  constructor() {
    log.info('nesDebugger.constructor');
    window.__disassembled = (): void => {
      this.displayDisassembled();
    };
  }

  public setup(rom: Uint8Array): void {
    log.info('nesDebugger.setup');
    // tslint:disable-next-line:no-any
    const debugInfo: any[] = [];
    let pc: number = 0;
    let opcodeIndex: number = 0;
    // while (typeof rom[pc] !== 'undefined') {
    while (rom[pc] !== undefined) {
      // tslint:disable-next-line:no-any
      const op: any[] = [];
      const opcodeAddr: string = (pc + 0x8000).toString(16);
      const opcode: { fullName: string; mode: string } = dict[rom[pc].toString(16).toUpperCase()];
      if (!opcode) {
        debugInfo[opcodeIndex] = [opcodeAddr];
        pc += 1;
        opcodeIndex += 1;
        continue;
      }
      op.push(opcode.fullName);
      pc += 1;
      switch (opcode.mode) {
        case 'accumulator':
        case 'implied': {
          debugInfo[opcodeIndex] = [opcodeAddr, ...op];
          opcodeIndex += 1;
          continue;
        }
        default:
      }
      op.push(rom[pc]);
      pc += 1;
      switch (opcode.mode) {
        case 'immediate':
        case 'relative':
        case 'zeroPage':
        case 'zeroPageX':
        case 'zeroPageY':
        case 'preIndexedIndirect':
        case 'postIndexedIndirect': {
          debugInfo[opcodeIndex] = [opcodeAddr, ...op];
          opcodeIndex += 1;
          continue;
        }
        default:
      }
      op.push(rom[pc]);
      debugInfo[opcodeIndex] = [opcodeAddr, ...op];
      opcodeIndex += 1;
      pc += 1;
    }
    this.debugInfo = debugInfo;
  }

  private displayDisassembled(): void {
    log.info('nesDebugger.displayDisassembled');
    this.debugInfo.forEach(
      (d: debugInfoType): void => {
        log.info(d);
      },
    );
  }
}
