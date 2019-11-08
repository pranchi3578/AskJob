import "../Askjob/askjob.css";
import "./workerprofile.css";
import React, { Component } from "react";
import { Card, Drawer, Button } from "antd";
import JobList from "../Options/jobsnearme.js";
import { db, fire, auth } from "../Home/config";
import Item from "antd/lib/list/Item";
class Workerprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      contract: []
    };
  }
  componentDidMount = () => {
    var that = this;
    let contract = [];
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        this.setState({ uid });
        db.ref("profile1")
          .child(uid)
          .child("contract")
          .once("value", data => {
            data.forEach(child => {
              contract.push(child.val());
            });
          });
        this.setState({ contract });
      }
    });
  };
  logOut = () => {
    auth.signOut();
    this.props.history.push("/");
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  showContracts = () => {
    this.setState({
      visibleContracts: true
    });
  };
  closeContracts = () => {
    this.setState({
      visibleContracts: false
    });
  };

  render() {
    return (
      <div className="card">
        <Card
          style={{
            width: "100%",
            height: "100%",
            margin: "0px",
            padding: "0px"
          }}
        >
          <div className="background" style={{ flexDirection: "column" }}>
            <Card
              onClick={this.showDrawer}
              hoverable
              title="Jobs Near Me"
              style={{
                width: "200px",
                height: "50px",
                marginBottom: "60px",
                borderRadius: "30px 30px",
                textAlign: "center"
              }}
            ></Card>
            <Card
              onClick={this.showContracts}
              hoverable
              title="Contracts"
              style={{
                width: "200px",
                height: "50px",
                borderRadius: "30px 30px",
                textAlign: "center"
              }}
            ></Card>
            {this.state.visible ? (
              <Drawer
                title="Jobs Near Me"
                placement="bottom"
                height={500}
                mask={false}
                onClose={this.onClose}
                visible={this.state.visible}
                getContainer={false}
                style={{
                  width: 375,
                  position: "absolute"
                }}
              >
                <JobList />
              </Drawer>
            ) : null}
            {this.state.visibleContracts ? (
              <Drawer
                title="Contracts"
                placement="bottom"
                height={500}
                mask={false}
                onClose={this.closeContracts}
                visible={this.state.visibleContracts}
                getContainer={false}
                style={{
                  width: 375,
                  position: "absolute"
                }}
              >
                {this.state.contract.map(item => {
                  return (
                    <div
                      style={{
                        marginBottom: 5,
                        padding: 5,
                        paddingLeft: 20,
                        borderRadius: 8,
                        minHeight: 70,
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#3DB3C6"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "15px"
                        }}
                      >
                        <span>{item.jobtitle}</span>
                        <span
                          style={{
                            fontSize: "10px"
                          }}
                        >
                          {item.email}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Drawer>
            ) : null}
          </div>
          <Button
            onClick={this.logOut}
            ghost
            style={{
              marginTop: "-638px",
              zIndex: 1,
              position: "absolute",
              marginLeft: "10px"
            }}
          >
            Sign Out
          </Button>
        </Card>
      </div>
    );
  }
}
export default Workerprofile;
