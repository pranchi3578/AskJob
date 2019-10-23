import React, { Component } from "react";
import "../Askjob/askjob.css";
import { Card } from "antd";
import { Button, Ic } from "antd";
import { auth, db, fire } from "../Home/config";
import "./inputWorker.css";
import { Input, Tooltip, Icon } from "antd";
import CtrForm from "../../ctrForm.js";
import Avatar from "../../propic.js";

class InputCtr extends Component {
  render() {
    return (
      <div className="card">
        <div
          style={{
            border: "1px solid #e8e8e8",
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div>
            <Avatar />
          </div>
          <div className="inputAll">
            <div className="inputDiv">
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
