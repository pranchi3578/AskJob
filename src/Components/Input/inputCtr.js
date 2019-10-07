import React, {Component} from "react";
import "../Askjob/askjob.css";
import { Card } from 'antd';
import { Button,Ic } from "antd";
import { auth, db,fire } from "../Home/config";
import "./inputWorker.css"
import { Input, Tooltip, Icon } from 'antd';
import CtrForm from'../../ctrForm.js';
import Avatar from '../../propic.js';


class InputCtr extends Component {
    
        
    

 render(){
     return(
         <div className="card">
             <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
         <div className="background">
             <div style={{width:"300",height:"200",display:"flex",justifyContent:"center"}}>
              
            <div className="photoDiv">
                <Avatar/>
         </div>
         </div>
         <div className="inputAll">
         <div className="inputDiv">
            <div >
                 <CtrForm/>
            </div>
            </div>
            </div>
            </div>
            </Card>
             
         </div>

     )

    
 }   
}
export default InputCtr;