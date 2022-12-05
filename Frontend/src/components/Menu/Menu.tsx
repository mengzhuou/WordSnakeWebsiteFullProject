import "./Menu.css";
import { withFuncProps } from "../withFuncProps";
import React from 'react';
import {logout} from '../../helpers/connector';



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
    render(){
        return (
            <div className="App">
                {/* <div className="topnav">
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                </div>     */}
                <p>Here</p>
            </div>
        );
    }
}


export default withFuncProps(Menu);