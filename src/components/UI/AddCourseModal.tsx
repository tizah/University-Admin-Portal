import React, { FC, ReactNode, useMemo, MouseEvent } from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";

interface ModalProps {
  onClose: () => void;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  onSave: () => void;
  title: string;
  loading: boolean;
  children: ReactNode;
}

const AddCourseModal: FC<ModalProps> = ({
  onClose,
  onSave,
  title,
  loading,
  children,
}) => {
  const targetEl = document.getElementById("modal-root");

  const modal = useMemo(
    () => (
      <div className="modal">
        <div className="modal-background" onClick={onClose}></div>
        <div className="modal-card" style={{ height: "70%", width: "70%" }}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={onClose}
            ></button>
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            <button className="button" onClick={onClose}>
              Cancel
            </button>

            <Button
              onClick={onSave}
              text={loading ? "Saving Courses" : "Save"}
              className={"is-primary"}
              disabled={loading}
            />
          </footer>
        </div>
      </div>
    ),
    [onClose, onSave, title, loading]
  );

  return targetEl ? ReactDOM.createPortal(modal, targetEl) : modal;
};

export default AddCourseModal;
