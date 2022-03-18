import React from "react";
import { Fragment } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return reactDom.createPortal(
    <Fragment>
      <Backdrop onCancel={props.onCloseModal} />
      <ModalOverlay onCancel={props.onCloseModal}>
        {props.children}
      </ModalOverlay>
    </Fragment>,
    document.getElementById("overlays")
  );
};

export default Modal;
