import React, { Component } from "react";
import "../Askjob/askjob.css";
import { Card } from "antd";
import { Button, Ic } from "antd";
import { auth, db, fire } from "../Home/config";
import "./inputWorker.css";
import { Input, Tooltip, Icon } from "antd";
import WrappedDemo from "../../workerForm.js";
import Avatar from "../../propic.js";

class InputWorker extends Component {
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
          <div className="background">
            <div
              style={{
                width: "300",
                height: "200",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div
                className="photoDiv"
                style={{ marginTop: "-335px", marginLeft: "73px" }}
              >
                <Avatar />
              </div>
            </div>
            <div
              className="inputAll"
              style={{ marginLeft: "-200px", marginTop: "175px" }}
            >
              <div className="inputDiv">
                <div>
                  <WrappedDemo />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
export default InputWorker;
