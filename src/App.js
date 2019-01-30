import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className='title'>
            Hola Bienvenido.
          </p>
          <Link className="App-link" to="/login" rel="noopener noreferrer">
            Inicio de Sesion
          </Link>
        </header>
      </div>
    );
  }
}

export default App;
