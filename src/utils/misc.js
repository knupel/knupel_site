
import { useEffect, useState, useRef, useLayoutEffect } from "react";
/**
 * UTILS MISC
 * v 0.3.0
 * 2021-2022
 * */

// constants
export function SetConstants(r, brownser_is) {
  useEffect(() => {
    if (brownser_is) {
      localStorage.setItem("constants", JSON.stringify(r));
    }
  }, ["constants", r]);
}

export function get_constants() {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    const constants = localStorage.getItem("constants");
    return constants !== null ? JSON.parse(constants) : "";
  }
  return "";
}

// language
export function get_lang() {
  const brownser_is = typeof window !== "undefined";
  let lang = "fr";
  if (brownser_is) {
    lang = localStorage.getItem("lang");
  }
  return lang;
}

export function find_lang(arr, target, lang) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === target) {
      if (lang === "en") return arr[i].label_en;
      else return arr[i].label_fr;
    }
  }
  return null;
}

export function content_by_lang(content_arr, what, nothing_match) {
  if (get_lang() === "fr") {
    return find_lang(content_arr, what, "fr");
  } else if (get_lang() === "en") {
    return find_lang(content_arr, what, "en");
  }
  return nothing_match;
}

// String conversion
export function str_unit_to_number(unit, str) {
  str = str.replace(unit, "");
  if (!isNaN(str)) {
    let res = Number(str);
    return res;
  } else return null;
}



export function set_label(elem) {
  if (get_lang() === "fr") {
    return elem.label_fr;
  } else {
    return elem.label_en;
  }
}

export function set_width(label, setting) {
  if (label !== undefined) {
    let width = label.length * setting.font_size * setting.ratio_width;
    if (width < setting.min_width) {
      return setting.min_width;
    } else return width;
  } else return 100;
}


export function get_css_value(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}



export function set_canvas(canvas) {
  // need that to pass gatsby build
  if (typeof window !== `undefined`) {
    canvas[0] = window.innerWidth
    canvas[1] = window.innerHeight
  }
}

export function GetWindow() {
  let canvas = [0, 0]
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