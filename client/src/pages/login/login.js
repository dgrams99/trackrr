import React from 'react';
// import API from "../../utils/API";
import{
  getFromStorage,
  setInStorage,
} from '../../utils/storage'
import {
  Form, Icon, Input, Button, Checkbox, Row, Col
} from 'antd';
import   '../../antd/dist/antd.css';
import   './login.css';
import axios from "axios";

class NormalLoginForm extends React.Component {

  state = {
    isLoading: true,
    token: "",
    UserToken: "",
    errorMessages: false,
    message: ''
  }

 
  componentDidMount() {
    const obj = getFromStorage('the_main_app')
    if(obj && obj.token) {
      const {token} =obj
      //verify token 
      fetch('http://localhost:3001/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if(json.success) {
            this.setState({
              token,
              isLoading: false
            })
             window.location.reload();
             window.location.assign('/home');
          } 
        })
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values.userName)
        axios.post('http://localhost:3001/api/account/signin', {
          email: values.userName,
          password: values.password
        })
        .then(res => res)
   .then(json => {
     console.log(json.data.token)
      if(json.data.success) {
        setInStorage('the_main_app', {token: json.data.token})
        setInStorage('trackrr', {UserToken: json.data.Usertoken})
        window.location.assign('/home');
      } if (json.data) {
        this.setState({
          message: json.data.message,
          errorMessages: true,
          UserToken: json.data.Usertoken
        })
        console.log(`message: ${this.state.message}`)
        console.log(` ${this.state.UserToken}`)
      } else {
        console.log('ha')
      }
   })
   .catch(err => console.log(err));
        
      }
    });
  }

  Signup = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values.userName)
        axios.post('http://localhost:3001/api/account/signup', {
          email: values.userName,
          password: values.password
        })
        .then(res => res)
   .then(json => {
     console.log(json.data.token)
      if(json.data.success) {
        setInStorage('the_main_app', {token: json.data.token})
        setInStorage('trackrr', {UserToken: json.data.Usertoken})
        window.location.assign('/home');
      } if (json.data) {
        this.setState({
          message: json.data.message,
          errorMessages: true,
          UserToken: json.data.Usertoken
        })
        console.log(`message: ${this.state.message}`)
        console.log(` ${this.state.UserToken}`)
      } else {
        console.log('ha')
      }
   })
   .catch(err => console.log(err));
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     
      <div className='login-page'>
      <Row gutter={16} className="">
      <Col className="gutter-row" span={12} offset={6}>
      <div className=''>
        <h1 className='header'>Trackrr</h1>
      </div>
      </Col>
      </Row>
   
      <Row gutter={16} className="login-form-header">
      <Col className="gutter-row" span={12} offset={6}>
      <div className='gutter-box'>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your Username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
        
          
          
          <Button type="primary" htmlType="submit" className="login-form-button btn">
            Log in
          </Button>
          Or 
          <Button type="primary" onClick={this.Signup} className="signup-form-button btn">
           Sign-up
          </Button>
        </Form.Item>
      </Form>
      </div>
      </Col>
      </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;