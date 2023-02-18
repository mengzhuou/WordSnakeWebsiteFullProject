import "./ClassicMode.css";
import { withFuncProps } from "../withFuncProps";
import {logout, isWordExist, getLetterFromPreviousWord, getRandomStart} from '../../helpers/connector';
import { TextField } from "@mui/material";
import React from "react";

class ClassicMode extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {isGameStarted: false, firstWord: "", count: 0, word: "", ForceUpdateNow: false, inputValue: '', storedInputValue: '', wordList:[]};
        this.forceup = this.forceup.bind(this);
        this.menuNav = this.menuNav.bind(this);
    }

    forceup = async (inputValue: string) => {
        if (this.state.isGameStarted) {
            try {
                const words = await getLetterFromPreviousWord(inputValue);
                this.setState({ firstWord: words, ForceUpdateNow: false });
            } catch (error) {
                console.error("Error fetching word list:", error);
            }
        }
    };

    async componentDidMount() {
        if(!this.state.isGameStarted){
            const fWord = await getRandomStart();
            this.setState({ firstWord: fWord, isGameStarted: true})
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.state.ForceUpdateNow) {
            this.forceup(this.state.storedInputValue);
          }
    }
    
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: event.target.value,
        });
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
                this.setState({ storedInputValue: inputValue, ForceUpdateNow: true, wordList: this.state.wordList.concat(inputValue)})
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
        const { firstWord, wordList } = this.state;
        console.log((wordList.length)); 
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>    
                <h1 className="wsTitle">Word Snake</h1>
                <div>
                    <TextField
                        label = {`Enter a word starting with '${this.state.firstWord}'`}
                        value = {this.state.inputValue}
                        onChange = {this.handleInputChange}
                        onKeyDown = {this.handleEnterKeyDown}

                    /> 
                </div>
                {wordList.length > 0 && (
                    <div>
                        <ul>
                            {wordList.map((word: string, index: number) => (
                                <li key={index}>{word}</li>
                            ))}
                         

                        </ul>
                    </div>
                )}
                <p>{firstWord}</p>
            </div>
        );
    }
}


export default withFuncProps(ClassicMode);