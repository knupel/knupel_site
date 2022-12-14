import React from "react";

import "./footer.css";

import picto_github from "../../../media/picto/github.svg";
import picto_instagram from "../../../media/picto/instagram.svg";

function ButtonPicto({ src, cssPicto, cssPictoContainer, alt, href }) {
  return (
    <div className={cssPictoContainer}>
      <div className={cssPicto}>
        <a href={href} target="_blank">
          <img src={src} alt={alt} />
        </a>
      </div>
    </div>
  );
}
function ContentText({ content }) {
  return <div className="txt">{content}</div>;
}
export function Footer() {
  return (
    <>
      <div className="f_bar">
        <ContentText
          content={
            <h4>
              {``}© 2021-{new Date().getFullYear()} Knupel
              {``}
            </h4>
          }
        />

        <ButtonPicto
          src={picto_instagram}
          cssPicto="picto"
          cssPictoContainer="picto_container"
          alt="instagram"
          href="https://www.instagram.com/knupel_art/"
        />
        <ButtonPicto
          src={picto_github}
          cssPicto="picto"
          cssPictoContainer="picto_container"
          alt="github"
          href="https://github.com/knupel"
        />
      </div>
    </>
  );
}
