// tslint:disable:no-any max-classes-per-file no-unnecessary-class no-suspicious-comment
import { CanvasRenderer, IRenderingData } from 'CanvasRenderer';
import { logger } from 'logger';
import { NesDebugger } from 'NesDebugger';

interface IPPUConfig {
  isHorizontalMirror: boolean;
}

export const dict: any = {};

function parse(): {
  characterROM: any;
  programROM: any;
  isHorizontalMirror: boolean;
} {
  logger.call('parse');
  logger.callEnd();

  return {
    characterROM: '',
    programROM: '',
    isHorizontalMirror: false,
  };
}

class Keypad {
  constructor() {
    logger.call('keypad.constructor');
    logger.callEnd();
  }
  // TODO
}

class Ram {
  constructor(tmp: number) {
    logger.call('ram.constructor');
    logger.callEnd();
    // TODO
  }

  public write(index: number, characterROM: any): void {
    logger.call('ram.write');
    logger.callEnd();
    // TODO
  }
}

class Rom {
  constructor(tmp: number) {
    logger.call('rom.constructor');
    logger.callEnd();
    // TODO
  }
}

class PpuBus {
  constructor(ram: Ram) {
    logger.call('ppuBus.constructor');
    logger.callEnd();
    // TODO
  }
}

class Interrupts {
  constructor() {
    logger.call('interrupts.constructor');
    logger.callEnd();
    // TODO
  }
}

class Apu {
  constructor(interrupts: Interrupts) {
    logger.call('apu.constructor');
    logger.callEnd();
    // TODO
  }

  public run(cycle: number): void {
    logger.call('apu.run');
    logger.callEnd();
    // TODO
  }
}

class Ppu {
  constructor(ppuBus: PpuBus, interrupts: Interrupts, ppuConfig: IPPUConfig) {
    logger.call('ppu.constructor');
    logger.callEnd();
    // TODO
  }

  public run(cycle: number): IRenderingData {
    // TODO
    logger.call('ppu.run');
    logger.callEnd();

    return {
      background: 1,
      sprites: [],
      palette: new Uint8Array(128),
    };
  }
}

class Dma {
  public isDmaProcessing: boolean;

  constructor(ram: Ram, ppu: Ppu) {
    logger.call('dma.constructor');
    this.isDmaProcessing = false;
    logger.callEnd();
  }

  public runDma(): void {
    // TODO
    logger.call('dma.runDma');
    logger.callEnd();
  }
}

class CpuBus {
  constructor(ram: Ram, programROM: Rom, ppu: Ppu, keypad: Keypad, dma: Dma, apu: Apu) {
    logger.call('cpuBus.constructor');
    logger.callEnd();
    // TODO
  }
}

class Cpu {
  constructor(cpuBus: CpuBus, interrupts: Interrupts) {
    logger.call('cpu.constructor');
    logger.callEnd();
    // TODO
  }

  public run(): number {
    // TODO
    logger.call('cpu.run');
    logger.callEnd();

    return 1;
  }

  public reset(): void {
    logger.call('cpi.reset');
    logger.callEnd();
    // TODO
  }
}

let tmpIntervalId: number | null = null;

export class NES {
  private keypad: Keypad;

  private ram: Ram;

  private characterMem: Ram;

  private programROM: Rom;

  private ppuBus: PpuBus;

  private interrupts: Interrupts;

  private apu: Apu;

  private ppu: Ppu;

  private dma: Dma;

  private cpuBus: CpuBus;

  private cpu: Cpu;

  private canvasRenderer: CanvasRenderer;

  constructor() {
    logger.call('nes.constructor');
    this.frame = this.frame.bind(this);
    this.canvasRenderer = new CanvasRenderer('nes');
    logger.callEnd();
  }

  public load(nes: ArrayBuffer): void {
    logger.call('nes.load');
    const { characterROM, programROM, isHorizontalMirror } = parse();

    if (process.env.NODE_ENV !== 'production') {
      const nesDebugger: NesDebugger = new NesDebugger();
      nesDebugger.setup(programROM);
    }

    const ppuConfig: IPPUConfig = {
      isHorizontalMirror,
    };

    this.keypad = new Keypad();
    this.ram = new Ram(2048);
    this.characterMem = new Ram(0x4000);
    // Copy characterROM to internal RAM
    for (let i: number = 0; i < characterROM.length; i += 1) {
      this.characterMem.write(i, characterROM[i]);
    }
    this.programROM = new Rom(programROM);
    this.ppuBus = new PpuBus(this.characterMem);
    this.interrupts = new Interrupts();
    this.apu = new Apu(this.interrupts);
    this.ppu = new Ppu(this.ppuBus, this.interrupts, ppuConfig);
    this.dma = new Dma(this.ram, this.ppu);
    this.cpuBus = new CpuBus(this.ram, this.programROM, this.ppu, this.keypad, this.dma, this.apu);
    this.cpu = new Cpu(this.cpuBus, this.interrupts);
    this.cpu.reset();
    logger.callEnd();
  }

  public start(): void {
    logger.call('nes.start');
    // window.requestAnimationFrame(this.frame);
    // window.setInterval(this.frame, 1000);
    this.frame();
    logger.callEnd();
  }

  private frame(): void {
    logger.call('nes.frame');
    // tslint:disable-next-line:no-constant-condition
    while (true) {
      let cycle: number = 0;
      if (this.dma.isDmaProcessing) {
        this.dma.runDma();
        cycle = 514;
      }
      cycle += this.cpu.run();
      const renderingData: IRenderingData = this.ppu.run(cycle * 3);
      this.apu.run(cycle);
      if (renderingData) {
        this.canvasRenderer.render(renderingData);
        break;
      }
    }
    // window.requestAnimationFrame(this.frame);
    if (tmpIntervalId === null) {
      tmpIntervalId = window.setInterval(this.frame, (1000 / 60) * 240);
    }
    logger.callEnd();
  }
}
