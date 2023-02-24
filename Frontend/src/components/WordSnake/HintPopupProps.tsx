import React from 'react';
import "./HintPopupProps.css";


interface HintPopupProps {
  hint: string;
  onClose: () => void;
}

const HintPopup: React.FC<HintPopupProps> = ({ hint, onClose }) => {
  return (
    <div className="hint-popup">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <div className="hint-content">
        <p>{hint}</p>
      </div>
    </div>
  );
};

export default HintPopup;
