import { List, message, Avatar, Spin, Modal } from "antd";
import reqwest from "reqwest";
import React, { Component } from "react";
import { fire, auth, provider, db } from "../Home/config.js";
import InfiniteScroll from "react-infinite-scroller";
import JobDisplay from "./jobdisplay.js";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
var dup = [];

class JobList extends Component {
  state = {
    data: [],
    jobkey: [],
    loading: false,
    hasMore: true,
    selectedItem: null,
    uid: ""
  };

  componentDidMount = () => {
    var that = this;
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.state.uid = user.uid;
        var userdetails = "";
        var currentUser = db.ref("profile1").child(user.uid);
        currentUser.once("value").then(function(currentusershot) {
          userdetails = currentusershot.val();
          console.log(userdetails);
        });
        var query = db.ref("job").orderByKey();
        query.once("value").then(function(snapshot) {
          let data = [];
          snapshot.forEach(function(childSnapshot) {
            let child = childSnapshot.val();
            child["key"] = childSnapshot.key;
            let flag = 0;
            if (userdetails.pincode == child.pincode) {
              userdetails.skills.every(e1 =>
                child.skills.every(e2 => {
                  if (e1 == e2) {
                    data.push(child);
                    flag++;
                    if (flag != 0) return false;
                    else return true;
                  }
                })
              );
            }

            // var key = childSnapshot.key;
            // var childData = childSnapshot.val();
            // var buery = db
            //   .ref("job")
            //   .child(key)
            //   .orderByKey();
            // buery.once("value").then(function(snapshot) {
            //   const data = [];
            //   const jobkey = [];
            //   snapshot.forEach(function(childSnapshot) {
            //     var key = childSnapshot.key;
            //     var childData = childSnapshot.val();
            //     data.push(childData);
            //     jobkey.push(key);
            //     that.setState({ data: data });
            //     that.setState({ jobkey: jobkey });
            //   });
            //   console.log(that.state.jobkey);
            //   console.log(that.state.data);
            // });
          });
          that.setState({ data });
        });
      }
    });

    //   this.fetchData(res => {
    //  this.setState({
    //   data: res.results,
    //   });
    // });
  };

  // fetchData = callback => {
  //reqwest({
  //url: fakeDataUrl,
  // type: 'json',
  // method: 'get',
  // contentType: 'application/json',
  //success: res => {
  // callback(res);
  //},
  //});
  // };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
        visible: false
      });
      return;
    }
    // this.fetchData(res => {
    //  data = data.concat(res.results);
    //  this.setState({
    //    data,
    //   loading: false,
    //  });
    // });
  };
  showModal = item => {
    this.setState({
      visible: true,
      selectedItem: item
    });
  };
  hideModal = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { data, loading, hasMore, visible, selectedItem } = this.state;
    return (
      <div className="demo-infinite-container">
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
              <List.Item
                key={item.key}
                actions={[
                  <a
                    key="list-loadmore-edit"
                    onClick={this.showModal.bind(this, item)}
                  >
                    select
                  </a>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://cdn1.iconfinder.com/data/icons/office-and-employment-vol-2-2/48/311_office_employee_person_user_avatar_search_find_candidate_right-512.png" />
                  }
                  title={<a href>{item.titlee}</a>}
                  description={<p>per/day:{item.wage} Rs</p>}
                />
              </List.Item>
            )}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
        <Modal
          title="Modal"
          visible={visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="OK"
          cancelText="CANCEL"
        >
          <JobDisplay {...selectedItem} />
        </Modal>
      </div>
    );
  }
}

export default JobList;
