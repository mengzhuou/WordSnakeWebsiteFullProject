import "./GameoverBoard.css";

import { withFuncProps } from "../withFuncProps";
import { logout, isWordExist, getLetterFromPreviousWord, getRandomStart } from '../../helpers/connector';
import { TextField, FormHelperText } from "@mui/material";
import React from "react";
import { useLocation } from 'react-router-dom';

class GameoverBoard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            score: 0,
            isSent: false,
            resultList: []
        };
        this.menuNav = this.menuNav.bind(this);
    }

    componentDidMount() {
        this.setState({ resultList: this.props.location.state})
        console.log("his is::: ", this.state.resultList); // Do something with the history state
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
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.reStart}>Restart</button>
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>
                <p className="goTitle">Game Over</p>
                
            </div>
        );
    }
}


export default withFuncProps(GameoverBoard);