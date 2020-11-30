

    // <link rel="stylesheet" href="styles.css">
    // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    // <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    // <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    // <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>



    import React, { Component } from 'react';
    import formatCurrency from "../utils";
    import Fade from "react-reveal/Fade";
    import Modal from "react-modal";
    import Zoom from "react-reveal/Zoom";
    import "../index.css";
    import axios from "axios";
import authHeader from "../services/auth-header";



import UserService from "../services/user.service";
import Footer from "./footer";
const API_URL = "http://localhost:8080/";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      bought: JSON.parse(localStorage.getItem('bought'))? JSON.parse(localStorage.getItem('bought')):[],
    };
  }

  

  componentDidMount() {
    UserService.getUserBoard().then(
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
    const { user : currentUser } = this.props;
    const{bought} = this.state;
    return (
      <div>
         <Fade bottom cascade>
                        <ul className="myCourses-list">
                            {bought.map(course =>(
                                <li key={course.id} className="myCourses-list-item">
                                   <div class="wrapper">
                                     <div class="item pic1 "><img src={course.image} class="rounded img-fluid" alt="Picture" ></img></div>
                                     <div class="item name1"><a href="https://google.com" class="text-decoration-none text-info">{course.title}</a></div>
                                     <div class="item teacher1 text-info"><i class="fas fa-chalkboard-teacher"></i> {course.teacher}</div>
                                     <div class="item time1 text-info"><i class="fa fa-clock-o"></i> 2:30:00</div>
                                     <div class="item complete1 text-info"> <i class="far fa-check-circle"></i> 0% Completed </div>
                                  </div>
                                </li>
                            ))}
                        </ul>
         </Fade>


    {/* <div>
        <ul class="pagination justify-content-end" style={{margin:'20px'}}>
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </div> */}


        <Footer/>

        </div>
    );
    
  }
}
