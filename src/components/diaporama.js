import * as React from "react";

import { useState } from "react";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "../css/diaporama.css";

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
  return <button onClick={click}>{name}</button>;
}

export default Button;

// scrimba diaporama
// https://scrimba.com/scrim/cpqd9rta
export function Diaporama({ allFile, background }) {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: background,
  };

  const [current, set_current] = useState(0);

  const goto_next = () => {
    if (current < allFile.edges.length) {
      set_current(current + 1);
    } else {
      set_current(0);
    }
  };

  const goto_previous = () => {
    if (current >= 0) {
      set_current(current - 1);
    } else {
      set_current(allFile.edges.length - 1);
    }
  };

  // security
  if (!Array.isArray(allFile.edges) || allFile.edges.length <= 0) {
    return null;
  }

  return (
    <div style={style}>
      <Button click={goto_next} name="next" />
      <Button click={goto_previous} name="previous" />
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
    </div>
  );
}

// import * as React from "react";
// https://www.youtube.com/watch?v=GOg6u6h_aqQ
// import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "react-bootstrap/Carousel";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

// export function Diaporama({ allFile, background }) {
//   const style = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     background: background,
//     // minHeight: "100vh",
//   };
//   return (
//     <div style={style}>
//       <Carousel fade nextLabel="" prevLabel="">
//         {allFile.edges.map(({ node }) => (
//           <Carousel.Item key={node.id}>
//             <GatsbyImage
//               // className="d-block w-100"
//               image={getImage(node)}
//               alt={node.base}
//             />
//             <Carousel.Caption>
//               <h3>{node.base.split("_").join(" ").split(".")[0]}</h3>
//               {/* <p>et autres bêtises</p> */}
//             </Carousel.Caption>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// }
