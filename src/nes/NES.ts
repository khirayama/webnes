// tslint:disable:no-any max-classes-per-file no-unnecessary-class

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
    // Noop
  }
}

class Keypad {
  // Noop
}

class Ram {
  constructor(tmp: number) {
    // Noop
  }

  public write(index: number, characterROM: any): void {
    // Noop
  }
}

class Rom {
  constructor(tmp: number) {
    // Noop
  }
}

class PpuBus {
  constructor(ram: Ram) {
    // Noop
  }
}

class Interrupts {
  // Noop
}

class Apu {
  constructor(interrupts: Interrupts) {
    // Noop
  }
}

class Ppu {
  constructor(ppuBus: PpuBus, interrupts: Interrupts, ppuConfig: IPPUConfig) {
    // Noop
  }
}

class Dma {
  constructor(ram: Ram, ppu: Ppu) {
    // Noop
  }
}

class CpuBus {
  constructor(ram: Ram, programROM: Rom, ppu: Ppu, keypad: Keypad, dma: Dma, apu: Apu) {
    // Noop
  }
}

class Cpu {
  constructor(cpuBus: CpuBus, interrupts: Interrupts) {
    // Noop
  }

  public reset(): void {
    // Noop
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
    // Noop
  }
}
