// REACT
import React from "react";
// APP
import { Layout } from "../components/struct/layout";
import { GridAll } from "../components/grid/grid_all";

function Home() {
  // https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  return (
    <Layout>
      <div>
        <GridAll />
      </div>
    </Layout>
  );
}

export default Home;



export const Head = () => {
	<>
		<title>Knupel</title>
		<meta name="author" content="Knupel" />
		<meta name="description" content="Knupel est un artiste codeur. Son travail navigue entre l'art génératif, le graphisme, l'illustration et au développement web" />
	</>
}

