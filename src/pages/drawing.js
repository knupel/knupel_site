import * as React from "react";

import { Layout } from "../components/layout";
import { GridDrawing } from "../components/grid/grid_drawing";

// markup
const Drawing = () => {
  return (
    <Layout>
      <div>
        <GridDrawing />
      </div>
    </Layout>
  );
};

export default Drawing;
