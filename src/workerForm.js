import React, {Component} from "react";
import {
  Form,
  Select,
  Button,
  Icon,
  Input,
  Tooltip,
  DatePicker

} from 'antd';
import "./Components/Input/inputWorker.css";
import { auth, db,fire } from "./Components/Home/config";


const { Option } = Select;
var datee=''; // to duplicate and store DOB in firebase
class Checkboxs extends Component{
  constructor(props) {
    super(props);
    this.state = {
        uid:'',
        date:'',
       
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
handleChange = date => {
 const valueOfInput = date.format();
  console.log('Received values of date: ', valueOfInput);
  datee=valueOfInput;

};

  handleSubmit = e => {
    e.preventDefault();
   
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
       
        var formData = this.props.form.getFieldsValue();
   db.ref('profile').child(this.state.uid).set(formData )
   db.ref('profile').child(this.state.uid).child('DOB').set(datee )
       
      }
    });
  };

  

render(){
  
const {getFieldDecorator}  = this.props.form;

 

return(
  <Form  onSubmit={this.handleSubmit}>
    <Form.Item  >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your name',
              },
            ],
          })(<Input className="inputBox" placeholder="input username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
              <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
              </Tooltip>
                }
                 />)}
        </Form.Item>
 <Form.Item label="Skills">
          {getFieldDecorator('skills', {
            rules: [
              { required: true, message: 'Please select your Skill Set!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select Skill Set">
              <Option value="plumber">Plumper</Option>
              <Option value="tapper">Tapper</Option>
              <Option value="builder">Builder</Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="Gender">
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="DOB" hasFeedback >
       
      <DatePicker onChange={(date)=>{this.handleChange(date)} }style={{ width: '100%' }} />

    </Form.Item>
        
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>        
         
                 <Button  type="primary" htmlType="submit"
                  className="confirmButton">
                 <Icon type="check" style={{ color: 'white' }}/>

                 </Button>

        </Form.Item>
      

        </Form>
)
}

 }   
 const WrappedDemo = Form.create({ name: 'input' })(Checkboxs);
 export default WrappedDemo;
               