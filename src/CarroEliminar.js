import React, { Component } from 'react';
import { Popconfirm, Icon,message } from 'antd';
import reqwest from 'reqwest';


class CarroEliminar extends Component {

  constructor(props){
    super(props);
    this.state={
      props2:props.datos
    };

  }



  confirm() {
    const id = this.state.props2.id;
    this.fetch(id);
  }



  fetch = (params = {}) => {
    let accion = this.state.props2.active ==='t'?'eliminar':'habilitar';
    reqwest({
      url: 'http://localhost/apiCar.php',
      method: 'get',
      data: {
        accion:accion,
        id:params,
      },
      type: 'json',
    }).then((data) => {
      if(data.status === 200){
        message.success('Se ha inhabilitado correctamente');
        this.props.actualizarTabla();
      }else{
        message.error('No se modifico el carro, error');
      }
    });
  }


  
  render() {
    const datos = this.state.props2;
    let mensaje = '';
    let icono = 'poweroff';
    if(datos.active ==='t'){
      mensaje= `Desea eliminar al carro: ${datos.model} de marca ${datos.brand}????`; 
    }else{
      mensaje= `Desea activar al carro: ${datos.model} de marca ${datos.brand}????`; 
    }
    return (
      <span>
        <Popconfirm title={mensaje} onConfirm={()=>{this.confirm()}} okText="Si" cancelText="No">
          <Icon  className='modalIcon' type={icono} />
        </Popconfirm>
      </span>
    );
  }
}
export default CarroEliminar;