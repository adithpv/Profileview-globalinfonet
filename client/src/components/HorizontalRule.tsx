import React from "react";

import style from "../styles/horizontalRule.module.css";

const HorizontalRule = () => {
  return (
    <div className="container">
      <hr className={style["horizontal__rule"]} />
    </div>
  );
};

export default HorizontalRule;
