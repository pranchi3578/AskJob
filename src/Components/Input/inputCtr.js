import React, { Component } from "react";
import "../Askjob/askjob.css";
import { Card } from "antd";
import { Button, Ic } from "antd";
import { auth, db, fire } from "../Home/config";
import "./inputCtr.css";
import "./inputWorker.css";
import { Input, Tooltip, Icon } from "antd";
import CtrForm from "../../ctrForm.js";
import Avatar from "../../propic.js";

class InputCtr extends Component {
  render() {
    return (
      <div className="card">
        <div
          className="background"
          style={{
            border: "1px solid #e8e8e8",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="inputAll"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column ",
              minHeight: "600px"
            }}
          >
            <div style={{ margin: "70px 0px 0px 135px" }}>
              <Avatar />
            </div>
            <div className="inputDiv" style={{ marginTop: "100px" }}>
              <div>
                <CtrForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InputCtr;
