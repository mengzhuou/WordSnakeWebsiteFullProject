import React from "react";
import Draggable from 'react-draggable';
import {getChatGPTSearchingDefinition} from '../../helpers/connector';


interface FeedbackModelProps {
    word: string,
    definition: number,
    onClose: () => void,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onSubmit: () => void
}

const AddWordModel: React.FC<FeedbackModelProps> = ({ word, definition, onClose, onChange, onSubmit }) => {
    return (
        <Draggable>
        <div className="fbpopup">
            <button className="fbClose-btn" onClick={onClose}>
            X
            </button>

            <form className="fbform" onSubmit={(event) => {event.preventDefault(); onSubmit();}}>
                <textarea value={word} onChange={onChange}></textarea>

                <button type="submit" className="fbSubmitButton">Submit</button>
            </form>
        </div>
        </Draggable>
    );
};

export default AddWordModel;
