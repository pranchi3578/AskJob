
import React, {Component} from "react";
import "./shoutout.css";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker,InputNumber } from 'antd';
import { auth, db,fire } from "../Home/config.js";


class Job extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'',           
           
        };
    }
    
    
      componentDidMount = ()=>{
        var that = this
    
        fire.auth().onAuthStateChanged((user) => {
                    if(user){
                      console.log("user hey");
                        that.setState({uid:user.uid});
                    }
                    })
    }
  state = { visible: false };

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

  onChange(value) {
    console.log('changed', value);
  }
 
  
  handleSubmit = e => {
    e.preventDefault();
   
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
       
        var formData = this.props.form.getFieldsValue();
   db.ref('jobs').child(this.state.uid).set(formData )
       
      }
    });
  };
  render() {
    const { Option } = Select;
    const { getFieldDecorator} = this.props.form;
    
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
        <Form layout="vertical" hideRequiredMark>

        <Form.Item style={{paddingTop:0}}>
                  {getFieldDecorator('Title', {
                    rules: [{ required: true, message: 'Please enter Job Title' }],
                  })(<Input placeholder="Please enter Job Title" />)}
                </Form.Item>

                <Form.Item >
                  {getFieldDecorator('dateTime', {
                    rules: [{ required: true, message: 'Please choose the dateTime' }],
                  })(
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />,
                  )}
                </Form.Item>
                <Form.Item >
                  {getFieldDecorator('wage', {
                    rules: [{ required: true, message: 'Please enter wage per day' }],
                  })(
                    <InputNumber
                    defaultValue={1000}
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
                    defaultValue={686504}
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

          
            <Button onClick={this.handleSubmit} type="primary"  htmlType="submit">
              Submit
            </Button>
           
         
          </Form.Item>
        

        </Form> 

        
        </Drawer>
      </div>
    );
  }
}
const ShoutOut = Form.create({ name: 'input' })(Job);

export default ShoutOut;