import React, { Component } from "react";

import UserService from "../services/user.service";
import Footer from "./footer";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  
  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container" style={{margin:'0 0 0 0', padding: '0 0 0 0'}}>
        <header className="jumbotron">
          <h3>Reports</h3>
        </header>
        <Footer/>
      </div>
    );
  }
}
