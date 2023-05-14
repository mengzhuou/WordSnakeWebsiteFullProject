import "./GameoverBoard.css";

import { withFuncProps } from "../withFuncProps";
import { logout, getBestScore, updateBestScore } from '../../helpers/connector';
import React from "react";

class UnlimitedGameoverBoard extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            bestScore: -1,
            isSent: false,
            wordList: this.props.wordList
        };
        this.menuNav = this.menuNav.bind(this);
        this.bestScore = this.bestScore.bind(this);
    }


    reStart = () => {
        this.props.navigate("/UnlimitedMode")
    }

    menuNav = () => {
        this.props.navigate("/menu")
    }

    pagelogout = () => {
        logout().then(() => {
            this.props.navigate("/")
        }).catch(() => (alert("logout error")));
    }

    bestScore = async() => {
        const { wordList } = this.state;

        updateBestScore(wordList.length).then((response) => {
            this.setState({ bestScore: response })
        })
        .catch((error) => {
            console.log("Error when fetching data.")
        });
    }
    
    componentDidMount(): void {
        this.bestScore();
    }

    render() {
        const { wordList, bestScore, getLeaderBoard } = this.state;
        const sortedWords = [...wordList].sort();
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.reStart}>Restart</button>
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>
                <p className="goTitle">Unlimited Mode Game Over</p>
                {/* <p className="scoreStyle">Your Score: {wordList.length}</p>
                <p className="scoreStyle">Your Best Score: {bestScore}</p> */}

                <div className="wordListStyle">
                    {Array.isArray(sortedWords) && sortedWords.map((word: string, index: number) => (
                        <li key={index}>{word}</li>
                    ))}
                </div>
            </div>
        );
    }
}


export default withFuncProps(UnlimitedGameoverBoard);