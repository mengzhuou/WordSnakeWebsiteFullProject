import "./DefinitionMode.css";
import { withFuncProps } from "../withFuncProps";
import {logout, getWordAndDefTest} from '../../helpers/connector';
import { TextField } from "@mui/material";
import React from "react";

interface MyComponentState{
    word: string;
    definition: string;
    wordList: string[];
}

class DefinitionMode extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {word:"", definition:"", wordList:[], ForceUpdateNow: false};
        this.forceup = this.forceup.bind(this);
        this.menuNav = this.menuNav.bind(this);
    }

    menuNav = () => {
        this.props.navigate("/menu")
    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }
    forceup(){
        getWordAndDefTest().then(async (content)=>{
            const words = await getWordAndDefTest();
            const wordList = words.map((word: String) => word.replace(/,/g, ", ")); //created some space before comma 
            this.setState({ wordList });
        });
        
        this.setState({ForceUpdateNow:false});
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
                        label="Word start with "
                        
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


export default withFuncProps(DefinitionMode);