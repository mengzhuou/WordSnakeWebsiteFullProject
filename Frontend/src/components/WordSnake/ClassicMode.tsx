import "./ClassicMode.css";
import { withFuncProps } from "../withFuncProps";
import {logout, getWord} from '../../helpers/connector';
import { TextField } from "@mui/material";
import React from "react";

interface MyComponentState{
    word: string;
    count: number;
}

class ClassicMode extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {count: 0, word:"", ForceUpdateNow: false, inputValue: '', storedInputValue: '', wordList:[]};
        this.forceup = this.forceup.bind(this);
        this.menuNav = this.menuNav.bind(this);
    }
    
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter"){
            this.storeInputValue(this.state.inputValue).then(() => {
                this.setState({inputValue: "", ForceUpdateNow: true});
            }); 
            
        }
    }

    storeInputValue = async (inputValue: string) => {
        try{
            this.setState({ storedInputValue: inputValue})
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
    forceup = async () => {
        const { storedInputValue } = this.state;
        try {
            const content = await getWord(storedInputValue);
            const words = content.map((word: String) => word.replace(/,/g, ", "));
            console.log("content")
            console.log(words)
            this.setState({ wordList: words, ForceUpdateNow: false });
          } catch (error) {
            console.error("Error fetching word list:", error);
          }
    }

    componentDidMount(): void {
        this.forceup();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            this.forceup();
        }
    }
    
    render(){
        const { wordList } = this.state;
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.menuNav}>Menu</button>
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>    
                <h1 className="wsTitle">Word Snake</h1>
                <div>
                    <TextField
                        label = "Type a word for definition"
                        value = {this.state.inputValue}
                        onChange = {this.handleInputChange}
                        onKeyDown = {this.handleEnterKeyDown}
                    /> 
                </div>
                {wordList.length > 0 && (
                    <div>
                        <ul>
                            {wordList.map((word: string) => (
                                <li key={word}>{word}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}


export default withFuncProps(ClassicMode);