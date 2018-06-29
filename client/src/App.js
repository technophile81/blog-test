import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import Auth from "./auth/Auth.js";

import './App.css';

import { Router, Route } from "react-router-dom";
//BrowserRouter doesn't let us manage history properly

import history from './history';

import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';
import Callback from './pages/Callback';



//const isAuthenticated = auth.isAuthenticated
// Make instance of auth
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
  render() {
    const { isAuthenticated } = auth;
    return (
      <Router history={history}>
        <div>
          <div>
            {
              isAuthenticated() ?
                (
                  <div>Logged in <button onClick={() => auth.logout()} >Logout</button></div>
                )
                :
                (
                  <div>Logged out <button onClick={() => auth.login()} >Login</button></div>
                )
            }
          </div>
          {/*<Route exact path="/" component={ViewBlog} />*/}
          <Route exact path="/" render={(props) => <ViewBlog auth={auth} {...props} />} />

          {/*<Route exact path="/edit" component={EditBlog} />*/}
          <Route path="/edit" render={(props) => <EditBlog auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>

          {/* <EditBlog
            handleInputChange={this.handleInputChange}
            title={this.state.title}
            body={this.state.body}
            postBlog={this.postBlog}
          /> */}
        </div>
      </Router>

    );
  }
}

export default App;