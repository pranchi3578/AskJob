import "../Askjob/askjob.css";
import "./workerprofile.css";
import React, {Component} from "react";
import { Card,Drawer } from 'antd';
import JobList from "../Options/jobsnearme.js";
class Workerprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            visible: false,
           
           
        };
    }
        
    

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
    
        
    

    render(){
        return(
            <div className="card">
                <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
            <div className="background">
                <Card
                onClick={this.showDrawer} 
                 hoverable
                title="Jobs Near Me"
                 style={{width:"200px",height:"50px",borderRadius:"30px 30px",textAlign:"center",}}> 
                </Card>
                <Drawer
          title="Jobs Near Me"
          placement="bottom"         
          height={500}
          mask={false}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
            <JobList/>
            </Drawer>

               
               </div>
               </Card>
                
            </div>
   
        )
   
       
    }   
   }
   export default Workerprofile;