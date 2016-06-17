// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
// Author Larry Kuhns 2011

import { Vex } from './vex';
import { StaveModifier } from './stavemodifier';
export class Volta extends StaveModifier {
  static get type() {
    return {
      NONE: 1,
      BEGIN: 2,
      MID: 3,
      END: 4,
      BEGIN_END: 5
    };
  }
  constructor(type, number, x, y_shift) {
    super();
    this.volta = type;
    this.x = x;
    this.y_shift = y_shift;
    this.number = number;
    this.font = {
      family: "sans-serif",
      size: 9,
      weight: "bold"
    };
  }
  getCategory() { return "voltas"; }
  setShiftY(y) { this.y_shift = y; return this; }
  draw(stave, x) {
    if (!stave.context) throw new Vex.RERR("NoCanvasContext",
      "Can't draw stave without canvas context.");
    var ctx = stave.context;
    var width = stave.width;
    var top_y = stave.getYForTopText(stave.options.num_lines) + this.y_shift;
    var vert_height = 1.5 * stave.options.spacing_between_lines_px;
    switch(this.volta) {
      case Volta.type.BEGIN:
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        break;
      case Volta.type.END:
        width -= 5;
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
      case Volta.type.BEGIN_END:
        width -= 3;
        ctx.fillRect(this.x + x, top_y, 1, vert_height);
        ctx.fillRect(this.x + x + width, top_y, 1, vert_height);
        break;
    }
      // If the beginning of a volta, draw measure number
    if (this.volta == Volta.type.BEGIN ||
        this.volta == Volta.type.BEGIN_END) {
      ctx.save();
      ctx.setFont(this.font.family, this.font.size, this.font.weight);
      ctx.fillText(this.number, this.x + x + 5, top_y + 15);
      ctx.restore();
    }
    ctx.fillRect(this.x + x, top_y, width, 1);
    return this;
  }
}
