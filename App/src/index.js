import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import Page404 from './pages/404/Page404';
toast.configure();

ReactDOM.render(
  // <NavLink activeClassName="nombreDeClase" exact to=""></NavLink>
  <>
  
    <Router>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  </>,
  document.getElementById('root')
);
