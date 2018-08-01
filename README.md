# WEBNES

## Note

// Functions
- [ ] parse

// Constants
- [ ] dict
- [x] colors

// Objects
- [x] log
  - [x] call
  - [x] info

// Classes
- [ ] NES
  - [x] load
  - [x] start
  - [x] frame
- [ ] Keypad
- [ ] Ram
  - [ ] write
- [ ] Rom
- [ ] PpuBus
- [ ] Interrupts
- [ ] Apu
  - [-] run
- [ ] Ppu
  - [-] run
- [ ] Dma
  - [-] runDma
- [ ] CpuBus
- [ ] Cpu
  - [-] run
  - [-] reset
- [ ] CanvasRenderer
  - [x] render
  - [x] renderBackground
  - [x] renderSprites
  - [x] renderTile
  - [ ] renderSprite
- [x] NesDebugger
  - [x] setup
  - [x] displayDisassembled

// Interfaces
- [ ] IPPUConfig
- [ ] IRenderingData
- [ ] ITile

// Types
- [x] Sprite
- [x] PaletteRam

/^(?!.*(constructor|load)).*$/

## Refs

- [ファミコンエミュレータの創り方　- Hello, World!編 -](https://qiita.com/bokuweb/items/1575337bef44ae82f4d3) https://qiita.com/bokuweb/items/1575337bef44ae82f4d3
- [RETROF-8のバス幅の決定](http://diode.matrix.jp/R8/DESIGN/RETROF_03_04.htm)
- [クロック - wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AD%E3%83%83%E3%82%AF)
