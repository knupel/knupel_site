export function button(p5) {
  let pos = p5.createVector(0, 0);
  let size = p5.createVector(0, 0);
  let rounded = 0;
  let inside_is = false;

  p5.setup = function () {
    if (p5.data === undefined) {
      p5.createCanvas(150, 25);
    } else {
      p5.createCanvas(p5.data.width, p5.data.height);
    }
    set_info_size(p5.width, p5.height);
    p5.windowResized = () => {
      p5.resizeCanvas(p5.data.width, p5.data.height);
      set_info_size(p5.data.width, p5.data.height);
    };
  };

  p5.draw = function () {
    if (p5.width !== p5.data.width || p5.height !== p5.data.height) {
      p5.resizeCanvas(p5.data.width, p5.data.height);
      set_info_size(p5.width, p5.height);
    }

    let cursor = p5.createVector(p5.mouseX, p5.mouseY);

    inside_is = inside_rect(cursor, pos, size);
    p5.clear();
    if (inside_is) {
      animation_in(pos, size, rounded);
    }
    show_label();
  };

  function set_info_size(width, height) {
    size.set(width / 2, height / 2);
    pos.set(size.x / 2, size.y / 2);
    rounded = height / 2;
  }

  function animation_in(s) {
    let ratio_a = p5.abs(p5.sin(p5.frameCount * 0.05));
    let ratio_b = p5.abs(p5.sin(p5.frameCount * 0.03));
    let ax = ratio_a * p5.width;
    let bx = ratio_b * p5.width;
    p5.noStroke();
    p5.fill("cyan");
    p5.quad(ax, 0, bx, 0, bx, p5.height, ax, p5.height);
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
