import React, { Component } from "react";
import CollapsibleTable from "./report-table";
import UserService from "../services/user.service";
import MyPiechart from "./piechart";
import Footer from "./footer";
import axios from "../connections";
import authHeader from "../services/auth-header";
import "../index.css";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      orders: [],
            users: [],
            userCount:0,
            adminCount:0,
            moderatorCount:0, 
            data:[]
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

    axios
            .get("reports/orders", { headers: authHeader() })
            .then((resp) => this.setState({ orders: resp.data }));
        
            axios
            .get("reports/users", { headers: authHeader() })
            .then((resp) => this.setState({ users: resp.data }));
    

  }

  render() {
    const{users}=this.state;
    const userCount = users.filter(user => user.role === 'ROLE_USER').length;
    const adminCount = users.filter(user => user.role === 'ROLE_ADMIN').length;
    const moderatorCount = users.filter(user => user.role === 'ROLE_MODERATOR').length;
      return (
        <div className="grid-container">
            {userCount!==0 && adminCount!==0 && moderatorCount!==0 && <main>
                <div className="content">
                    <div className="main">
                    <div className="filter">
                      <span className="reports-title">REPORTS & STATISTICS</span>
                    </div>  
                    </div>
                    
                </div>
                <div className="content">
                  <CollapsibleTable/>
                   <div className="chart-container">
                       <MyPiechart userCount={userCount} adminCount={adminCount} moderatorCount={moderatorCount}></MyPiechart>
                    </div>
                </div>
                
            </main>}
            <Footer/>
         </div>);

    }
}
