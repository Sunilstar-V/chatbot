import React from "react";
import "./Popup.css";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;