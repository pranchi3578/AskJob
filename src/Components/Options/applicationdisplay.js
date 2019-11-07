import React, { Component } from "react";
import {
  PageHeader,
  Button,
  Statistic,
  Descriptions,
  message,
  Avatar
} from "antd";
import { auth, db, fire } from "../Home/config.js";

class Applicationdisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: true,
      uid: "",
      username: "",
      email: "",
      photourl: null
    };
  }
  componentDidMount = () => {
    var that = this;
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user details : ", user);
        const uid = user.uid;
        const username = user.displayName;
        const email = user.email;
        const photourl = user.photoURL;
        this.setState({
          uid,
          username,
          email,
          photourl
        });
        console.log("ctruid", this.state.uid);
      }
    });
  };
  handleClick = (titlee, userData, keyfromjob) => {
    let application1 = {
      jobtitle: titlee,
      ctrname: this.state.username,
      email: this.state.email
    };
    let application2 = {
      jobtitle: titlee,
      worker: userData.username
    };

    db.ref("profile1")
      .child(userData.workeruid)
      .child("contract")
      .child(keyfromjob)
      .set(application1);
    db.ref("profile 0")
      .child(this.state.uid)
      .child("contract")
      .child(keyfromjob)
      .push(application2);
    this.success();
  };
  success = () => {
    message.success("Application Accepted");
  };

  render() {
    const { titlee, userData, keyfromjob } = this.props;
    const {} = this.state;
    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Username">
          {userData.username}
        </Descriptions.Item>
        <Descriptions.Item label="pincode">
          <a>{userData.pincode}</a>
        </Descriptions.Item>
        <Descriptions.Item label="DOB">{userData.DOB}</Descriptions.Item>
        <Descriptions.Item label="Gender">{userData.gender}</Descriptions.Item>
        <Descriptions.Item label="Skills">{userData.skills}</Descriptions.Item>
      </Descriptions>
    );

    const extraContent = (
      <div
        style={{
          display: "flex",
          width: "max-content",
          justifyContent: "flex-end"
        }}
      >
        <Statistic
          title="Status"
          value="available"
          style={{
            marginRight: 32
          }}
        />
      </div>
    );

    const Content = ({ children, extra }) => {
      return (
        <div className="content">
          <div className="main">{children}</div>
          <div className="extra">{extra}</div>
        </div>
      );
    };
    return (
      <div>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <PageHeader
          title={titlee}
          subTitle="Job Application"
          extra={[
            <Button
              type="primary"
              onClick={this.handleClick.bind(
                this,
                titlee,
                userData,
                keyfromjob
              )}
            >
              Accept
            </Button>
          ]}
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      </div>
    );
  }
}
export default Applicationdisplay;
