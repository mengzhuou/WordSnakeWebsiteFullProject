import { withFuncProps } from "../withFuncProps";
import {logout, getNumOfUsers, getSignupRank, isAdmin, addFeedback, getChatGPTSearchingDefinition} from '../../helpers/connector';
import React from "react";
import "./Menu.css";
import FeedbackModel from "./FeedbackModel";
import AdminFeedbackModel from "./AdminFeedbackModel";
import { TextField } from "@mui/material";
import AddWordModel from "./AddWordModel";



class Menu extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            totalUserNum: -1,
            signupRank: -1,
            admin: false,
            showFeedbackModel: false,
            showAdminFeedbackModel: false,
            showAddWordModel: false,
            feedbackMessage: "",
            rating: 5,
            adminFeedbackMessages: [],
            searchingWord: "",
            searchingDefinition: []
        }
        this.defModeNav = this.defModeNav.bind(this);
        this.classicModeNav = this.classicModeNav.bind(this);
    }

    componentDidMount() {
        this.displayUserNum();
        this.displayUserSignupRank();
        this.displayAdmin();
    }

    handleChatGPTSearch = async(searchingWord: string) => {
        console.log("call chatgpt")

        const res = await getChatGPTSearchingDefinition(searchingWord);
        if (Array.isArray(res)){
            this.setState({ searchingDefinition: res })
        } else{
            console.error('Expected an array from getChatGPTSearchingDefinition, got:', res);
        }
    }

    
    handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputString = event.target.value;
        console.log("value changing", inputString)
        
        this.setState({
            searchingWord: inputString,
            errMessage: ""
        });
        
    }

    handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("Key down")
            this.storeSearchValue(this.state.searchingWord).then(() => {
                this.setState({ searchingWord: "" });
            });
        }
    }

    storeSearchValue = async (inputValue: string) => {

        this.handleChatGPTSearch(inputValue);
        this.setState({ searchingWord: inputValue })
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

    handleAdminFeedbackOpen = () => {
        this.setState({ showAdminFeedbackModel: true })
    }
    
    handleAdminFeedbackClose = () => {
        this.setState({ showAdminFeedbackModel: false })
    }

    handleFeedbackSubmit = () => {
        const { feedbackMessage, rating } = this.state;

        addFeedback(feedbackMessage, rating).then(() => {
            this.setState({ feedbackMessage: "", rating: 5 })
            alert("Feedback is sent")
            this.handleFeedbackModelClose();
        }).catch((error: Error) => {
            console.error("Error submitting feedback: ", error);
        })
    }

    handleAddWordModelOpen = () => {
        this.setState({ showAddWordModel: true })
    }
    handleAddWordModelClose = () => {
        this.setState({ showAddWordModel: false })
    }
    render(){
        const {totalUserNum, signupRank, admin, 
            showFeedbackModel, feedbackMessage, 
            rating, showAdminFeedbackModel, 
            searchingWord, searchingDefinition,
            showAddWordModel
        } = this.state;
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
                        {admin? 
                            (
                                <>
                                    <button 
                                        className="menuButton" onClick={this.handleAdminFeedbackOpen}> Feedback
                                    </button>
                                    {showAdminFeedbackModel && (
                                        <AdminFeedbackModel
                                            onClose={this.handleAdminFeedbackClose}
                                        />
                                    )}
                                </>
                            )
                            :
                                <>
                                    <button 
                                        className="menuButton" onClick={this.handleFeedbackModelOpen}>Feedback
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
                                </>
                        }
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.handleAddWordModelOpen}>Add Word</button>
                        {showAddWordModel &&
                            <AddWordModel
                                
                            />
                        }
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.pagelogout}>Logout</button>
                    </div>

                    <div>
                        <TextField
                            label={`Search word online: `}
                            value={searchingWord}
                            onChange={this.handleSearchValueChange}
                            onKeyDown={this.handleEnterKeyDown}
                        />
                        {Array.isArray(searchingDefinition) && searchingDefinition.map((definition: string, index: number)=>(
                            <p key={index}>{definition}</p>
                        ))}
                    </div>
                </div>

            </div>
        );
    }
}


export default withFuncProps(Menu);