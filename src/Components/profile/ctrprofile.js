import "../Askjob/askjob.css";
import React, { Component } from "react";
import { Card, Button } from "antd";
import ShoutOut from "../Options/shoutout.js";
import { relative } from "path";
import { Tabs } from "antd";
import JobApplications from "../Options/jobapplication.js";
class CtrProfile extends Component {
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
          </div>
        </Card>
      </div>
    );
  }
}
export default CtrProfile;
