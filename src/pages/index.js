// REACT
import React from "react";
import { useEffect, useState } from "react";

// APP
import { Layout } from "../components/struct/layout";

//KNUPEL
import { GridAll } from "../components/grid/grid_all";

function Home() {
  // https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

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
    <Layout>
      <div>
        <GridAll />
      </div>
    </Layout>
  );
}

export default Home;

