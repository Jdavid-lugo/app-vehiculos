import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from "react-router-dom"
import Login from './Login';
import App from './App';
import Main from './Main';
import Cars from './Cars';
import CarroNuevo from './CarroNuevo';
//import * as serviceWorker from './serviceWorker';
import './index.css';


const Ruta = () => (
  <HashRouter> 
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/login" component={Login} exact /> 
      <Route path="/main" component={Main} exact /> 
      <Route path="/carros" component={Cars} exact /> 
      <Route path="/carroNuevo" component={CarroNuevo} exact /> 
     
    </Switch>
  </HashRouter>
)

ReactDOM.render(<Ruta/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();



