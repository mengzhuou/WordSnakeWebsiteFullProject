import "./Menu.css";
import { withFuncProps } from "../withFuncProps";
import {logout, getwords} from '../../helpers/connector';
import { TextField } from "@mui/material";
import React, { useState } from "react";


class Menu extends React.Component<any,any>{

    constructor(props:any){
        super(props);
        this.forceup = this.forceup.bind(this);

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
        }
    }
    
    componentDidMount(): void {
        this.forceup();
    }

    getword = ()=>{
        getwords().then(()=>{
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
                    <p onClick={this.getword}>hey there</p>
                </div>
            </div>
        );
    }
}


export default withFuncProps(Menu);