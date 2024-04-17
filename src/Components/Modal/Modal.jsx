import React, { useState } from "react";
import "./modal.css";

export const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};



