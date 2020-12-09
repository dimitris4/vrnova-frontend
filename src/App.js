import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Courses from "./components/courses.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER")
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

 

  render() {
    
    const { currentUser, showModeratorBoard, showAdminBoard, showUserBoard } = this.state;

    return (
    
      <Router history={history}>
          <nav className="navbar navbar-expand-sm container-fluid" >
            <Link to={"/"} className="navbar-brand" >
              <img src="logo1_transparent.png" alt="" className="d-inline-block align-top"/>{' '}
            </Link>
            <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item upper-link">
                <Link to={"/home"} className="nav-link">
                  HOME
                </Link>
              </li>
              )}

              {showModeratorBoard && (
                <li className="nav-item upper-link">
                  <Link to={"/mod"} className="nav-link">
                    MODERATOR
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <>
                <li className="nav-item upper-link">
                  <Link to={"/user"} className="nav-link">
                    COURSES AVAILABLE
                  </Link>
                </li>
                <li className="nav-item upper-link">
                  <Link to={"/admin"} className="nav-link">
                    REPORTS
                  </Link>
                </li>
                </>
              )}

              {showUserBoard && (
                <>
                  <li className="nav-item upper-link">
                    <Link to={"/user"} className="nav-link">
                      MY COURSES
                    </Link>
                  </li>
                  <li className="nav-item upper-link">
                    <Link to={"/courses"} className="nav-link">
                      BUY COURSES
                    </Link>
                  </li>
                </>
              )}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item upper-link">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username.toUpperCase()}
                  </Link>
                </li>

                {/* <li className="nav-item upper-link">
                <Link to={'/cart'} className="nav-link"> Cart (0)</Link>
                </li> */}

                <li className="nav-item upper-link">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LOGOUT
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item upper-link">
                  <Link to={"/login"} className="nav-link">
                    LOGIN
                  </Link>
                </li>

                <li className="nav-item upper-link">
                  <Link to={"/register"} className="nav-link">
                    SIGN UP
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container-fluid" style={{padding:0}}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/courses" render={currentUser => <Courses user={this.state.currentUser} />} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>
      </Router>
    );
    
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
