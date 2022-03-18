import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value.trim();
    const enteredAmountNumber = +amountRef.current.value;
    if (
      enteredAmount.length === 0 ||
      enteredAmountNumber <= 0 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    }

    props.onAddAmount(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
