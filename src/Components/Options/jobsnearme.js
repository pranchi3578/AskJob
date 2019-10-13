import { List, message, Avatar, Spin, Modal } from 'antd';
import reqwest from 'reqwest';
import React,{Component} from "react";
import { fire, auth, provider,db } from "../Home/config.js"
import InfiniteScroll from 'react-infinite-scroller';
import JobDisplay from "./jobdisplay.js"


const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
var dup=[];

class JobList extends Component {
  state = {
    data: [],
    jobkey:[],
    loading: false,
    hasMore: true,
  };


  componentDidMount=()=> {
    var that=this;
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        var query = db.ref('job').orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
           var key = childSnapshot.key;
           var childData = childSnapshot.val();
            var buery = db.ref('job').child(key).orderByKey();
            buery.once("value")
            .then(function(snapshot) {
              const data = [];
              const jobkey=[];
              snapshot.forEach(function(childSnapshot) {
               var key = childSnapshot.key;
              var childData = childSnapshot.val();
              data.push(childData);
              jobkey.push(key);
            that.setState({data:data})
            that.setState({jobkey:jobkey})
            
            });
            console.log(that.state.jobkey)
           console.log(that.state.data)
            
            
          });
         
          
          
          });
        });
          
      }
      })
     
       
   
 //   this.fetchData(res => {
    //  this.setState({
     //   data: res.results,
   //   });
   // });


   



  }
  

 



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
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
        visible:false
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
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={[...this.state.data,...this.state.jobkey]}
            renderItem={item=> (
              <List.Item key={item.id} actions={[<a key="list-loadmore-edit" 
                onClick={this.showModal}>select</a>]}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://cdn1.iconfinder.com/data/icons/office-and-employment-vol-2-2/48/311_office_employee_person_user_avatar_search_find_candidate_right-512.png" />
                  }
                  title={<a href>{item.Title}</a>}
                  description={item.description}                
                />
                <div>Content</div>
              </List.Item>
              
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
        <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="OK"
          cancelText="CANCEL"
        >
              <JobDisplay/>
           </Modal>
      </div>
      
    );
  }
}

export default JobList;