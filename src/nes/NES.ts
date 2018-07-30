// tslint:disable:no-any max-classes-per-file no-unnecessary-class no-suspicious-comment
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

  return {
    characterROM: '',
    programROM: '',
    isHorizontalMirror: false,
  };
}

class Keypad {
  constructor() {
    logger.call('keypad.constructor');
  }
  // TODO
}

class Ram {
  constructor(tmp: number) {
    logger.call('ram.constructor');
    // TODO
  }

  public write(index: number, characterROM: any): void {
    logger.call('ram.write');
    // TODO
  }
}

class Rom {
  constructor(tmp: number) {
    logger.call('rom.constructor');
    // TODO
  }
}

class PpuBus {
  constructor(ram: Ram) {
    logger.call('ppuBus.constructor');
    // TODO
  }
}

class Interrupts {
  constructor() {
    logger.call('interrupts.constructor');
    // TODO
  }
}

class Apu {
  constructor(interrupts: Interrupts) {
    logger.call('apu.constructor');
    // TODO
  }

  public run(cycle: number): void {
    logger.call('apu.run');
    // TODO
  }
}

class Ppu {
  constructor(ppuBus: PpuBus, interrupts: Interrupts, ppuConfig: IPPUConfig) {
    logger.call('ppu.constructor');
    // TODO
  }

  public run(cycle: number): number {
    // TODO
    logger.call('ppu.run');

    return cycle;
  }
}

class Dma {
  public isDmaProcessing: boolean;

  constructor(ram: Ram, ppu: Ppu) {
    logger.call('dma.constructor');
    this.isDmaProcessing = false;
  }

  public runDma(): void {
    // TODO
    logger.call('dma.runDma');
  }
}

class CpuBus {
  constructor(ram: Ram, programROM: Rom, ppu: Ppu, keypad: Keypad, dma: Dma, apu: Apu) {
    logger.call('cpuBus.constructor');
    // TODO
  }
}

class Cpu {
  constructor(cpuBus: CpuBus, interrupts: Interrupts) {
    logger.call('cpu.constructor');
    // TODO
  }

  public run(): number {
    // TODO
    logger.call('cpu.run');

    return 1;
  }

  public reset(): void {
    logger.call('cpi.reset');
    // TODO
  }
}

class CanvasRenderer {
  constructor(canvasId: string) {
    logger.call('canvasRenderer.constructor');
    // TODO
  }

  public render(renderingData: number): void {
    logger.call('canvasRenderer.render');
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
  }

  public start(): void {
    logger.call('nes.start');
    // window.requestAnimationFrame(this.frame);
    // window.setInterval(this.frame, 1000);
    this.frame();
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
      const renderingData: number = this.ppu.run(cycle * 3);
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
  }
}
