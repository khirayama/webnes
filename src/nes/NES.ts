// tslint:disable:no-any max-classes-per-file no-unnecessary-class no-suspicious-comment
import { log } from 'log';

interface IPPUConfig {
  isHorizontalMirror: boolean;
}

function parse(): {
  characterROM: any;
  programROM: any;
  isHorizontalMirror: boolean;
} {
  return {
    characterROM: '',
    programROM: '',
    isHorizontalMirror: false,
  };
}

class NesDebugger {
  public setup(programROM: any): void {
    log.info('nesDebugger.setup');
    // TODO
  }
}

class Keypad {
  constructor() {
    log.info('keypad.constructor');
  }
  // TODO
}

class Ram {
  constructor(tmp: number) {
    log.info('ram.constructor');
    // TODO
  }

  public write(index: number, characterROM: any): void {
    log.info('ram.write');
    // TODO
  }
}

class Rom {
  constructor(tmp: number) {
    log.info('rom.constructor');
    // TODO
  }
}

class PpuBus {
  constructor(ram: Ram) {
    log.info('ppuBus.constructor');
    // TODO
  }
}

class Interrupts {
  constructor() {
    log.info('interrupts.constructor');
    // TODO
  }
}

class Apu {
  constructor(interrupts: Interrupts) {
    log.info('apu.constructor');
    // TODO
  }

  public run(cycle: number): void {
    log.info('apu.run');
    // TODO
  }
}

class Ppu {
  constructor(ppuBus: PpuBus, interrupts: Interrupts, ppuConfig: IPPUConfig) {
    log.info('ppu.constructor');
    // TODO
  }

  public run(cycle: number): number {
    // TODO
    log.info('ppu.run');

    return cycle;
  }
}

class Dma {
  public isDmaProcessing: boolean;

  constructor(ram: Ram, ppu: Ppu) {
    log.info('dma.constructor');
    this.isDmaProcessing = false;
  }

  public runDma(): void {
    // TODO
    log.info('dma.runDma');
  }
}

class CpuBus {
  constructor(ram: Ram, programROM: Rom, ppu: Ppu, keypad: Keypad, dma: Dma, apu: Apu) {
    log.info('cpuBus.constructor');
    // TODO
  }
}

class Cpu {
  constructor(cpuBus: CpuBus, interrupts: Interrupts) {
    log.info('cpu.constructor');
    // TODO
  }

  public run(): number {
    // TODO
    log.info('cpu.run');

    return 1;
  }

  public reset(): void {
    log.info('cpi.reset');
    // TODO
  }
}

class CanvasRenderer {
  constructor(canvasId: string) {
    log.info('canvasRenderer.constructor');
    // TODO
  }

  public render(renderingData: number): void {
    log.info('canvasRenderer.render');
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
    log.info('nes.constructor');
    this.frame = this.frame.bind(this);
    this.canvasRenderer = new CanvasRenderer('nes');
  }

  public load(nes: ArrayBuffer): void {
    log.info('nes.load');
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
    log.info('nes.start');
    // window.requestAnimationFrame(this.frame);
    // window.setInterval(this.frame, 1000);
    this.frame();
  }

  private frame(): void {
    log.info('nes.frame');
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
