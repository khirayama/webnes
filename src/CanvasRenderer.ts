// tslint:disable:no-any no-suspicious-comment
import { colors } from 'colors';
import { logger } from 'logger';

export type Sprite = number[][];

export type PaletteRam = Uint8Array;

export interface ISpriteWithAttribute {
  sprite: Sprite;
  x: number;
  y: number;
  attr: number;
  spriteId: number;
}

export interface IRenderingData {
  background: any;
  sprites: ISpriteWithAttribute[];
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

  private renderSprites(sprites: ISpriteWithAttribute[], palette: PaletteRam): void {
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

  private renderSprite(sprite: ISpriteWithAttribute, palette: PaletteRam): void {
    logger.call('canvasRenderer.renderSprite');
    const isVerticalReverse: boolean = !!(sprite.attr & 0x80);
    const isHorizontalReverse: boolean = !!(sprite.attr & 0x40);
    const isLowPriority: boolean = !!(sprite.attr & 0x20);
    const paletteId: number = sprite.attr & 0x03;
    for (let i: number = 0; i < 8; i = (i + 1) | 0) {
      for (let j: number = 0; j < 8; j = (j + 1) | 0) {
        const x: number = sprite.x + (isHorizontalReverse ? 7 - j : j);
        const y: number = sprite.y + (isVerticalReverse ? 7 - i : i);
        if (isLowPriority && this.shouldPixelHide(x, y)) {
          continue;
        }
        if (sprite.sprite[i][j]) {
          const colorId: number = palette[paletteId * 4 + sprite.sprite[i][j] + 0x10];
          const color: number[] = colors[colorId];
          const index: number = (x + y * 0x100) * 4;
          this.image.data[index] = color[0];
          this.image.data[index + 1] = color[1];
          this.image.data[index + 2] = color[2];
          // this.image.data[index + 3] = 0xFF;
        }
      }
    }
    logger.callEnd();
  }

  private shouldPixelHide(x: number, y: number): boolean {
    logger.call('canvasRenderer.shouldPixelHide');
    // TODO
    logger.callEnd();

    return false;
  }
}
