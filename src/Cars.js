import React, { Component } from 'react';
import { Layout, Row, Col,Icon } from 'antd';
import { Link,Redirect } from "react-router-dom";

import './App.css';
import "antd/dist/antd.css";

import Navbar from "./Navbar";
import Manager from "./Manager";


const { Content} = Layout;

class Cars extends Component {
  constructor( props){
    super(props);
    this.state={auth:props.location.auth};
    //console.dir(this.state);
  }
  render() {
    const auth =this.state.auth;
    //if(true){
    if(auth){
      return (
          <Layout>
            <div className="App">
              <Navbar auth={auth} />
            </div>
            <Content className='App-content'>
              <Row>
                <Col span={18} offset={3}>
                  <Manager auth={auth}/><br></br>
                </Col>
              </Row>
              <Row></Row>
            </Content>
          </Layout>
      );
    }else{
      return(<Redirect to={{pathname: '/login',auth:false}} />);      
    }
  }
}

export default Cars;
