import React, { Component } from "react";
import "./shoutout.css";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Card,
  DatePicker,
  InputNumber,
  Tag
} from "antd";
import { auth, db, fire } from "../Home/config";
import { Redirect } from "react-router-dom";

var datee = null;
var valueOfInput;

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      visible: false,
      date: "",
      RedirecttoCtrProfile: false,
      datee: null,
      selectedTags: [],
      jobkey: [],
      userData: []
    };
  }

  componentDidMount = () => {
    var that = this;

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user hey");
        that.setState({ uid: user.uid });
        console.log(user);
        this.fetchDetails(user.uid);
      }
    });
  };
  fetchDetails = uid => {
    var that = this;
    var qwery = db.ref("profile 0").child(uid);
    qwery.once("value").then(function(snapshot) {
      //child = snapshot.val();
      that.setState({ userData: snapshot.val() });
    });
  };

  handleChangee(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }
  handleChange = date => {
    valueOfInput = date;
    console.log("Received values of date: ", valueOfInput);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        var key = db.ref().push().key;
        let values = val;
        values["bond"] = {
          from: valueOfInput[0].format(),
          to: valueOfInput[1].format()
        };
        values["skills"] = this.state.selectedTags;
        values["user"] = this.state.uid;
        values["jobkey"] = key;
        db.ref("job")
          .child(key)
          .set(values);
        this.storeData(key);
      }
    });
  };
  storeData = key => {
    const { uid, userData } = this.state;
    var child = userData;
    if (child.hasOwnProperty("jobs")) {
      child.jobs.push(key);
    } else {
      var jobs = [key];
      child["jobs"] = jobs;
    }

    db.ref("profile 0")
      .child(uid)
      .set(child);
    this.props.form.resetFields();
    this.setState({ RedirecttoCtrProfile: true });
  };

  onChange(value) {
    console.log("changed", value);
  }

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

  render() {
    const { CheckableTag } = Tag;
    const tagsFromServer = ["plumber", "carpenter", "data entry", "driver"];
    const { getFieldDecorator, selectedTags } = this.props.form;
    return (
      <div className="div1">
        <div style={{ marginTop: "16px" }}>
          <Card
            onClick={this.showDrawer}
            hoverable
            title="Add Jobs"
            style={{
              width: "200px",
              height: "50px",
              borderRadius: "30px 30px",
              textAlign: "center"
            }}
          ></Card>
        </div>
        <Drawer
          title="Shout Out"
          placement="bottom"
          height={570}
          mask={false}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: "absolute" }}
        >
          <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
            <Form.Item style={{ paddingTop: 0 }}>
              {getFieldDecorator("titlee", {
                rules: [{ required: true, message: "Please enter Job Title" }]
              })(<Input placeholder="Please enter Job Title" />)}
            </Form.Item>

            <Form.Item>
              <DatePicker.RangePicker
                onChange={date => {
                  this.handleChange(date);
                }}
                style={{ width: "100%" }}
                getPopupContainer={trigger => trigger.parentNode}
              />
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("wage", {
                rules: [
                  { required: true, message: "Please enter wage per day" }
                ]
              })(
                <InputNumber
                  initialValue={1000}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("pincode", {
                rules: [{ required: true, message: "Please enter pin" }]
              })(
                <InputNumber
                  style={{ width: "300px" }}
                  initialValue={686504}
                  formatter={value =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              <h6 style={{ marginRight: 8, display: "inline" }}>Skills:</h6>
              {tagsFromServer.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={this.state.selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChangee(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "please enter job description"
                  }
                ]
              })(
                <Input.TextArea
                  rows={4}
                  placeholder="please enter job description"
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>

              <Button type="primary" htmlType="submit" onClick={this.onClose}>
                Submit
              </Button>
            </Form.Item>

            {this.state.RedirecttoCtrProfile ? (
              <Redirect to="/CtrProfile" />
            ) : null}
          </Form>
        </Drawer>
      </div>
    );
  }
}
const ShoutOut = Form.create({ name: "inp" })(JobForm);
export default ShoutOut;
