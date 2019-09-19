import React, {Component} from "react";
import "../Askjob/askjob.css";
import { Card } from 'antd';
import { Button } from "antd";
import "./choice.css";
import { auth, db,fire } from "../Home/config";

class Choice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            uid:'',
            name:''
        };
    }
    componentDidMount = ()=>{
        var that = this
        fire.auth().onAuthStateChanged((user) => {
                    if(user){
                        that.setState({uid:user.uid})
                        this.setState({name:user.displayName})
                    }
                    })
    }
    logOut = () =>{
        auth.signOut()
        this.props.history.push('/')
    }
    onSubmit = (e) =>{
        var data = {
            key:e,
            name:this.state.name
        }
        db.ref('user').child(this.state.uid).set(data)  
    }
    render(){
        return(
    <div className="card">
            <Card style={{width:"100%" ,height:"100%", margin:"0px",padding:"0px"}} >
            <div style={{width:"375px",height:"137.99px",backgroundColor:"red"}}>
                
            </div>

            <div   style={{ height:"28px",width:"375px", padding:"30.01px 65px 0px 86px"}}>     
                  <div className="smallText" >Let's Set Your Profile,</div>
            </div>
            <div   style={{ height:"28px",width:"375px", padding:"38px 0px 0px 60px"}}> 
            <div className="largeText">
               I'm A_____. 
            </div>
            </div>

            <div style={{padding:"138px 51px 0px 61px"}} >
         <Button onClick={(e)=>this.onSubmit(0) }  className="button2" shape="round" >CONTRACTOR</Button>   
        </div>

        <div style={{padding:"20px 51px 0px 61px"}} >
         <Button onClick={(e)=>this.onSubmit(1)} className="button2" shape="round" >WORKER</Button>   
        </div>
        <div style={{padding:"20px 51px 0px 61px"}} >
         <Button className="button2" shape="round" onClick= {this.logOut} >Logout</Button>   
        </div>




           
    
            
            
            
           
            </Card>
            
    </div>
        )
    }
    
    }
    export default Choice;


