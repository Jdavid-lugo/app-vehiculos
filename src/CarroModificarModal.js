import React, { Component } from 'react';
import { Modal, Button,Icon,Form,Input,InputNumber,message } from 'antd';
import reqwest from 'reqwest';



class CarroModificarModal extends Component {

  constructor(props){
    super(props);
    this.state={
      ModalText: 'Modificar Carro',
      visible: false,
      confirmLoading: false,
      props2:props.datos
    };

  }

  showModal = () => {
    const datos=this.state.props2;
    this.props.form.setFieldsValue({
      Marca: datos.brand,Modelo:datos.model,
      Pais:datos.made_in,Fecha:datos.year,
      MaximaVelocidad:datos.max_speed,id:datos.id
    });

    this.setState({
      visible: true,
    });

  }
  

  guardar = (params = {}) => {
    this.setState({ 
      ModalText: 'Guardando',
      confirmLoading: true
    });
    
    //console.log(params);
    reqwest({
      url: 'http://localhost/apiCar.php',
      method: 'post',
      data: {
        accion:'modificar',
        ...params,
      },
      type: 'json',
    }).then((data) => {
      
      this.setState({
        visible: false,
        confirmLoading: false,
      });

      if(data.status === 200){
        message.success('Se ha modificado correctamente');
        this.props.actualizarTabla();
      }else{
        message.error('No se modifico el elemento');

      }
    });
  }


  handleOk = () => {
    let params = this.props.form.getFieldsValue();
    this.guardar(params);

  }

  handleCancel = () => {
    //console.log('Clicked cancel button');
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
       
        <Icon className='modalIcon' onClick={this.showModal} type='edit' />
        
        <Modal
          title={ModalText} 
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Volver</Button>,
            <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
              Guardar
            </Button>,
          ]}>
           <Form onSubmit={this.handleSubmit} className="login-form" >
            <Form.Item>
              {getFieldDecorator('id', {
                rules: [{ required: true, message: 'ingresar marca!' }],
              })(
                <Input placeholder="id" type="hidden" />
              )}
            </Form.Item>
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
                <InputNumber min={1900} max={2030} className="login-form-button"/>
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
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create({ name: 'modificar' })(CarroModificarModal);