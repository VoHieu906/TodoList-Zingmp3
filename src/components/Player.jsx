import React from "react";
import { customBackgoundColors } from "../ultis/colors";
const Player = () => {
  return (
    <div
      style={{
        backgroundColor: customBackgoundColors.color_400,
        height: "100%",
      }}
      className="px-4 row container-fluid m-0"
    >
      <div className="col-md-3 border border-primary">Detail Song</div>
      <div className="col-md-6 border border-primary">Main Player</div>
      <div className="col-md-3 border border-primary">Volumn</div>
    </div>
  );
};

export default Player;
