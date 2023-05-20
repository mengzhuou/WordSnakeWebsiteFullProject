import React from "react";
import Draggable from 'react-draggable';

interface FeedbackModelProps {
    message: string,
    rating: number,
    onClose: () => void,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onRatingChange: (rating: number) => void,
    onSubmit: () => void
}

const FeedbackModel: React.FC<FeedbackModelProps> = ({ message, rating, onClose, onChange, onRatingChange, onSubmit }) => {
    
    const handleSelectedStar = (selectedStar: number) => {
        console.log("Selected Star: ", selectedStar);
        onRatingChange(selectedStar);
    };

    return (
        <Draggable>
        <div className="fbpopup">
            <button className="fbClose-btn" onClick={onClose}>
            X
            </button>

            <form onSubmit={(event) => {event.preventDefault(); onSubmit();}}>
                <textarea value={message} onChange={onChange}></textarea>

                <div className="ratingContainer">
                    {[1,2,3,4,5].map((star) => (
                    <span
                        key = {star}
                        className = {`star ${star <= rating ? "selected" : ""}`}
                        onClick={() => {console.log(`Star ${star} clicked`); handleSelectedStar(star);}}
                    >
                        &#9733;
                    </span>
                    ))}
                </div>

                <button type="submit" className="fbSubmitButton">Submit</button>
            </form>
        </div>
        </Draggable>
    );
};

export default FeedbackModel;
