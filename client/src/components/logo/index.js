import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function Logo() {
  return (
    <div className="logo">
      <FontAwesomeIcon icon={faMusic} /> Songs By{" "}
      <span className="logo-bold">Artist</span>
    </div>
  );
}

export default Logo;