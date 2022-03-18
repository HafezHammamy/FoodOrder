import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let add = true;
    state.items.forEach((item) => {
      if (item.name === action.item.name) {
        item.amount += action.item.amount;
        add = false;
      }
    });
    let updatedItems = [];
    if (add) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = [...state.items];
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    let updatedItem = state.items[itemIndex];
    let updatedItems = [];
    if (updatedItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItem.amount -= 1;
      updatedItems[itemIndex] = updatedItem;
    }
    const totalAmount = state.totalAmount - updatedItem.price;
    console.log(itemIndex, action.id, state.items);
    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({
      type: "ADD",
      item: item,
    });
  };
  const removeItemHandler = (id) => {
    dispatchCart({
      type: "REMOVE",
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
