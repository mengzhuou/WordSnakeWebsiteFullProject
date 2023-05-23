import React from "react";
import Draggable from 'react-draggable';
import { updateFeedbackStatus, getFeedback } from '../../helpers/connector';

interface AdminFeedbackModelProps {
    onClose: () => void;
}

interface AdminFeedbackModelState {
    sortedMessage: string[];
    statusSort: boolean;
    adminFeedbackMessages: string[];
    idSort: boolean;
}

class AdminFeedbackModel extends React.Component<AdminFeedbackModelProps, AdminFeedbackModelState> {
    private statusOrder = { "Pending": 1, "New": 2, "Done": 3 };

    constructor(props: AdminFeedbackModelProps) {
        super(props);
        this.state = {
            sortedMessage: [],
            statusSort: false,
            adminFeedbackMessages: [],
            idSort: false,

        };
    }

    componentDidMount() {
        this.displayFeedback();
    }

    displayFeedback = async () => {
        console.log("displayFeedback is clicked");
        const fbContent = await getFeedback();
        this.setState({ adminFeedbackMessages: fbContent});
    }

    componentDidUpdate(prevProps: AdminFeedbackModelProps, prevState: AdminFeedbackModelState) {
        if (
            this.state.adminFeedbackMessages !== prevState.adminFeedbackMessages ||
            this.state.statusSort !== prevState.statusSort
        ) {
            let sorted = [...this.state.adminFeedbackMessages];
            sorted.sort((a, b) => {
                const aStatus = a.split(',')[4];
                const bStatus = b.split(',')[4];
                const order = this.state.statusSort ? 1 : -1;
                return (this.statusOrder[aStatus as keyof typeof this.statusOrder] - this.statusOrder[bStatus as keyof typeof this.statusOrder]) * order;
            });
            this.setState({ sortedMessage: sorted });
        }

        if (
            this.state.adminFeedbackMessages !== prevState.adminFeedbackMessages ||
            this.state.idSort !== prevState.idSort
        ) {
            let sorted = [...this.state.adminFeedbackMessages];
            sorted.sort((a, b) => {
                const aId = parseInt(a.split(',')[0]);
                const bId = parseInt(b.split(',')[0]);
                return this.state.idSort ? bId - aId : aId - bId; 
            });
            this.setState({ sortedMessage: sorted });
        }
    }
    
    
    handleStatusHeaderClick = () => {
        this.setState((prevState) => ({ statusSort: !prevState.statusSort }));
    }

    handleIdHeaderClick = () => {
        this.setState((prevState) => ({ idSort: !prevState.idSort }));
    }

    handleStatusUpdate = (fbId: string, newStatus: string) => {
        const feedbackId = parseInt(fbId, 10);
        updateFeedbackStatus(feedbackId, newStatus).then(() => {
            const updatedMessages = this.state.adminFeedbackMessages.map((message) => {
                const [id, email, feedback, rating, status, timestamp] = message.split(',');
                if (id === fbId) {
                    return [id, email, feedback, rating, newStatus, timestamp].join(',');
                } else {
                    return message;
                }
            })
            this.setState({ sortedMessage: updatedMessages });
        }).catch((error: Error) => {
            console.error("Error updating feedback status: ", error);
        })
    }

    render() {
        return (
            <Draggable>
                <div className="adminFBpopup">
                    <button className="adminFbClose-btn" onClick={this.props.onClose}>
                        X
                    </button>

                    <div className="adminFB">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <button className="sortHeader" onClick={this.handleIdHeaderClick}>
                                            ID {this.state.idSort ? '▲' : '▼'}

                                        </button>

                                    </th>
                                    <th>Email</th>
                                    <th>Feedback</th>
                                    <th>Rating</th>
                                    <th>
                                        <button className="sortHeader" onClick={this.handleStatusHeaderClick}>
                                            Status {this.state.statusSort ? '▲' : '▼'}

                                        </button>
                                    </th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sortedMessage.map((message, index) => {
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
                                                    onChange={(e) => this.handleStatusUpdate(id, e.target.value)}
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
    }
};

export default AdminFeedbackModel;
