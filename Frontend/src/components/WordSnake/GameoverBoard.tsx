import "./GameoverBoard.css";

import { withFuncProps } from "../withFuncProps";
import { logout, getBestScore, updateBestScore, getUserEmail } from '../../helpers/connector';
import { TextField, FormHelperText } from "@mui/material";
import React from "react";
import { useLocation } from 'react-router-dom';
import ResultListFunc from './ResultListFunc';

class GameoverBoard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            bestScore: 0,
            isSent: false,
            wordList: this.props.wordList
        };
        this.menuNav = this.menuNav.bind(this);
        this.handleGetUserEmail = this.handleGetUserEmail.bind(this);
    }

    componentDidMount(): void {
        this.handleGetUserEmail();
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

    // handleGetBestScore = async () => {
    //     const bestScore = await getBestScore();
    // }
    
    handleGetUserEmail = async () => {
        const email = await getUserEmail();
        console.log("User email is: " , email)
    }

    render() {
        const { wordList } = this.state;
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.reStart}>Restart</button>
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>
                <p className="goTitle">Game Over</p>
                <div className="wordListStyle">
                    <p>Your Score: {wordList.length}</p>
                    <ul>
                        {Array.isArray(wordList) && wordList.map((word: string, index: number) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}


export default withFuncProps(GameoverBoard);