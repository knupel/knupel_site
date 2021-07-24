import * as React from "react";

import { Layout } from "../components/layout";
import { GridGraphicDesign } from "../components/grid/grid_graphic_design";

// markup
const GraphicDesign = () => {
  return (
    <Layout>
      <div>
        <GridGraphicDesign />
      </div>
    </Layout>
  );
};

export default GraphicDesign;
