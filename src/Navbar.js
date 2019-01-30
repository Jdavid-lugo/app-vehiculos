import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";


class Navbar extends Component {
  
  constructor(props){
    super(props);
    this.state={auth:props.auth};
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const auth=this.state.auth;
    if (auth){
      return (
        <Menu  onClick={this.handleClick}  selectedKeys={[this.state.current]} mode="horizontal" >
          <Menu.Item key="carros">
            <Link to={{pathname:'/carros',auth:auth}} ><Icon type="car" />Carros</Link>
          </Menu.Item>
          <Menu.Item key="cerrar sesion">
            <Link to='./login' >Cerrar Sesión</Link>
          </Menu.Item>
        </Menu>
      );
    }else{
      return (<p></p>);
    }

  }
}

export default Navbar;