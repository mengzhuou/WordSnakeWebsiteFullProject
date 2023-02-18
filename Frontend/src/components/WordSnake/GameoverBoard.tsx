import "./ClassicMode.css";

import { withFuncProps } from "../withFuncProps";
import { logout, isWordExist, getLetterFromPreviousWord, getRandomStart } from '../../helpers/connector';
import { TextField, FormHelperText } from "@mui/material";
import React from "react";
import CountdownTimer from "./CountdownTimer";

class GameoverBoard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            isErrorOccurred: false, isGameStarted: false,
            ForceUpdateNow: false, isInputValid: true,
            isGameOver: false,
            firstWord: "", inputValue: '', storedInputValue: '', inputValidString: '',
            errMessage: '',
            count: 0, timeLeft: 60, wordList: []
        };
        this.menuNav = this.menuNav.bind(this);
    }


    reStart = () => {
        this.props.navigate("/ClassicMode")
    }

    menuNav = () => {
        this.props.navigate("/menu")
    }

    pagelogout = () => {
        logout().then(() => {
            this.props.navigate("/")
        }).catch(() => (alert("logout error")));
    }

    render() {
        const { firstWord, inputValue, wordList, errMessage, isGameStarted, isGameOver } = this.state;
        const wordListWithoutFirst = wordList.slice(1);
        console.log(isGameOver)
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.reStart} hidden={isGameStarted ? false : true}>Restart</button>
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>
                
            </div>
        );
    }
}


export default withFuncProps(GameoverBoard);