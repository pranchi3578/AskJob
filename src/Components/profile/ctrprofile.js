import "../Askjob/askjob.css";
import React, { Component } from "react";
import { Card, Button, Drawer, Modal } from "antd";
import ShoutOut from "../Options/shoutout.js";
import { fire, auth, provider, db } from "../Home/config.js";
import { relative } from "path";
import { Tabs } from "antd";
import JobApplications from "../Options/jobapplication.js";
class CtrProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleContracts: false,
      jobs: [],
      jobDetails: [],
      jobcontracts: [],
      uid: "",
      popupModal: false,
      array: []
    };
  }
  componentDidMount = () => {
    var that = this;
    let jobs = [];
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        this.setState({ uid });
        db.ref("profile 0")
          .child(uid)
          .child("jobs")
          .on("value", data => {
            data.forEach(item => {
              jobs.push(item.val());
            });
          });
        this.setState({ jobs });
      }
    });
  };
  logOut = () => {
    auth.signOut();
    this.props.history.push("/");
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

  fetchJobData = () => {
    let jobDetails = [];
    this.state.jobs.forEach(item => {
      db.ref("job")
        .child(item)
        .on("value", data => {
          jobDetails.push(data.val());
        });
    });
    console.log("hhddd", jobDetails);
    this.setState({ jobDetails });
    this.showContracts();
  };

  fetchJobContracts = jobkey => {
    let jobcontracts = [];
    db.ref("profile 0")
      .child(this.state.uid)
      .child("contract")
      .child(jobkey)
      .on("value", data => {
        jobcontracts.push(data.val());
      });
    console.log("jobcontracts", jobcontracts);
    this.setState({ jobcontracts });

    this.showModal();
  };
  showModal = () => {
    let array = [];
    this.state.jobcontracts.map(item => {
      array.push(item);
    });
    array.forEach(it => {
      // console.log("itttt", it["-Lt5nVcZxM7JIXzuFyDJ"].jobtitle);
    });
    this.setState({
      popupModal: true,
      array: array
    });
  };
  hideModal = () => {
    this.setState({
      popupModal: false
    });
  };

  render() {
    const { TabPane } = Tabs;
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
          <div className="background">
            <div style={{ width: "375", height: "157px" }}> </div>
            <div style={{ height: "510px" }}>
              <ShoutOut style={{ position: "absolute", zIndex: "-1" }} />
            </div>
            <JobApplications style={{ position: "absolute", zIndex: "-1" }} />
            <div style={{ position: "absolute", margin: "160px 0px" }}>
              <Card
                onClick={this.fetchJobData}
                hoverable
                title="Contracts"
                style={{
                  width: "200px",
                  height: "50px",
                  borderRadius: "30px 30px",
                  textAlign: "center"
                }}
              ></Card>
            </div>
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
                {this.state.jobDetails.map(item => {
                  return (
                    <div
                      onClick={() => {
                        this.fetchJobContracts(item.jobkey);
                      }}
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
                        <span>{item.titlee}</span>
                      </div>
                    </div>
                  );
                })}
              </Drawer>
            ) : null}
            <div>
              <Modal
                title="Modal"
                onOk={this.hideModal}
                onCancel={this.hideModal}
                closable={true}
                okText="OK"
                cancelText="CANCEL"
                visible={this.state.popupModal}
              >
                {this.state.array.map(item => {
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
                        {console.log("gvgg", item)}
                      </div>
                    </div>
                  );
                })}
              </Modal>
            </div>
          </div>
        </Card>
        <Button
          onClick={this.logOut}
          ghost
          style={{ marginBlockEnd: "553px", marginRight: "10px" }}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}
export default CtrProfile;
