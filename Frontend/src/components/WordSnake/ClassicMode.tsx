import "./ClassicMode.css";

import { withFuncProps } from "../withFuncProps";
import {logout, isWordExist, getLetterFromPreviousWord, getRandomStart} from '../../helpers/connector';
import { TextField, FormHelperText } from "@mui/material";
import React from "react";
import CountdownTimer from "./CountdownTimer";

class ClassicMode extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = { isErrorOccurred: false, isGameStarted: false, 
            ForceUpdateNow: false, isInputValid: true,
            isGameOver: false, showCountdownTimer: false,
            firstWord: "", inputValue: '', storedInputValue: '', inputValidString: '',
            errMessage: '',
            count: 0, timeLeft: 60, wordList:[]};
        this.forceup = this.forceup.bind(this);
        this.menuNav = this.menuNav.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
    }

    forceup = async (inputValue: string) => {
        console.log("check 3")


        if (!this.state.isGameOver && this.state.isGameStarted  && !this.state.isErrorOccurred) {
            try {
                if (this.state.wordList.includes(inputValue)){
                    this.setState({ errMessage: 'The word already exist. Please type another word.'})
                } else{
                    const lastWord = this.state.wordList[this.state.wordList.length - 1]
                    const lastLetter = lastWord[lastWord.length - 1]
                    if (inputValue[0] == lastLetter){
                        const words = await getLetterFromPreviousWord(inputValue);
                        let wordList = this.state.wordList.concat(inputValue);
                        this.setState({ 
                            errMessage:'', 
                            firstWord: words, 
                            ForceUpdateNow: false, 
                            wordList: wordList,
                        });
                    } else {
                        this.setState({ errMessage: `The word must start with '${lastLetter}'` })
                    }
                }
            } catch (error) {
                console.error("Error fetching word in the database:", error);
                this.setState({ errMessage: 'The word does not exist. Please enter a valid word.' });
            }
        }
    };

    async componentDidMount() {  
    }
    
    handleTimeUp = () => {
        this.setState({ isGameOver: true })
        console.log('Time is up!');
    };

    handleStartGame = async () => {
        const fWord = await getRandomStart();
        this.setState({  wordList: this.state.wordList.concat(fWord), firstWord: fWord, showCountdownTimer: true, isGameStarted: true }, () => {
            this.componentDidMount();
        });
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputString = event.target.value;
        if (inputString === "") {
            this.setState({
                inputValue: "",
                errMessage: ""
            });
        } else{
            const isValid = /^[a-zA-Z]+$/.test(inputString);
            if(isValid){
                this.setState({
                    inputValue: inputString,
                    errMessage: ""
                });
            } else{
                this.setState({ errMessage: 'Special character(s) or number(s) are not accepted. Please type a valid word.'})
            }
        }
        

    }

    handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter"){
            this.storeInputValue(this.state.inputValue).then(() => {
                this.setState({inputValue: ""});
            }); 
            
        }
    }

    storeInputValue = async (inputValue: string) => {
        try{
            if (inputValue !== this.state.storedInputValue){
                this.setState({ storedInputValue: inputValue, ForceUpdateNow: true })
                this.forceup(inputValue);
            }
        } catch (error) {
            console.error(error)
        }
    }

    menuNav = () => {
        this.props.navigate("/menu")
    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }
    render(){
        const { firstWord, inputValue, wordList, errMessage, isGameStarted, showCountdownTimer } = this.state;
        const wordListWithoutFirst = wordList.slice(1);
        console.log(wordListWithoutFirst)
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>    
                <h1 className="wsTitle">Word Snake</h1>
                {showCountdownTimer ? ( // conditionally render CountdownTimer
                    <CountdownTimer duration={30} onTimeUp={this.handleTimeUp} />
                ) : (
                    <button onClick={this.handleStartGame} hidden={isGameStarted ? true : false}>Start Game</button>
                )}
                <div>
                    <TextField
                        label = {`Enter a word starts with '${firstWord}'`}
                        value = {inputValue}
                        onChange = {this.handleInputChange}
                        onKeyDown = {this.handleEnterKeyDown}
                        style={{ 
                            display: isGameStarted ? 'block' : 'none'
                        }}

                    /> 
                    <FormHelperText style={{ color: 'red' }}>
                        {errMessage}
                    </FormHelperText>
                </div>
                {wordListWithoutFirst.length > 0 && (
                    <div>
                        <ul>
                            {wordListWithoutFirst.map((word: string, index: number) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* <div>
                {gameOver ? (
                    <span>Time's up!</span>
                    ) : (
                    <span>{timeLeft} seconds left</span>
                )}
                </div> */}
            </div>
        );
    }
}


export default withFuncProps(ClassicMode);