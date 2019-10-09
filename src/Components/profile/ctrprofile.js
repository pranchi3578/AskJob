import "../Askjob/askjob.css";
import React, {Component} from "react";
import { Card } from 'antd';
import ShoutOut from "../Options/shoutout.js";
import { relative } from "path";
import { Tabs } from 'antd';
class CtrProfile extends Component {
  




    
        
    

    render(){
        const { TabPane } = Tabs;
        return(
            <div className="card">
                <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
            <div className="background">
                <div style={{width:"375",height: "157px"}}> </div>
                <div style={{height:"510px"}}>
                <ShoutOut style={{position:"absolute",zIndex:"-1"}} />
                </div>
                <div style={{position:"relative",zIndex:"1",marginTop:"-100px"}}>
                <Tabs tabPosition="bottom" type="card">
    <TabPane tab="Tab 1" key="1" style={{backgroundColor:"red",height:"600px",marginTop:"-500px",zIndex:"4",position:"relative"}}>
      Content of Tab Pane 1 gggggggggggggggggggggggggggggggggggggg
      jjjjj
      kkkkk
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
  </Tabs>,
                </div>
               
               </div>
               </Card>
                
            </div>
   
        )
   
       
    }   
   }
   export default CtrProfile;