import React from "react";
import classes from "./checkout.module.css";
import useInput from "./../../hooks/input-hook";

const isNotEmpty = (enteredValue) => enteredValue.trim() !== "";
const isNotFiveChar = (enteredValue) => enteredValue.trim().length === 5;

const Checkout = (props) => {
  const {
    inputValue: enteredName,
    onInputChangeValue: onChangeNameHandler,
    onInputBlurHandler: onBlurNameHandler,
    isValid: isValidName,
    hasErrors: nameHasErrors,
  } = useInput(isNotEmpty);

  const {
    inputValue: enteredAddress,
    onInputChangeValue: onChangeAddressHandler,
    onInputBlurHandler: onBlurAddressHandler,
    isValid: isValidAddress,
    hasErrors: addressHasErrors,
  } = useInput(isNotEmpty);

  const {
    inputValue: enteredPostal,
    onInputChangeValue: onChangePostalHandler,
    onInputBlurHandler: onBlurPostalHandler,
    isValid: isValidPostal,
    hasErrors: postalHasErrors,
  } = useInput(isNotFiveChar);

  const {
    inputValue: enteredCity,
    onInputChangeValue: onChangeCityHandler,
    onInputBlurHandler: onBlurCityHandler,
    isValid: isValidCity,
    hasErrors: cityHasErrors,
  } = useInput(isNotEmpty);

  const getClasses = (hasErrors) => {
    return `${classes.control} ${hasErrors ? classes.invalid : ""}`;
  };

  const isValidForm =
    isValidName && isValidAddress && isValidPostal && isValidCity;

  const confirmHandler = (event) => {
    event.preventDefault();
    if (isValidForm) {
      const order = {
        name: enteredName,
        address: enteredAddress,
        postal: enteredPostal,
        city: enteredCity,
      };
      props.onConfirm(order);
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={getClasses(nameHasErrors)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={onChangeNameHandler}
          onBlur={onBlurNameHandler}
        />
      </div>
      <div className={getClasses(addressHasErrors)}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={onChangeAddressHandler}
          onBlur={onBlurAddressHandler}
        />
      </div>
      <div className={getClasses(postalHasErrors)}>
        <label htmlFor="postal">Postal</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={onChangePostalHandler}
          onBlur={onBlurPostalHandler}
        />
      </div>
      <div className={getClasses(cityHasErrors)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={onChangeCityHandler}
          onBlur={onBlurCityHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseModal}>
          Cancel
        </button>
        <button disabled={!isValidForm} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
