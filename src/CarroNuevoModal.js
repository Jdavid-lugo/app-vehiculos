import React, { Component } from 'react';
import { Modal, Button,Icon,Form,Input,InputNumber,message } from 'antd';
import reqwest from 'reqwest';



class CarroNuevoModal extends Component {

  constructor(props){
    super(props);
    this.state={
      ModalText: 'Modificar Carro',
      visible: false,
      confirmLoading: false,
    };

  }

  showModal = () => {

    this.setState({
      visible: true,
    });

  }


  fetch = (params = {}) => {
    this.setState({ 
      ModalText: 'Guardando',
      confirmLoading: true
    });
    

    reqwest({
      url: 'http://localhost/apiCar.php',
      method: 'post',
      data: {
        accion:'insertar',
        ...params
      },
      type: 'json'
    }).then((data) => {

      this.setState({
        visible: false,
        confirmLoading: false,
      });

      if(data.status === 200){
        message.success('Se inserto correctamente');
        this.props.actualizarTabla();
      }else{
        message.error('No se inserto el elemento');

      }
    });
  }


  handleOk = (e) => {
    e.preventDefault();
    let params = this.props.form.getFieldsValue();
    this.fetch(params);

  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading, ModalText } = this.state;
    //console.dir(getFieldDecorator);

    return (
      <span>
        <span className='App-link' onClick ={this.showModal}>
          Agregar Nuevo<Icon className=''  type='plus' />
        </span>
        <Modal
          title={ModalText} 
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Volver</Button>,
            <Button key="submit_" type="primary" loading={confirmLoading} onClick={this.handleOk}>
              Guardar
            </Button>,
          ]}>
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
                <InputNumber min={1900} max={2030}  placeholder="Año de Fabricación" className="login-form-button"/>
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
                <InputNumber min={1} max={500}  placeholder="Velocidad Maxima" className="login-form-button"/>

              )}
            </Form.Item>
          </Form>
        </Modal>
      </span>

    );
  }
}
export default Form.create({ name: 'nuevo' })(CarroNuevoModal);