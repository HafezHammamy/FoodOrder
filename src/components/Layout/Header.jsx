import React, { Fragment } from "react";

import classes from "./Header.module.css";
import header from "../../assets/header.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Hader = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onOpenModal={props.onOpenModal} />
      </header>
      <div className={classes.mainImage}>
        <img src={header} alt="header" />
      </div>
    </Fragment>
  );
};

export default Hader;
