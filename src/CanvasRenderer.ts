// tslint:disable:no-any no-suspicious-comment
import { logger } from 'logger';

export interface IRenderingData {
  background: any;
  sprites: any[];
  palette: any;
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

  private renderBackground(background: any, palette: any): void {
    logger.call('canvasRenderer.renderBackground');
    this.background = background;
    for (let i: number = 0; background.length; i += 1 | 0) {
      const x: number = (i % 33) * 8;
      const y: number = ~~(i / 33) * 8;
      this.renderTile(background[i], x, y, palette);
    }
    logger.callEnd();
  }

  private renderSprites(sprites: any, palette: any): void {
    logger.call('canvasRenderer.renderSprites');
    for (const sprite of sprites) {
      if (sprite) {
        this.renderSprite(sprite, palette);
      }
    }
    logger.callEnd();
  }

  private renderTile(background: any, x: number, y: number, palette: any): void {
    logger.call('canvasRenderer.renderTile');
    // TODO
    logger.callEnd();
  }

  private renderSprite(sprite: any, palette: any): void {
    logger.call('canvasRenderer.renderSprite');
    // TODO
    logger.callEnd();
  }
}
