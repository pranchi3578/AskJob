import React, {Component} from "react";
import "../Askjob/askjob.css";
import { Card } from 'antd';
import { Button,Ic } from "antd";
import { auth, db,fire } from "../Home/config";
import "./inputWorker.css"
import { Input, Tooltip, Icon } from 'antd';

class InputWorker extends Component {

 render(){
     return(
         <div className="card">
             <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
            <div className="photoDiv">
            <Card className="photoCard">djijis

            </Card>
         </div>
         <div className="inputAll">
           <div className="inputDiv">
            <div >
                 <Input 
                   className="inputBox"
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                          }
                 />
            </div>
            </div>

            <div className="inputDiv">
            <div >
                 <Input 
                   className="inputBox"
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                          }
                 />
            </div>
            </div>

            <div className="inputDiv">
            <div >
                 <Input 
                   className="inputBox"
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                          }
                 />
            </div>
            </div>

            <div className="inputDiv">
            <div >
                 <Input 
                   className="inputBox"
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                          }
                 />
            </div>
            </div>
            </div>
             <div>
                 <Button
                  className="confirmButton">
                 <Icon type="check" style={{ color: 'white' }}/>

                 </Button>
             </div>

           

      




           
    
            
            
            
           
            </Card>
             
         </div>

     )

    
 }   
}
export default InputWorker;