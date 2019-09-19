import React, { Component } from "react";
import { Button } from "antd";
import { fire, auth, provider,db } from "./config.js"; //changed here: do it like this rather than individually importing
import { Redirect } from "react-router-dom";
import {withRouter} from 'react-router';


export default class Index extends Component {
    //changed here
    constructor(props) {
        super(props);
        this.state = {
            redirectToChoice: false,
            redirectToHome:false
        };
    }
    // nextPath = path => {
    //     console.log("ethi");
    //     this.props.history.push(path);
    // };
    componentDidMount = ()=>{
        fire.auth().onAuthStateChanged((user) => {
                    if(user){
                        this.checkUser(user.uid)
                    }
                    })
    }
    checkUser = (uid) =>{
        var that = this
        db.ref('users').child(uid).once('value',(data)=>{
            if(data.val()){
                that.setState({redirectToHome:true})
            }else{
                that.setState({redirectToChoice:true})
            }
        })
    }

    signup() {
        var that = this;
        auth.signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //this.setState({ redirect: true });
                var token = result.credential.accessToken;
                console.log("token",token);
                
                
                if (token !== null) {
                    console.log("if il ethi");
                    //this.setState({ redirect: true }); //***changing state on successful auth
                    //that.nextPath('/Choice');
                    //console.log(this.state.redirect);
                }
                // The signed-in user info.
                var user = result.user;

                

                // fire.auth()
                //     .createUserWithEmailAndPassword(user.email, user.password)
                //     .catch(function(error) {
                //         // Handle Errors here.
                //         var errorCode = error.code;
                //         var errorMessage = error.message;
                //         if (errorCode == "auth/weak-password") {
                //             alert("The password is too weak.");
                //         } else {
                //             alert(errorMessage);
                //         }
                //         console.log(error);
                //   fire.auth().onAuthStateChanged(function(user) {
                //           if (user) {
                //             db.ref('https://askjob007.firebaseio.com/' + user.Uid).set({
                //           "gid":token,
                //         });
                //           } else {
                //             // No user is signed in.
                //           }
                //         });
                //     });
                  
                   


                    
                 
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }

    render() {
        console.log("redirect",this.state.redirect);
        
        return (
            <div>
                <Button onClick={this.signup} type="primary" block>
                    Google Sign-In
                </Button>
                {//if state variable is true, it redirects else nothing
                this.state.redirectToChoice ? <Redirect to="/Choice" /> : null}
                {
                this.state.redirectToHome ? <Redirect to="/profile" /> : null}
            </div>
        );
    }
}

