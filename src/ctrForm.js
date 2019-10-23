import React, { Component } from "react";
import { Form, Select, Button, Icon, Input, Tooltip } from "antd";
import "./Components/Input/inputWorker.css";
import { auth, db, fire } from "./Components/Home/config";
import { Redirect } from "react-router-dom";

const { Option } = Select;
class Checkboxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      routeToProfile: false
    };
  }

  componentDidMount = () => {
    var that = this;

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user hey");
        that.setState({ uid: user.uid });
      }
    });
  };
  handleClick() {
    console.log("inside handle click");
    this.setState({ routeToProfile: true });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        db.ref("profile 0")
          .child(this.state.uid)
          .set(values);
        this.handleClick();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="19">+19</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your name"
              }
            ]
          })(
            <Input
              className="inputBox"
              placeholder="input username"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
          )}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>

        <Form.Item label="Gender">
          {getFieldDecorator("gender", {
            rules: [{ required: true, message: "Please select your gender!" }]
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" className="confirmButton">
            <Icon type="check" style={{ color: "white" }} />
          </Button>
        </Form.Item>

        {this.state.routeToProfile ? <Redirect to="/CtrProfile" /> : null}
      </Form>
    );
  }
}
const CtrForm = Form.create({ name: "input" })(Checkboxs);
export default CtrForm;
