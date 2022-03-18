import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import cartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(cartContext);
  const [isHilighted, setIsHilightd] = useState(false);
  const numberOfItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  let buttonClasses = `${classes.button} ${isHilighted ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setIsHilightd(true);
    const timer = setTimeout(() => {
      setIsHilightd(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button onClick={props.onOpenModal} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
