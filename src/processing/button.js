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

  function convertFromHexString(hex_str) {
    if(hex_str === undefined) {
      return "#000000";
    }
    let str = '';
    const arr = hex_str.split("");
    for(let i = 0; i< arr.length ;i++) {
      str += arr[i];
    }
    return str;
  }

  function show_label() {

    p5.noStroke();
    let hex = convertFromHexString(p5.data.font_color);
    let c = p5.color(hex);
    p5.fill(c);
    p5.textSize(p5.data.font_size);
    p5.textAlign(p5.CENTER, p5.CENTER);

    p5.textFont("aglet-mono, mono");
    // p5.textStyle(p5.LIGHT);
    // p5.textStyle(p5.NORMAL);
    // p5.textStyle(p5.SEMIBOLD);
    p5.textStyle(p5.BOLD);
    p5.text(p5.data.label, p5.width / 2, p5.height / 2);
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
