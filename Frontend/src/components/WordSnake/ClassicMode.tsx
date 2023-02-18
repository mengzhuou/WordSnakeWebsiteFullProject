import "./ClassicMode.css";
import { withFuncProps } from "../withFuncProps";
import {logout, isWordExist, getLetterFromPreviousWord, getRandomStart} from '../../helpers/connector';
import { TextField, FormHelperText } from "@mui/material";
import React from "react";

class ClassicMode extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = { isErrorOccurred: false, isGameStarted: false, deleteFirst: false, ForceUpdateNow: false, 
            firstWord: "", errMessage: '', inputValue: '', storedInputValue: '', 
            count: 0, wordList:[]};
        this.forceup = this.forceup.bind(this);
        this.menuNav = this.menuNav.bind(this);
    }

    forceup = async (inputValue: string) => {

        if (this.state.isGameStarted  && !this.state.isErrorOccurred) {
            try {
                const lastWord = this.state.wordList[this.state.wordList.length - 1]
                const lastLetter = lastWord[lastWord.length - 1]
                if (inputValue[0] == lastLetter){
                    const words = await getLetterFromPreviousWord(inputValue);
                    let wordList = this.state.wordList.concat(inputValue);
                    if (this.state.deleteFirst) {
                        wordList = wordList.slice(1);
                    }
                    this.setState({ 
                        errMessage:'', 
                        firstWord: words, 
                        ForceUpdateNow: false, 
                        wordList: wordList,
                        deleteFirst: false,
                    });
                } else {
                    this.setState({ errMessage: `The word must start with '${lastLetter}'` })
                }
                

            } catch (error) {
                console.error("Error fetching word in the database:", error);
                this.setState({ errMessage: 'The word does not exist. Please enter a valid word.' });
            }
        }
    };

    async componentDidMount() {
        if(!this.state.isGameStarted){
            const fWord = await getRandomStart();
            this.setState({ wordList: this.state.wordList.concat(fWord) })
            this.setState({ firstWord: fWord, isGameStarted: true, deleteFirst: true})
        }
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

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
        const { wordList, errMessage } = this.state;
        const wordListWithoutFirst = wordList.slice(1);
        console.log(wordList)
        console.log(wordListWithoutFirst)
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
                        style={{ width: '300px' }}

                    /> 
                    <FormHelperText style={{ color: 'red' }}>{errMessage}</FormHelperText>
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
            </div>
        );
    }
}


export default withFuncProps(ClassicMode);