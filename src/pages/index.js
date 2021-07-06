import React from "react";
import "../styles/layout.css";
import { Header } from "../components/header";
import { GridArt } from "../components/gridart";

import P5Wrapper from "../components/P5Wrapper";
import P5Manager from "../components/P5Manager";

const home_p5 = P5Wrapper("home p5");

const Home = () => (
  <>
    <div style={{ position: "relative" }}>
      {/* <div style={{ position: "absolute" }}> */}
      <GridArt />
    </div>
    {/* <P5Manager>
      <div style={{ position: "absolute" }}>
        <Buffer comp={home_p5} />
      </div>
    </P5Manager> */}
  </>
);

/* <div style={{ position: "absolute" }}>
      <Header
        str="Ici Knupel, here Knupel, Herr Knupel, Monsieur Knupel"
        color_text="red"
      />
    </div> */

export default Home;

function Buffer(props) {
  return <props.comp sketch={sketch}></props.comp>;
}

function sketch(p) {
  p.preload = () => {};
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
  p.draw = () => {
    p.background(255, 255, 0, 0);
    p.clear();
    let size = 100;
    let x = p.mouseX;
    let y = p.mouseY;

    let rounded = 10;
    p.noStroke();
    p.fill(255, 0, 0);
    p.circle(x, y, size);
  };
}
