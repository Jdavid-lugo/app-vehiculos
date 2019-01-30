import React, { Component } from 'react';
import './App.css';
import { Link,Redirect } from "react-router-dom";
import Navbar from "./Navbar";

class Main extends Component {
  constructor( props){
    super(props);
    this.state={auth:props.location.auth};
    //console.dir(this.state);
  }
  render() {
    const auth =this.state.auth;
    if(auth){
      return (
        <div className="App">
          <Navbar auth={auth} />
          <header className="App-header">
            <p>
              Pagina principal con opcioens de menu.
            </p>
            <Link className="App-link" to="/login"  rel="noopener noreferrer">
              Cerrar Sesión
            </Link>
          </header>
        </div>
      );
    }else{
      return(<Redirect to={{pathname: '/login',auth:false}} />);      
    }
  }
}

export default Main;
