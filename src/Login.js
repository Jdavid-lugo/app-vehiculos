import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm.js';


//import "./index.css";


class Login extends Component {
  render() {
    //const WrappedLoginForm = LoginForm;
    return (
      <div className='App'>
        <header className='App-header'>
          <label className='login-titulo'>Inicio de Sesión</label>
          <br></br>
          <LoginForm />
        </header>
      </div>
    );
  }
}

export default Login;
