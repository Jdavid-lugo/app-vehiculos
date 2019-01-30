import React, { Component } from 'react';
import { Modal, Button,Icon,Form,Input,DatePicker } from 'antd';

class ModalModificar extends Component {

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
    console.log(this.state.props2);
    const datos=this.state.props2;
    this.props.form.setFieldsValue({
      Marca: datos.brand,Modelo:datos.model,
      Pais:datos.madein,MaximaVelocidad:datos.maxspeed
    });

    this.setState({
      visible: true,
    });

  }

  handleOk = () => {
    this.setState({
      ModalText: 'Guardando',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
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
        <a onClick={this.showModal}>
          <Icon type='edit' /> 
        </a>
        <Modal
          title={ModalText}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
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
          </Form>
        </Modal>
      </span>
    );
  }
}
export default Form.create({ name: 'modificar' })(ModalModificar);