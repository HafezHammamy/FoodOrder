import React, { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./checkout";
import axios from "axios";
const Cart = (props) => {
  const [isCheckOut, setCheckOut] = useState(false);
  const cartCtx = useContext(cartContext);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };
  const decreaseCountHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const orderHandler = () => {
    setCheckOut(true);
  };
  const onSubmitHandler = (order) => {
    const newOrder = {
      customerDetails: { ...order },
      items: [...cartCtx.items],
      totalAmount: cartCtx.totalAmount,
    };
    axios
      .post(
        "https://foodorderapp-6811b-default-rtdb.firebaseio.com/orders.json",
        newOrder
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const isValidOrder = cartCtx.items.length > 0;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {" "}
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={decreaseCountHandler.bind(null, item.id)}
          item={item}
        />
      ))}
    </ul>
  );

  const cartAction = (
    <div className={classes.actions}>
      <button onClick={props.onCloseModal} className={classes["button--alt"]}>
        Close
      </button>
      {isValidOrder && (
        <button className={classes["button"]} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onCloseModal={props.onCloseModal}>
      <div className={classes["cart-item"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckOut && (
          <Checkout
            onConfirm={onSubmitHandler}
            onCloseModal={props.onCloseModal}
          />
        )}
        {!isCheckOut && cartAction}
      </div>
    </Modal>
  );
};

export default Cart;
