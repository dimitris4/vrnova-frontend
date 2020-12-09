import React, { Component } from "react";
import CollapsibleTable from "./report-table";
import CollapsibleTable2 from "./report-table2";
import UserService from "../services/user.service";
import MyPiechart from "./piechart";
import MyPiechart2 from "./piechart2";
import Footer from "./footer";
import axios from "../connections";
import authHeader from "../services/auth-header";
import "../index.css";
import { SmsOutlined } from "@material-ui/icons";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      orders: [],
            users: [],
            data:[],
            report:"",
            show:"user"
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

  reportSelector=(event)=>{
    this.setState({show:event.target.value});

  }


  render() {
    const{users, orders}=this.state;
    const userCount = users.filter(user => user.role === 'ROLE_USER').length;
    const adminCount = users.filter(user => user.role === 'ROLE_ADMIN').length;
    const moderatorCount = users.filter(user => user.role === 'ROLE_MODERATOR').length;

    const javaCount = orders.filter(order => order.courses.includes('Java')).length;
    const arCount = orders.filter(order => order.courses.includes('Intro to AR')).length;
    const vrCount = orders.filter(order => order.courses.includes('Intro to VR')).length;
    const jsCount = orders.filter(order => order.courses.includes('JavaScript')).length;
    const gitCount = orders.filter(order => order.courses.includes('Git')).length;
    const angularCount = orders.filter(order => order.courses.includes('Angular')).length;
    const cCount = orders.filter(order => order.courses.includes('C#')).length;
    const nodeCount = orders.filter(order => order.courses.includes('NodeJS')).length;
    const reactCount = orders.filter(order => order.courses.includes('React')).length;
    const reduxCount = orders.filter(order => order.courses.includes('Redux')).length;
    const totalCount = javaCount+arCount+vrCount+jsCount+gitCount+angularCount+cCount+nodeCount+reactCount+reduxCount;
    console.log("I'm java" + javaCount);
      return (
        <div className="grid-container">
            {userCount!==0 && adminCount!==0 && moderatorCount!==0 && <main>
                <div className="content">
                    <div className="main">
                    <div className="filter">
                    <div className="filter-sort">
                    Select report<br></br>  
                    <select onChange={this.reportSelector}>
                        <option value="user">User report</option>
                        <option value="order">Order report</option>
                    </select>
                </div>
                </div>

                    </div>
                    
                </div>
                <div className="content">

                 {this.state.show==="user"&&userCount!==0 && adminCount!==0 && moderatorCount!==0 && <>
                  <CollapsibleTable/>
                   <div className="chart-container">
                       <MyPiechart userCount={userCount} adminCount={adminCount} moderatorCount={moderatorCount}></MyPiechart>
                    </div>
                  </>}

                  {this.state.show==="order"&&<>  
                    <CollapsibleTable2/>
                   <div className="chart-container">
                       <MyPiechart2 javaCount={javaCount} totalCount={totalCount} reactCount={reactCount} reduxCount={reduxCount} nodeCount={nodeCount} cCount={cCount} angularCount={angularCount} gitCount={gitCount} jsCount={jsCount} vrCount={vrCount} arCount={arCount}></MyPiechart2>
                    </div>
                  </>  }

                </div>
                
            </main>}
            <Footer/>
         </div>);

    }
}
