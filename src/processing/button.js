export function button(p5) {
  let pos = p5.createVector(0, 0);
  let size = p5.createVector(0, 0);
  let rounded = 0;
  let inside_is = false;

  p5.setup = function () {
    p5.createCanvas(150, 100);

    size.set(p5.width / 2, p5.height / 2);
    pos.set(size.x / 2, size.y / 2);
    rounded = p5.height / 2;
  };

  p5.draw = function () {
    let cursor = p5.createVector(p5.mouseX, p5.mouseY);

    inside_is = inside_rect(cursor, pos, size);
    p5.clear();
    if (inside_is) {
      animation_in(pos, size, rounded);
    } else {
      animation_out(pos, size, rounded);
    }
    show_label();
  };

  function animation_in(s) {
    let ratio = p5.abs(p5.sin(p5.frameCount * 0.05));

    let diam = p5.map(ratio, 0, 1, p5.height / 5, p5.height / 2);
    let x = p5.width / 2;
    let y = p5.height / 2;
    p5.noStroke();
    p5.fill("cyan");
    p5.ellipse(x, y, diam, diam);
  }

  function animation_out(p, s, r) {
    p5.noStroke();
    p5.fill("magenta");
    p5.rect(p.x, p.y, s.x, s.y, r);
  }

  function show_label() {
    p5.noStroke();
    p5.fill(0);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(p5.data.title, p5.width / 2, p5.height / 2);
  }
}

const inside_rect = function (cursor, pos, size) {
  let x = cursor.x;
  let y = cursor.y;
  let px = pos.x;
  let py = pos.y;
  let sx = size.x;
  let sy = size.y;
  let bool_x = false;
  if (x < px + sx && x > px) {
    bool_x = true;
  }
  let bool_y = false;
  if (y < py + sy && y > py) {
    bool_y = true;
  }

  if (bool_x && bool_y) return true;
  return false;
};
