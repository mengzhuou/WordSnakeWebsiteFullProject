import React from "react";
import Draggable from 'react-draggable';

interface FeedbackModelProps {
    message: "",
    onClose: () => void,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onSubmit: () => void
}

const FeedbackModel: React.FC<FeedbackModelProps> = ({ message, onClose, onChange, onSubmit }) => {
  return (
    <Draggable>
      <div className="fbpopup">
        <button className="fbClose-btn" onClick={onClose}>
          X
        </button>

        <form onSubmit={(event) => {event.preventDefault(); onSubmit();}}>
            <textarea value={message} onChange={onChange}></textarea>
            <button type="submit" className="fbSubmitButton">Submit</button>
        </form>
      </div>
    </Draggable>
  );
};

export default FeedbackModel;
