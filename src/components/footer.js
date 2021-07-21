import React from "react";

import "../css/footer.css";

import picto_github from "../../media/picto/github.svg";
import picto_instagram from "../../media/picto/instagram.svg";

function ButtonPicto({ src, className, alt, href }) {
  return (
    <div className={className}>
      <a href={href} target="_blank">
        <img src={src} alt={alt} />
      </a>
    </div>
  );
}
export function Footer() {
  return (
    <>
      <footer>
        <div className="design">
          <div>
            {" "}
            © {new Date().getFullYear()}, Knupel
            {` `}
          </div>

          <ButtonPicto
            src={picto_github}
            className="picto_style"
            alt="github"
            href="https://github.com/StanLepunK"
          />
          <ButtonPicto
            src={picto_instagram}
            className="picto_style"
            alt="instagram"
            href="https://www.instagram.com/knupel_art/"
          />
        </div>
      </footer>
    </>
  );
}
