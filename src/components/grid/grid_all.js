import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { GridGraphicDesign } from "./grid_graphic_design";
import { GridPhoto } from "./grid_photo";
import { GridArt } from "./grid_art";

const img_grid_style = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
};

export function GridAll() {
  return (
    <div>
      <GridArt />
      <GridGraphicDesign />
      <GridPhoto />
    </div>
  );
}
