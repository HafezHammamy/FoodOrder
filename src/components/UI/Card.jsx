import React from "react";

import classes from "./Card.module.css";
const Card = (props) => {
  let allClasses = `${classes.card} ${props.className}`;
  return <div className={allClasses}>{props.children}</div>;
};

export default Card;
