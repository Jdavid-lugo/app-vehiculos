import React,{Component} from 'react';
import { Form, Input, Button,DatePicker,Layout,Row,Col} from 'antd';
import "antd/dist/antd.css";
import {Redirect,Link} from "react-router-dom";
import Navbar from "./Navbar";


class CarroNuevo extends Component {
  constructor(props){
    super(props);
    this.state ={
      authSesion:props.location.auth,
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
    //if(auth){
    if(true){
      return (
        <Layout>
          <Row> 
            <Col span={24}>
             <div className="App">
                <Navbar auth={auth} />
             </div><br></br><br></br>
            </Col>
          </Row>
          <Row>
            <Col span={14} offset={5}>
               <Form onSubmit={this.handleSubmit} className="login-form" >
                <Form.Item>
                  {getFieldDecorator('Marca', {
                    rules: [{ required: true, message: 'ingresar marca!' }],
                  })(
                    <Input placeholder="Marca" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('Modelo', {
                    rules: [{ required: true, message: 'Ingresar Modelo!' }],
                  })(
                    <Input type="text" placeholder="Modelo" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('Fecha', {
                    rules: [{ required: true, message: 'Ingresar Fecha!' }],
                  })(
                    <DatePicker className='datePicker__' />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('Pais', {
                    rules: [{ required: true, message: 'Ingresar Pais de Fabricación!' }],
                  })(
                    <Input type="text" placeholder="Pais" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('MaximaVelocidad', {
                    rules: [{ required: true, message: 'Ingresar maxima velocidad!' }],
                  })(
                    <Input type="number" placeholder="Maxima velocidad" />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="guardar-form-button">
                    Guardar
                  </Button>
                  
                </Form.Item>
              </Form>
            </Col>

          </Row>
          <Row>
            <Col span={6} offset={3}>
              <Link className="App-link" to={{pathname:"/main",auth:auth}} >Volver</Link>
            </Col>
          </Row>
        </Layout>
      );
    }else{
      
      return(<Redirect to={{pathname: '/main',auth:auth}} />);
    }
  }
}


export default Form.create({ name: 'inicio_sesion' })(CarroNuevo);