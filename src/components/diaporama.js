import * as React from "react";

import { useState, createContext, useContext } from "react";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "../css/diaporama.css";

export const DiapoContext = createContext(null);

function Title({ title, is, index, current, node }) {
  if (is === true) {
    return (
      <div className={index === current ? "slide active" : "slide"}>
        <h1>{node.base.split("_").join(" ").split(".")[0]}</h1>
      </div>
    );
  } else return null;
}

function Button({ click, name }) {
  return (
    <button className="button_nav" onClick={click}>
      {name}
    </button>
  );
}

function Console({ allFile, setting }) {
  const { current, set_current } = useContext(DiapoContext);

  const go_next = () => {
    if (current < allFile.edges.length - 1) {
      set_current(current + 1);
    } else {
      set_current(0);
    }
  };

  const go_first = () => {
    set_current(0);
  };

  const go_last = () => {
    set_current(allFile.edges.length - 1);
  };

  const go_previous = () => {
    if (current > 0) {
      set_current(current - 1);
    } else {
      set_current(allFile.edges.length - 1);
    }
  };

  return (
    <div>
      <Button click={go_first} name={setting.first} />
      <Button click={go_previous} name={setting.previous} />
      <Button click={go_next} name={setting.next} />
      <Button click={go_last} name={setting.last} />
    </div>
  );
}

// scrimba diaporama
// https://scrimba.com/scrim/cpqd9rta
export function Diaporama({ allFile, setting }) {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: setting.background,
  };

  const [current, set_current] = useState(0);

  // security
  if (!Array.isArray(allFile.edges) || allFile.edges.length <= 0) {
    return null;
  }

  return (
    <DiapoContext.Provider value={{ current, set_current }}>
      <div style={style}>
        {allFile.edges.map(({ node }, index) => (
          <div>
            <Title
              title={node.base.split("_").join(" ").split(".")[0]}
              is={index === current}
              node={node}
              index={index}
              current={current}
            />
            <div
              className={index === current ? "slide active" : "slide"}
              key={node.id}
              aria-hidden={index !== current}
            >
              {index === current && (
                <GatsbyImage image={getImage(node)} alt={node.base} />
              )}
            </div>
          </div>
        ))}
        <Console allFile={allFile} setting={setting} />
      </div>
    </DiapoContext.Provider>
  );
}
