import React from "react";
import { useEffect, useState } from "react";

import "../styles/layout.css";
import { Header } from "../components/header";
import { GridArt } from "../components/gridart";

import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";

const home_p5 = P5Wrapper("home p5");

function Home() {
  const [scroll, set_scroll] = useState([]);
  const grab_scroll = () => {
    const x = window.pageXOffset;
    const y = window.pageYOffset;
    set_scroll([x, y]);
  };

  useEffect(() => {
    window.addEventListener("scroll", grab_scroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", grab_scroll);
    };
  }, []);

  return (
    <>
      <div>
        <GridArt />
      </div>
      <P5Manager>
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: `${scroll[1]}px`,
            zIndex: "1",
          }}
        >
          <Buffer comp={home_p5} />
        </div>
      </P5Manager>
    </>
  );
}

export default Home;

function Buffer(props) {
  return <props.comp sketch={sketch}></props.comp>;
}

function sketch(p) {
  p.preload = () => {};
  p.setup = () => {
    p.colorMode(p.HSB, 1, 1, 1, 1);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  p.draw = () => {
    p.background(0, 0);
    if (p.mouseIsPressed) {
      p.clear();
    }
    let diam = 100;
    let normal = p.sin(p.frameCount * 0.05);
    let size = p.map(normal, -1, 1, 10, 200);
    // hue
    let hue = p.abs(p.sin(p.frameCount * 0.006));

    let rounded = 10;
    p.noStroke();
    p.fill(hue, 1, 1, 0.02);
    let x = p.mouseX;
    let y = p.mouseY;
    p.circle(x, y, size);
  };
}
