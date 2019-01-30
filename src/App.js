import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link
            className="App-link"
            to="/login"
            rel="noopener noreferrer"
          >
            Inicio de Sesion
          </Link>
        </header>
      </div>
    );
  }
}

export default App;
