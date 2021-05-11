import React from "react"
import "../styles/layout.css"
import { Header } from "../components/header"

import P5Wrapper from "../components/P5Wrapper"

function sketch(p) {
  p.preload = () => {}
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    // p.createCanvas(p.windowWidth, p.windowHeight, p5_renderer);
    // p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }
  p.draw = () => {
    p.background(255, 255, 0)
    let size = 100
    let m = mouse(p, p.WEBGL)
    let x = m[0] - size / 2
    let y = m[1] - size / 2

    let rounded = 10
    p.noStroke()
    p.rect(x, y, size, size, rounded)
  }
}

function mouse(p, renderer) {
  let xy = [0, 0]
  if (renderer === "webgl") {
    xy[0] = p.mouseX - p.windowWidth / 2
    xy[1] = p.mouseY - p.windowHeight / 2
    return xy
  }
  xy[0] = p.mouseX
  xy[1] = p.mouseY
  return xy
}

export default function Home() {
  return (
    <div>
      <div style={{ position: "absolute" }}>
        <P5Wrapper sketch={sketch}></P5Wrapper>
      </div>
      <div style={{ position: "absolute" }}>
        <Header str="Ici Knupel, here Knupel, Herr Knupel" color_text="red" />
      </div>
    </div>
  )
}
