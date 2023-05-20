import { withFuncProps } from "../withFuncProps";
import {logout, getNumOfUsers, getSignupRank, isAdmin, addFeedback} from '../../helpers/connector';
import React from "react";
import "./Menu.css";
import FeedbackModel from "./FeedbackModel";



class Menu extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            totalUserNum: -1,
            signupRank: -1,
            admin: false,
            showFeedbackModel: false,
            feedbackMessage: "",
            rating: 5
        }
        this.defModeNav = this.defModeNav.bind(this);
        this.classicModeNav = this.classicModeNav.bind(this);
    }

    componentDidMount() {
        this.displayUserNum();
        this.displayUserSignupRank();
        this.displayAdmin();
    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    defModeNav = () => {
        this.props.navigate("/DefinitionMode")
    }
    classicModeNav = () => {
        this.props.navigate("/ClassicMode")
    }
    unlimitedModeNav = () => {
        this.props.navigate("/UnlimitedMode")
    }
    displayUserNum = async () => {
        const num = await getNumOfUsers();
        this.setState({ totalUserNum: num })
    }

    displayUserSignupRank = async () => {
        const num = await getSignupRank();
        this.setState({ signupRank: num })
    }

    displayAdmin = async () => {
        const isAdminTrue = await isAdmin();
        this.setState({ admin: isAdminTrue })
    }

    handleFeedbackModelOpen = () => {
        this.setState({ showFeedbackModel: true })
    }

    handleFeedbackModelClose = () => {
        this.setState({ showFeedbackModel: false })
    }

    handleFeedbackMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ feedbackMessage: event.target.value });
    }

    handleRatingChange = (rating: number) => {
        this.setState({ rating: rating });
    }

    handleFeedbackSubmit = () => {
        const { feedbackMessage, rating } = this.state;
        console.log("rating passed? ", this.state.rating)

        addFeedback(feedbackMessage, rating).then(() => {
            this.setState({ feedbackMessage: "", rating: -1 })
            alert("Feedback is sent")
            this.handleFeedbackModelClose();
        }).catch((error: Error) => {
            console.error("Error submitting feedback: ", error);
        })
    }
    
    render(){
        const {totalUserNum, signupRank, admin, showFeedbackModel, feedbackMessage, rating} = this.state;
        return (
            <div className="App">
                <div className="labelContainer">
                    {admin ? 
                        <p className="adminMenuLabel">ADMIN</p>
                        :
                        null
                    }
                    <p className="menuLabel">Registered Users : {totalUserNum}</p>
                    <p className="menuLabel">Your User ID : {signupRank}</p>
                    <button 
                        className="menuLabel" onClick={this.handleFeedbackModelOpen}>Feedback
                    </button>
                    {showFeedbackModel && 
                        <FeedbackModel
                            message={feedbackMessage}
                            rating={rating}
                            onClose={this.handleFeedbackModelClose}
                            onChange={this.handleFeedbackMessageChange}
                            onRatingChange={this.handleRatingChange}
                            onSubmit={this.handleFeedbackSubmit}
                        />
                    }

                    
                </div>
                <div className="buttonContainer">
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.defModeNav}>Definition Mode</button>
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.unlimitedModeNav}>Unlimited Mode</button>
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.classicModeNav}>Classic Mode</button>
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.pagelogout}>Logout</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default withFuncProps(Menu);