import { withFuncProps } from "../withFuncProps";
import {logout} from '../../helpers/connector';
import React from "react";
import "./Menu.css";


class Menu extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.defModeNav = this.defModeNav.bind(this);
        this.classicModeNav = this.classicModeNav.bind(this);


    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    defModeNav = () => {
        this.props.navigate("/DefinitionMode")
    }
    classicModeNav = () => {
        this.props.navigate("/ClassicMode")
    }
    
    render(){
        return (
            <div className="App">
                <div className="buttonContainer">
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.defModeNav}>Definition Mode</button>
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.classicModeNav}>Classic Mode</button>
                    </div>
                    <div className="buttonRow">
                        <button className="menuButton" onClick={this.pagelogout}>Logout</button>
                    </div>
                </div>

            </div>
        );
    }
}


export default withFuncProps(Menu);