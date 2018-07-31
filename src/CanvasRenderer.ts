// tslint:disable:no-any no-suspicious-comment
import { logger } from 'logger';

export const colors: number[][] = [
  [0x80, 0x80, 0x80],
  [0x00, 0x3d, 0xa6],
  [0x00, 0x12, 0xb0],
  [0x44, 0x00, 0x96],
  [0xa1, 0x00, 0x5e],
  [0xc7, 0x00, 0x28],
  [0xba, 0x06, 0x00],
  [0x8c, 0x17, 0x00],
  [0x5c, 0x2f, 0x00],
  [0x10, 0x45, 0x00],
  [0x05, 0x4a, 0x00],
  [0x00, 0x47, 0x2e],
  [0x00, 0x41, 0x66],
  [0x00, 0x00, 0x00],
  [0x05, 0x05, 0x05],
  [0x05, 0x05, 0x05],
  [0xc7, 0xc7, 0xc7],
  [0x00, 0x77, 0xff],
  [0x21, 0x55, 0xff],
  [0x82, 0x37, 0xfa],
  [0xeb, 0x2f, 0xb5],
  [0xff, 0x29, 0x50],
  [0xff, 0x22, 0x00],
  [0xd6, 0x32, 0x00],
  [0xc4, 0x62, 0x00],
  [0x35, 0x80, 0x00],
  [0x05, 0x8f, 0x00],
  [0x00, 0x8a, 0x55],
  [0x00, 0x99, 0xcc],
  [0x21, 0x21, 0x21],
  [0x09, 0x09, 0x09],
  [0x09, 0x09, 0x09],
  [0xff, 0xff, 0xff],
  [0x0f, 0xd7, 0xff],
  [0x69, 0xa2, 0xff],
  [0xd4, 0x80, 0xff],
  [0xff, 0x45, 0xf3],
  [0xff, 0x61, 0x8b],
  [0xff, 0x88, 0x33],
  [0xff, 0x9c, 0x12],
  [0xfa, 0xbc, 0x20],
  [0x9f, 0xe3, 0x0e],
  [0x2b, 0xf0, 0x35],
  [0x0c, 0xf0, 0xa4],
  [0x05, 0xfb, 0xff],
  [0x5e, 0x5e, 0x5e],
  [0x0d, 0x0d, 0x0d],
  [0x0d, 0x0d, 0x0d],
  [0xff, 0xff, 0xff],
  [0xa6, 0xfc, 0xff],
  [0xb3, 0xec, 0xff],
  [0xda, 0xab, 0xeb],
  [0xff, 0xa8, 0xf9],
  [0xff, 0xab, 0xb3],
  [0xff, 0xd2, 0xb0],
  [0xff, 0xef, 0xa6],
  [0xff, 0xf7, 0x9c],
  [0xd7, 0xe8, 0x95],
  [0xa6, 0xed, 0xaf],
  [0xa2, 0xf2, 0xda],
  [0x99, 0xff, 0xfc],
  [0xdd, 0xdd, 0xdd],
  [0x11, 0x11, 0x11],
  [0x11, 0x11, 0x11],
];

export type Sprite = number[][];

export type PaletteRam = Uint8Array;

export interface IRenderingData {
  background: any;
  sprites: Sprite[];
  palette: PaletteRam;
}

export interface ITile {
  sprite: Sprite;
  paletteId: number;
  scrollX: number;
  scrollY: number;
}

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;

  private image: ImageData;

  private background: any;

  constructor(canvasId: string) {
    logger.call('canvasRenderer.constructor');
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>window.document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.image = this.ctx.createImageData(256, 224);
    }
    logger.callEnd();
  }

  public render(data: IRenderingData): void {
    logger.call('canvasRenderer.render');
    if (data.background) {
      this.renderBackground(data.background, data.palette);
    }
    if (data.sprites) {
      this.renderSprites(data.sprites, data.palette);
    }
    this.ctx.putImageData(this.image, 0, 0);
    logger.callEnd();
  }

  private renderBackground(background: any, palette: PaletteRam): void {
    logger.call('canvasRenderer.renderBackground');
    this.background = background;
    for (let i: number = 0; background.length; i += 1 | 0) {
      const x: number = (i % 33) * 8;
      const y: number = ~~(i / 33) * 8;
      this.renderTile(background[i], x, y, palette);
    }
    logger.callEnd();
  }

  private renderSprites(sprites: Sprite[], palette: PaletteRam): void {
    logger.call('canvasRenderer.renderSprites');
    for (const sprite of sprites) {
      if (sprite) {
        this.renderSprite(sprite, palette);
      }
    }
    logger.callEnd();
  }

  private renderTile(tile: ITile, tileX: number, tileY: number, palette: PaletteRam): void {
    logger.call('canvasRenderer.renderTile');
    const offsetX: number = scrollX % 8;
    const offsetY: number = scrollY % 8;
    for (let i: number = 0; i < 8; i = (i + 1) | 0) {
      for (let j: number = 0; j < 8; j = (j + 1) | 0) {
        const paletteIndex: number = tile.paletteId * 4 + tile.sprite[i][j];
        const colorId: number = palette[paletteIndex];
        const color: number[] = colors[colorId];
        const x: number = tileX + j - offsetX;
        const y: number = tileY + i - offsetY;
        if (x >= 0 && x <= 0xff && y >= 0 && y < 224) {
          const index: number = (x + y * 0x100) * 4;
          this.image.data[index] = color[0];
          this.image.data[index + 1] = color[1];
          this.image.data[index + 2] = color[2];
          this.image.data[index + 3] = 0xff;
        }
      }
    }
    logger.callEnd();
  }

  private renderSprite(sprite: Sprite, palette: PaletteRam): void {
    logger.call('canvasRenderer.renderSprite');
    // TODO
    logger.callEnd();
  }
}
