import React from "react";
import img from "../assets/vite.svg";

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={img} />
    </div>
  );
}

export default Logo;
