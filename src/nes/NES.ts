// tslint:disable:no-any max-classes-per-file no-unnecessary-class no-suspicious-comment

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
    // TODO
  }
}

class Keypad {
  // TODO
}

class Ram {
  constructor(tmp: number) {
    // TODO
  }

  public write(index: number, characterROM: any): void {
    // TODO
  }
}

class Rom {
  constructor(tmp: number) {
    // TODO
  }
}

class PpuBus {
  constructor(ram: Ram) {
    // TODO
  }
}

class Interrupts {
  // TODO
}

class Apu {
  constructor(interrupts: Interrupts) {
    // TODO
  }

  public run(cycle: number): void {
    // TODO
  }
}

class Ppu {
  constructor(ppuBus: PpuBus, interrupts: Interrupts, ppuConfig: IPPUConfig) {
    // TODO
  }

  public run(cycle: number): number {
    // TODO
    return cycle;
  }
}

class Dma {
  public isDmaProcessing: boolean;

  constructor(ram: Ram, ppu: Ppu) {
    this.isDmaProcessing = false;
  }

  public runDma(): void {
    // TODO
  }
}

class CpuBus {
  constructor(ram: Ram, programROM: Rom, ppu: Ppu, keypad: Keypad, dma: Dma, apu: Apu) {
    // TODO
  }
}

class Cpu {
  constructor(cpuBus: CpuBus, interrupts: Interrupts) {
    // TODO
  }

  public run(): number {
    // TODO
    return 0;
  }

  public reset(): void {
    // TODO
  }
}

class CanvasRenderer {
  constructor(canvasId: string) {
    // TODO
  }

  public render(renderingData: number): void {
    // TODO
  }
}

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
    this.frame = this.frame.bind(this);
    this.canvasRenderer = new CanvasRenderer('nes');
  }

  public load(nes: ArrayBuffer): void {
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
    window.requestAnimationFrame(this.frame);
  }

  private frame(): void {
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
    window.requestAnimationFrame(this.frame);
  }
}
