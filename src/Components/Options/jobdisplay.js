import {
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions,
  message,
  Form
} from "antd";
import React, { Component } from "react";
import { auth, db, fire } from "../Home/config.js";

const { TabPane } = Tabs;
var login;
var token;
class JobDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      userData: []
    };
  }
  componentDidMount = () => {
    this.checkuser();
  };
  checkuser() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        token = db.ref().push().key;
        this.setState({ uid: user.uid });
        login = 1;
        console.log(login);
        this.fetchUserdata(user.uid);
      }
    });
  }
  fetchUserdata = uid => {
    var that = this;
    db.ref("profile1")
      .child(uid)
      .once("value", childData => {
        that.setState({ userData: childData.val() });
      });
  };
  onClicknow(keyfromjob, titlee) {
    if (login == 1) {
      console.log("apply");
      // message.success("Application submitted successfully");
      let data = {
        titlee,
        keyfromjob,
        userData: this.state.userData
      };
      db.ref("job")
        .child(keyfromjob)
        .child("applications")
        .child(this.state.uid)
        .set(data);
      this.success();
    }
  }
  success = () => {
    message.success("Application Submitted");
  };

  render() {
    const {
      titlee,
      description,
      pincode,
      wage,
      bond,
      user,
      jobkey
    } = this.props;
    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">{user.name}</Descriptions.Item>
        <Descriptions.Item label="pincode">
          <a>{pincode}</a>
        </Descriptions.Item>
        <Descriptions.Item label="FROM">{bond.from}</Descriptions.Item>
        <Descriptions.Item label="TO">{bond.to}</Descriptions.Item>
        <Descriptions.Item label="Remarks">{description}</Descriptions.Item>
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
          value="PerDay"
          style={{
            marginRight: 32
          }}
        />
        <Statistic title="Price" prefix="Rs" value={wage} />
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
        <PageHeader
          onBack={() => window.history.back()}
          title={titlee}
          subTitle="The job you seek"
          extra={[
            <Button
              type="primary"
              onClick={this.onClicknow.bind(this, jobkey, titlee)}
            >
              Apply
            </Button>
          ]}
          footer={
            <Tabs defaultActiveKey="1">
              <TabPane tab="Details" key="1" />
              <TabPane tab="Rule" key="2" />
            </Tabs>
          }
        >
          <Content extra={extraContent}>{renderContent()}</Content>
        </PageHeader>
      </div>
    );
  }
}

export default JobDisplay;
