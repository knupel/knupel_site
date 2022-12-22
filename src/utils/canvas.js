/* Window
* 2021_2022 
* v 0.2.0
*/

import { useState, useRef, useLayoutEffect } from "react";

export function set_canvas(canvas) {
  // need that to pass gatsby build
  const browser_is = typeof window !== "undefined";
  if(browser_is) {
    canvas[0] = window.innerWidth
    canvas[1] = window.innerHeight
  }
}

export function GetWindow() {
  let canvas = [0, 0];
  set_canvas(canvas)

  const [size, set_size] = useState(canvas)
  useRef(size)

  useLayoutEffect(() => {
    function window_resize(event) {
      set_canvas(canvas)
      set_size(canvas[0], canvas[1])
    }
    window.addEventListener("resize", window_resize)
    return () => {
      window.removeEventListener("resize", window_resize)
    }
  }, [canvas])
  return canvas
}


export function GetWidth() {
  return GetWindow()[0];
}

export function GetHeight() {
  return GetWindow()[1];
}

export function Window_is_higher_than(value) {
  let res = false;
  if(GetWidth() > value) {
    res = true;
  }
  return res;
}



