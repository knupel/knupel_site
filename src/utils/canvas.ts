/* Utils Canvas
* 2021_2023
* v 0.4.0
*/

import { useState, useRef, useLayoutEffect } from "react";





function set_window(canvas : any) {
  // need that to pass gatsby build
  const browser_is = typeof window !== "undefined";
  if(browser_is) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

export function use_get_window() {
  let canvas = {width:0, height:0};
  set_window(canvas)

  const [size, set_size] = useState(canvas);
  useRef(size);

  useLayoutEffect(() => {
    function window_resize(event : any) {
      set_window(canvas)
      set_size(canvas)
    }
    window.addEventListener("resize", window_resize)
    return () => {
      window.removeEventListener("resize", window_resize)
    }
  }, [canvas])
  return canvas
}


export function use_get_width() {
  return use_get_window().width;
}

export function use_get_heightt() {
  return use_get_window().height;
}

export function use_width_higher_than(value : number) {
  const [arg, set_arg] = useState(0);
  const browser_is = typeof window !== "undefined";
  if(arg === 0 && browser_is) {
    set_arg(value);
  }

  if(use_get_width() > arg) {
    return true;
  } else return false;
}

export function use_height_higher_than(value : number) {
  const [arg, set_arg] = useState(0);
  const browser_is = typeof window !== "undefined";
  if(arg === 0 && browser_is) {
    set_arg(value);
  }

  if(use_get_width() > arg) {
    return true;
  } else return false;
}

export function in_canvas(cursor : any, pos : any, canvas : any) {
  if( cursor.x > pos.x && 
      cursor.x < pos.x + canvas.width && 
      cursor.y > pos.y && 
      cursor.y < pos.y + canvas.height) {
    return true;
  } else return false;
}
// /* Utils Canvas
// * 2021_2023
// * v 0.3.2
// */

// import { useState, useRef, useLayoutEffect } from "react";

// function set_window(canvas : any) {
//   // need that to pass gatsby build
//   const browser_is = typeof window !== "undefined";
//   if(browser_is) {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//   }
// }

// export function GetWindow() {
//   let canvas = {width:0, height:0};
//   set_window(canvas)

//   const [size, set_size] = useState(canvas);
//   useRef(size);

//   useLayoutEffect(() => {
//     function window_resize(event : any) {
//       set_window(canvas)
//       set_size(canvas)
//     }
//     window.addEventListener("resize", window_resize)
//     return () => {
//       window.removeEventListener("resize", window_resize)
//     }
//   }, [canvas])
//   return canvas
// }


// export function GetWidth() {
//   return GetWindow().width;
// }

// export function GetHeight() {
//   return GetWindow().height;
// }

// export function WidthIsHigherThan(value : number) {
//   if(GetWidth() > value) {
//     return true;
//   } else return false;
// }

// export function HeightIsHigherThan(value : number) {
//   if(GetHeight() > value) {
//     return true;
//   } else return false;
// }

// export function in_canvas(cursor : any, pos : any, canvas : any) {
//   if( cursor.x > pos.x && 
//       cursor.x < pos.x + canvas.width && 
//       cursor.y > pos.y && 
//       cursor.y < pos.y + canvas.height) {
//     return true;
//   } else return false;
// }