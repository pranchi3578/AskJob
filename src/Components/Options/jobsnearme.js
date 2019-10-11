import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import React,{Component} from "react";
import { fire, auth, provider,db } from "../Home/config.js"
import InfiniteScroll from 'react-infinite-scroller';


const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
var dup=[];

class JobList extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };


  componentDidMount=()=> {
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
              snapshot.forEach(function(childSnapshot) {
               var key = childSnapshot.key;
              var childData = childSnapshot.val();
              data.push(childData);
            
            
            });
            dup=data;
            console.log(dup);
            
            
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
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.disc}
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
      </div>
    );
  }
}

export default JobList;