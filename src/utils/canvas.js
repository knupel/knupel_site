/* Window
* 2021_2022 
* v 0.1.2
*/

import { useState, useRef, useLayoutEffect } from "react"

export function set_canvas(canvas) {
  // need that to pass gatsby build
  if (typeof window !== `undefined`) {
    canvas[0] = window.innerWidth
    canvas[1] = window.innerHeight
  }
}

export function Get_window() {
  let canvas = [0, 0]
  set_canvas(canvas)

  const [size, set_size] = useState(canvas)
  useRef(size)

  // MAY be the problem is here ????
  // Error in function throwOnHydrationMismatch in ./node_modules/react-dom/cjs/react-dom.development.js:12507
  
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

export function Get_width() {
  return Get_window()[0];
}

export function Get_height() {
  return Get_window()[1];
}

export function Window_is_higher_than(value) {
  let res = false;
  if(Get_width() > value) {
    res = true;
  }
  return res;
}
