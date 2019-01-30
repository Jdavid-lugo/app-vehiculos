import React from 'react';
import { Form, Icon, Input, Button} from 'antd';
import "antd/dist/antd.css";
import {Redirect} from "react-router-dom";



class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      authSesion:false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Validar usuarios', values);
        
        //console.dir(this.state);
        
        const respuesta = this.iniciarSesion(values);
        if(respuesta){
          this.setState({authSesion:true});
          //console.log('si hay sesion');

        }else{
          //console.log('no hay sesion');
        }
      }
    });
  }

  iniciarSesion(values){
    const user1="david";
    const pass1="lugo";
    const user0 = values.user;
    const pass0 = values.pass;
    //console.log(`validando sesion de`+user0);
    if( user0=== user1 && pass0 === pass1){
      return true;
    }else{
      return false;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const auth = this.state.authSesion;
    if(!auth){
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" >
          
          <Form.Item>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: 'ingresar usuario!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pass', {
              rules: [{ required: true, message: 'Ingresar contraseña!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Iniciar Sesión
            </Button>
            
          </Form.Item>
        </Form>
      );
    }else{
      
      return(<Redirect to={{pathname: '/main',auth:auth}} />);
    }
  }
}


export default Form.create({ name: 'inicio_sesion' })(LoginForm);