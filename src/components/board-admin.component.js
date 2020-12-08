import React, { Component } from "react";
import CollapsibleTable from "./report-table";
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
        <div className="grid-container">
            <main>
                <div className="content">
                    <div className="main">
                    <div className="filter">
                      <span className="filter-result">REPORTS</span>
                    </div>  
                    </div>
                    <CollapsibleTable/>
                </div>
            </main>
            <Footer/>
         </div>);

    }
}
