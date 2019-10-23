import React, { Component } from "react";
import { Card, Drawer, List } from "antd";
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
        this.state.uid = user.uid;
        var applications = db.ref("app").orderByKey();
        applications.once("value").then(function(snapshot) {
          let data = [];
          console.log(snapshot);
          snapshot.forEach(function(childSnapshot) {
            application = childSnapshot.val();
            console.log(application);
            if (application.ctruid === that.state.uid) {
              that.sampleOne();
            }
            data.push(childdata);
          });

          console.log("data print : ");
          console.log(data);
          that.setState({ data });
        });
      }
    });
  };
  sampleOne = () => {
    var workerInfo = db.ref("profile1").child(application.useruid);

    workerInfo.once("value").then(function(workerInfoshot) {
      let workerInformation = workerInfoshot.val();
      childdata["wrkname"] = workerInformation.username;
    });
    this.sampleTwo();
  };

  sampleTwo = () => {
    var jobinfo = db.ref("job").child(application.jobkey);
    jobinfo.once("value").then(function(jobInfoshot) {
      let jobInformation = jobInfoshot.val();
      console.log("hi job info is here");
      childdata["jobtitle"] = jobInformation.titlee;
    });
  };

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
                  <div className="content">
                    <Card
                      hoverable
                      title={item.wrkname}
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        width: "300px",
                        height: "100px",
                        borderRadius: "40px 40px",
                        borderColor: "rgba(146, 254, 157, 1)",
                        color: "rgba(0, 201, 255, 1)",
                        textAlign: "center"
                      }}
                    ></Card>
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
