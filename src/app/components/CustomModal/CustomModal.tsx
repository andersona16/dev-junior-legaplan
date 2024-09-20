import React, { FC, useState } from "react";
import styles from "./CustomModal.module.scss";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (data: string) => void;
  cancelButtonText?: string;
  submitButtonText?: string;
  cancelButtonColor?: string;
  submitButtonColor?: string;
  inputLabel?: string;
  hasInput?: boolean;
}

const Modal: FC<ModalProps> = ({
  title,
  onClose,
  onSubmit,
  cancelButtonText = "Cancelar",
  submitButtonText = "Enviar",
  submitButtonColor = "#4caf50",
  inputLabel,
  hasInput = true,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.modalTitle}>{title}</h1>

        {hasInput && (
          <div className={styles.modalInputContainer}>
            {inputLabel && (
              <label className={styles.modalInputLabel}>{inputLabel}</label>
            )}
            <input
              placeholder="Digite"
              type="text"
              className={styles.modalInput}
              value={inputValue}
              onChange={handleChange}
            />
          </div>
        )}
        {!hasInput && (
          <>
            <div className={styles.containerDelete}>
              <p>Tem certeza que você deseja deletar essa tarefa?</p>
            </div>
          </>
        )}
        <div className={styles.modalButtons}>
          <button
            className={styles.modalButton}
            style={{ color: "#000000" }}
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
          <button
            className={styles.modalButton}
            style={{ background: submitButtonColor }}
            onClick={handleSubmit}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
