import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
  display: boolean;
};

const Modal = ({ children, onSave, onCancel, display }: ModalProps) => {
  if (!display) {
    return null;
  }

  return (
    <div className={styles.modal_container}>
      {children}
      <div className={styles.modal_buttons}>
        <button
          className={`${styles.button} ${styles.save_btn}`}
          onClick={onSave}
        >
          Save
        </button>
        <button
          className={`${styles.button} ${styles.cancel_btn}`}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
