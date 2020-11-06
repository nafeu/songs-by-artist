import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBolt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="page-footer">
      <a href="https://github.com/nafeu/songs-by-artist">
        <FontAwesomeIcon icon={faGithub} />
      </a>{" "}
      / Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
      <a href="http://nafeu.com">Nafeu Nasir</a>. {" "}
      <FontAwesomeIcon icon={faBolt} />{" "}
      Powered by the <a href="https://genius.com/developers">Genius API</a>.
    </div>
  );
};

export default Footer;
