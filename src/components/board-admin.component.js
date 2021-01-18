import React, { Component } from "react";
import CollapsibleTable from "./report-table";
import CollapsibleTable2 from "./report-table2";
import UserService from "../services/user.service";
import MyPiechart from "./piechart";
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
    const nodeCount = orders.filter(order => order.courses.includes('Node JS')).length;
    const reactCount = orders.filter(order => order.courses.includes('React')).length;
    const reduxCount = orders.filter(order => order.courses.includes('Redux')).length;
    const totalCount = javaCount+arCount+vrCount+jsCount+gitCount+angularCount+cCount+nodeCount+reactCount+reduxCount;
    console.log(totalCount);
    
    const userPie = [{
      color: "#E38627",
      title: "Users (" + Math.round((userCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
      value: userCount
      },
      {
      color: "#C13C37",
      title: "Moderators (" + Math.round((moderatorCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
      value: moderatorCount
      },
      {
      color: "#6A2135",
      title: "Admins (" + Math.round((adminCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
      value: adminCount
      }];

      const orderPie = [{
        color: "#4D4D4D",
        title: arCount!==0?"AR (" + Math.round((arCount*1000)/totalCount)/10+"%)":"",
        value: arCount
        },
        {
        color: "#5DA5DA",
        title: vrCount!==0?"VR (" + Math.round((vrCount*1000)/totalCount)/10+"%)":"",
        value: vrCount
        },
        {
        color: "#FAA43A",
        title: angularCount!==0?"Angular (" + Math.round((angularCount*1000)/totalCount)/10+"%)":"",
        value: angularCount
        },
        {
        color: "#60BD68",
        title: javaCount!==0?"Java (" + Math.round((javaCount*1000)/totalCount)/10+"%)":"",
        value: javaCount
        },
        {
        color: "#F17CB0",
        title: gitCount!==0?"Git (" + Math.round((gitCount*1000)/totalCount)/10+"%)":"",
        value: gitCount
        },
        {
        color: "#B2912F",
        title: jsCount!==0?"JavaScript (" + Math.round((jsCount*1000)/totalCount)/10+"%)":"",
        value: jsCount
        },
        {
        color: "#B276B2",
        title: cCount!==0?"C# (" + Math.round((cCount*1000)/totalCount)/10+"%)":"",
        value: cCount
        },
        {
        color: "#DECF3F",
        title: nodeCount!==0?"NodeJS (" + Math.round((nodeCount*1000)/totalCount)/10+"%)":"",
        value: nodeCount
        },
        {
        color: "#F15854",
        title: reactCount!==0?"React (" + Math.round((reactCount*1000)/totalCount)/10+"%)":"",
        value: reactCount
        },
        {
        color: "#60BD68",
        title: reduxCount!==0?"Redux (" + Math.round((reduxCount*1000)/totalCount)/10+"%)":"",
        value: reduxCount
        }
    ];

      return (
        <div className="grid-container">
            {userCount!==0 && adminCount!==0 && moderatorCount!==0 && <main>
                <div className="content">
                    <div className="main">
                    <div className="filter">
                    <div className="report-selector">
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

                 {this.state.show==="user"&&userPie.length!==0 && <>                 
                  <CollapsibleTable/>
                   <div className="chart-container">
                   <h3 className="pie-title-users">PERCENTAGE OF SYSTEM USERS</h3>
                       <MyPiechart count={userPie}></MyPiechart>
                    </div>
                  </>}

                  {this.state.show==="order"&&orderPie.length!==0&&<>  
                    <CollapsibleTable2/>
                   <div className="chart-container">
                   <h3 className="pie-title-orders">PERCENTAGE OF COURSES SOLD</h3>
                       <MyPiechart count={orderPie}></MyPiechart>
                          <h3 className="pie-subtitles">COURSES SOLD:{" "+totalCount}</h3>                    
                    </div>
                  </>  }

                </div>
                
            </main>}
            <Footer/>
         </div>);

    }
}
