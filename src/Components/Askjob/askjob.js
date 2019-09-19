import React, { Component } from "react";
import { Card } from 'antd';
import "./askjob.css";
import logo from "./h1.png" ;
import { Button } from "antd";






class Askjob extends Component{
    nextPath(path) {
        this.props.history.push(path);
      }
    render(){
    return(
<div className="card">  
        <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
        <div style={{width:"375px" , margin:"0px",padding:"154.25px 53.38px 0px 53.62px"}}>
        <div >
        <img style={{width:"268px ", height:"125px"}} src={logo}></img>
        </div>
        </div>
       
        <div style={{ height:"37px", padding:"0px 28px 0px 90px"}}>     
        <div className="text">seeking simplified</div>
        </div>
        
        <div style={{padding:"86px 51px 0px 61px"}} >
         <Button
         onClick={()=>this.nextPath('/SignUp')}
          className="button1" shape="round" >Sign Up</Button>   
        </div>
        <div style={{padding:"13px 51px 0px 61px"}} >
         <Button className="button2" shape="round" >Sign In</Button>   
        </div>

       </Card>
        
</div>
    )
}

}
export default Askjob;