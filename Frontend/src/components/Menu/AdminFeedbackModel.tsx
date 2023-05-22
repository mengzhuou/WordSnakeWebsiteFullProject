import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import {updateFeedbackStatus} from '../../helpers/connector';


interface AdminFeedbackModelProps {
    adminFeedbackMessages: string[];
    onClose: () => void;
}

const AdminFeedbackModel: React.FC<AdminFeedbackModelProps> = ({ adminFeedbackMessages, onClose }) => {
    
    const [sortedMessage, setSortedMessage] = useState(adminFeedbackMessages);
    const [statusSort, setStatusSort] = useState(false);

    const statusOrder = { "Pending": 1, "New": 2, "Done": 3};

    useEffect(() => {
        const sorted = [...adminFeedbackMessages].sort((a,b) => {
            const aStatus = a.split(',')[4];
            const bStatus = b.split(',')[4];
            const order = statusSort ? 1 : -1;
            return (statusOrder[aStatus as keyof typeof statusOrder] - statusOrder[bStatus as keyof typeof statusOrder]) * order;
        });
        setSortedMessage(sorted);
    }, [adminFeedbackMessages, statusSort]);

    const handleStatusHeaderClick = () => {
        setStatusSort((prevSortAscending) => !prevSortAscending);
    }

    const handleStatusUpdate = (fbId: string, newStatus: string) => {
        const feedbackId = parseInt(fbId,10);
        updateFeedbackStatus(feedbackId, newStatus).then(()=>{
            const updatedMessages = sortedMessage.map((message)=>{
                const [id, email, feedback, rating, status, timestamp] = message.split(',');
                if (id === fbId){
                    return [id, email, feedback, rating, newStatus, timestamp].join(',');
                } else{
                    return message;
                }
            })
            setSortedMessage(updatedMessages);
        }).catch((error: Error)=>{
            console.error("Error updating feedback status: ", error);
        })
    }

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
                            <th>
                                <button className="statusHeader" onClick={handleStatusHeaderClick}>
                                    Status {statusSort ? '▲' : '▼'}

                                </button>
                            </th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMessage.map((message, index) => {
                            const [id, email, feedback, rating, status, timestamp] = message.split(',');

                            return (
                                <tr key={id} className="feedbackItem">
                                    <td>{id}</td>
                                    <td>{email}</td>
                                    <td>{feedback}</td>
                                    <td>{rating}</td>
                                    <td>
                                        <select
                                            className="statusCss"
                                            value={status}
                                            onChange={(e) => handleStatusUpdate(id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="New">New</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </td>
                                    <td>{timestamp}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
        </Draggable>
    );
};

export default AdminFeedbackModel;
