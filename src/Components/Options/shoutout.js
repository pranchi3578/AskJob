
import React, {Component} from "react";
import "./shoutout.css";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker,InputNumber } from 'antd';
import { auth, db,fire } from "../Home/config";
import { Redirect } from "react-router-dom";


var datee=null;
var valueOfInput;
class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'', 
            visible: false,
            date:'',
            RedirecttoCtrProfile:false , 
           datee:null      
           
        };
    }
   

    componentDidMount = ()=>{
        var that = this
    
        fire.auth().onAuthStateChanged((user) => {
                    if(user){
                      console.log("user hey");
                        that.setState({uid:user.uid});
                        console.log(user);
                    }
                    })
    }
    handleChange = date => {
       valueOfInput = date;
       console.log('Received values of date: ', valueOfInput);
    
     
     }
     

   handleSubmit = e => {
   
   
   e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var key = db.ref().push().key;
          datee={
            from:valueOfInput[0].format(),
            to:valueOfInput[1].format()
           }
          this.setState({RedirecttoCtrProfile:true});
          console.log('Received values of form: ', values)
          const formData = this.props.form.getFieldsValue();  
          db.ref('job').child(this.state.uid).child(key).set(formData)
          db.ref('job').child(this.state.uid).child(key).child('bond').set(datee )
          this.props.form.resetFields();
         
         
        }
      });
    };

    onChange(value) {
        console.log('changed', value);
      }
    
     
     
    
    

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

 
  

  render() {
   
   
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="div1" >
        <div style={{ marginTop: "16px" }}>
          <Button type="primary" onClick={this.showDrawer}>
            Add Job
          </Button>
        </div>
        <Drawer
          title="Shout Out"
          placement="bottom"         
          height={500}
          mask={false}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
        
        <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>

<Form.Item style={{paddingTop:0}}>
          {getFieldDecorator('Title', {
            rules: [{ required: true, message: 'Please enter Job Title' }],
          })(<Input placeholder="Please enter Job Title" />)}
        </Form.Item>

        <Form.Item >
          
            <DatePicker.RangePicker
            onChange={(date)=>{this.handleChange(date)}}
              style={{ width: '100%' }}
              getPopupContainer={trigger => trigger.parentNode}
            />
      
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('wage', {
            rules: [{ required: true, message: 'Please enter wage per day' }],
          })(
            <InputNumber
            initialValue={1000}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={this.onChange}
          />
          )}
          </Form.Item>
          <Form.Item >
          {getFieldDecorator('pincode', {
            rules: [{ required: true, message: 'Please enter pin' }],
          })(
            <InputNumber style={{width:"300px"}}
            initialValue={686504}
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={this.onChange}
          />
          )}
          </Form.Item>
        

         <Form.Item >
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: 'please enter job description',
              },
            ],
          })(<Input.TextArea rows={4} placeholder="please enter job description" />)}
        </Form.Item>

        <Form.Item>    
    <Button onClick={this.onClose} style={{ marginRight: 8 }}>
      Cancel
    </Button>

 
    <Button  type="primary"  htmlType="submit" onClick={this.onClose}>
      Submit
    </Button>
   
 
  </Form.Item>

  {this.state.RedirecttoCtrProfile? <Redirect to="/CtrProfile" />:null} 
</Form> 
        
        </Drawer>
      </div>
    );
  }
}
const ShoutOut = Form.create({ name:'inp' })(JobForm);
export default ShoutOut;