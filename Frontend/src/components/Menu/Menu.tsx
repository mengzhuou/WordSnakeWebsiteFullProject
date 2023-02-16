import "./Menu.css";
import { withFuncProps } from "../withFuncProps";
import {logout, getWordAndDef, getWordAndDefTest} from '../../helpers/connector';
import { TextField } from "@mui/material";
import React, { useState } from "react";


class Menu extends React.Component<any,any>{

    constructor(props:any){
            super(props);
            this.state = {word:"", wordDef:"", arr:[]};
            this.forceup = this.forceup.bind(this);
            this.getWordTest = this.getWordTest.bind(this);

    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }
    forceup(){
        this.setState({ForceUpdateNow:true});
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
            if(this.state.ForceUpdateNow){
                getWordAndDefTest().then((content)=>{
                    this.setState({wordDef:content.data});
                });
                this.setState({ForceUpdateNow:false});
            }
    //         getWordAndDefTest().then((content)=>{
    //             this.setState({username:content.data.username});
    //         });
    //         this.setState({ForceUpdateNow:false});

        }

        componentDidMount(): void {
            this.forceup();
    }

    // getword = ()=>{
    //     getwords().then(()=>{
    // getWord = ()=>{
    //     getWordAndDef().then(()=>{
    //         alert("method is called")
    //     }).catch(()=>(alert("get word error")));
    // }

    getWordTest = ()=>{
        getWordAndDefTest().then(()=>{
           alert("method is called")
       }).catch(()=>(alert("get word error")));
    }
    render(){
        return (
            <div className="App">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>    
                <h1 className="wsTitle">Word Snake</h1>
                <div>
                    <TextField
                        label="Word start with "
                        
                    />
                    <p>{this.state.wordDef}</p>
                </div>
            </div>
        );
    }
}


export default withFuncProps(Menu);