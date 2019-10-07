import "../Askjob/askjob.css";
import React, {Component} from "react";
import { Card } from 'antd';
import ShoutOut from "../Options/shoutout.js";
class CtrProfile extends Component {
    
        
    

    render(){
        return(
            <div className="card">
                <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
            <div className="background">
                <div style={{width:"375",height: "157px"}}> </div>
                <div style={{height:"510px"}}>
                <ShoutOut/>
                </div>
               
               </div>
               </Card>
                
            </div>
   
        )
   
       
    }   
   }
   export default CtrProfile;