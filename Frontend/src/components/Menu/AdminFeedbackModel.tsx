import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';

interface AdminFeedbackModelProps {
    adminFeedbackMessages: string[];
    onClose: () => void;
}

const AdminFeedbackModel: React.FC<AdminFeedbackModelProps> = ({ adminFeedbackMessages, onClose }) => {
    
    const [sortedMessage, setSortedMessage] = useState(adminFeedbackMessages);
    const [statusSort, setStatusSort] = useState(false);
    const [isSort, setIsSort] = useState(false);

    const statusOrder = { "Pending": 1, "New": 2, "Done": 3};

    useEffect(() => {
        if(isSort){
            const sorted = [...adminFeedbackMessages].sort((a,b) => {
                const aStatus = a.split(',')[4];
                const bStatus = b.split(',')[4];
                const order = statusSort ? 1 : -1;
                return (statusOrder[aStatus as keyof typeof statusOrder] - statusOrder[bStatus as keyof typeof statusOrder]) * order;
            });
            setSortedMessage(sorted);
        }
        else{
            setSortedMessage(adminFeedbackMessages)
        }
    }, [adminFeedbackMessages, statusSort, isSort]);

    const handleStatusHeaderClick = () => {
        setStatusSort((prevSortAscending) => !prevSortAscending);
        if (isSort){
            setIsSort(false);
        }
        else{
            setIsSort(true);
        }
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
                        {sortedMessage.map((message, index) => (
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
