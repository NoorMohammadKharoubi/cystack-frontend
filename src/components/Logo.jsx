import React from "react";
import Image from "react-bootstrap/Image";

function Logo(props) {
  return (
    <Image
      src="images/cystackLogo.png"
      className={props.className}
      style={props.style}
    />
  );
}

export default Logo;
