import React from "react";
import Draggable from 'react-draggable';

interface AdminFeedbackModelProps {
    adminFeedbackMessages: string[];
    onClose: () => void;
}

const AdminFeedbackModel: React.FC<AdminFeedbackModelProps> = ({ adminFeedbackMessages, onClose }) => {
    
    return (
        <Draggable>
        <div className="adminFBpopup">
            <button className="adminFbClose-btn" onClick={onClose}>
            X
            </button>

            <div className="adminFB">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Feedback</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminFeedbackMessages.map((message, index) => (
                            <tr key={index} className="feedbackItem">
                                {message.split(',').map((column, columnIndex) => (
                                    <td key={columnIndex}>{column}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        </Draggable>
    );
};

export default AdminFeedbackModel;
