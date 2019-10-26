import React, { Component } from "react";
import { Card, Drawer, List, Button } from "antd";
import "./jobapplications.css";
import { fire, auth, provider, db } from "../Home/config.js";
import InfiniteScroll from "react-infinite-scroller";
import { node } from "prop-types";
var application = "";
var childdata = [];
class JobApplications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      uid: "",
      loading: false,
      hasMore: true
    };
  }

  componentDidMount = () => {
    var that = this;
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        this.setState({ uid });
      }
    });
  };

  fetchJobs = uid => {
    var that = this;
    db.ref("profile 0")
      .child(uid)
      .child("jobs")
      .once("value", childData => {
        if (childData.val() == null) {
        } else {
          that.fetchApplications(childData.val());
        }
      });
  };

  fetchApplications = jobKeys => {
    let applications = [];
    var that = this;
    jobKeys.map(item => {
      console.log("item", item);

      db.ref("job")
        .child(item)
        .child("applications")
        .once("value", data => {
          console.log("inner", data.val());
          data.forEach(child => {
            applications.push(child.val());
          });

          console.log("data", applications);
          that.setState({ data: applications });
        });
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
    this.fetchJobs(this.state.uid);
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { data, loading, hasMore } = this.state;
    return (
      <div>
        <div>
          <Card
            onClick={this.showDrawer}
            hoverable
            title="Job Applications"
            style={{
              position: "absolute",
              zIndex: "1",
              width: "200px",
              height: "50px",
              borderRadius: "30px 30px",
              textAlign: "center",
              margin: "0px 0px 0px -285px"
            }}
          ></Card>
        </div>
        {this.state.visible ? (
          <Drawer
            title="Applications"
            placement="bottom"
            height={500}
            mask={false}
            onClose={this.onClose}
            visible={this.state.visible}
            getContainer={false}
            closable={true}
            style={{
              width: "375px",
              position: "absolute"
            }}
          >
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={loading && hasMore}
              useWindow={false}
              style={{ overflowY: "scroll", height: "400px" }}
            >
              <List
                dataSource={data}
                renderItem={item => (
                  <div
                    style={{
                      marginBottom: 5,
                      padding: 5,
                      borderRadius: 8,
                      minHeight: 70,
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
                    }}
                  >
                    <span>{item.titlee}</span>
                    <span>{item.userData.username}</span>
                    <Button type="primary" ghost>
                      Select
                    </Button>
                  </div>
                )}
              ></List>
            </InfiniteScroll>
          </Drawer>
        ) : null}
      </div>
    );
  }
}
export default JobApplications;
