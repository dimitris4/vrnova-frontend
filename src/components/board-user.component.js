

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
      course:null,
      content: "",
      bought:[],
      // bought: JSON.parse(localStorage.getItem('bought'))? JSON.parse(localStorage.getItem('bought')):[],
    };
    
    axios.post(API_URL +'orders/my-courses', {userId:localStorage.getItem('id')}, { headers: authHeader()}).then(resp => this.setState({bought: resp.data}));
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
    axios.post(API_URL +'orders/my-courses', {userId:localStorage.getItem('id')}, { headers: authHeader()}).then(resp =>{this.setState({bought: resp.data});
  });
  }

  openModal = (course) => this.setState({course});

  closeModal= () => this.setState({course:null});
  

  render() {
    const { user : currentUser } = this.props;
    const{bought, course} = this.state;
    return (
      <div>
         <Fade bottom cascade>
                        <ul className="myCourses-list">
                            {bought.length>0 ? bought.map(course =>(
                                <li key={course.id} className="myCourses-list-item">
                                   <div className="wrapper">
                                     <div className="item pic1 "><img src={course.image} className="rounded img-fluid" alt="Picture" ></img></div>
                                     <div className="item name1"><a href={"#"+course.id+"/start"} onClick={()=>this.openModal(course)} className="text-decoration-none text-info">{course.title}</a></div>
                                     <div className="item teacher1 text-info"><i className="fas fa-chalkboard-teacher"></i> {course.teacher}</div>
                                     <div className="item time1 text-info"><i className="fa fa-clock-o"></i> {course.duration}</div>
                                     <div className="item complete1 text-info"> <i className="far fa-check-circle"></i> {course.progress}% Completed </div>
                                  </div>
                                </li>
                            )):<h1>No courses bought</h1>}
                        </ul>
         </Fade>

{course && <Modal isOpen={true} onRequestClose={this.closeModal} >
    <Zoom>
    <button className="close-modal" onClick={this.closeModal}>x</button>
        <div className="row">
            <div className="course">
            <img id="title-image" src={course.image} alt={course.title}></img>
                <span className="modal-course-title">
                 <i className="fa fa-file-text"></i>&nbsp;
                 {course.title}{' '}with{' '}{course.teacher}{' '}({course.duration})
               </span>

    
    <ul className="section-list">
      
      <li className="" >
        <a className="item">
          <span className="status-container" aria-label="Completed item">
            <span className="status-icon">&nbsp;</span>
          </span>
          <div className="title-container">
            <div className="btn-primary btn-sm float-right">
              Start
            </div>
          <span className="lecture-icon">
          <i className="fa fa-youtube-play"></i>
            </span>
            <span className="lecture-name">Part 1(2:00)</span>
          </div>
        </a>
      </li>
      
      <li className="" >
        <a className="item"  href="">
          <span className="status-container" aria-label="Completed item">
            <span className="status-icon">&nbsp;</span>
          </span>
          <div className="title-container">
            <div className="btn-primary btn-sm pull-right">
              Start
            </div>
          <span className="lecture-icon">
          <i className="fa fa-youtube-play"></i>
            </span>
            <span className="lecture-name">Part 2(2:00)</span>
          </div>
        </a>
      </li>

      <li className="" >
        <a className="item"  href="">
          <span className="status-container" aria-label="Completed item">
            <span className="status-icon">&nbsp;</span>
          </span>
          <div className="title-container">
            <div className="btn-primary btn-sm pull-right">
              Start
            </div>
          <span className="lecture-icon">
          <i className="fa fa-youtube-play"></i>
            </span>
            <span className="lecture-name">Part 3(1:30)</span>
          </div>
        </a>
      </li>
      
      <li className="" >
        <a className="item"  href="">
          <span className="status-container" aria-label="Completed item">
            <span className="status-icon">&nbsp;</span>
          </span>
          <div className="title-container">
            <div className="btn-primary btn-sm pull-right">
              Open
            </div>
          <span className="lecture-icon">
          <i className="fa fa-file-text"></i>
            </span>
            <span className="lecture-name">Source code</span>
          </div>
        </a>
      </li>
      
    </ul>
  </div>
</div>
                        {/* <button className="close-modal" onClick={this.closeModal}>x</button>
                        <div className="course-details">
                            <img src={course.image} alt={course.title}></img>
                            <div className="course-details-description">
                                <p className="modal-course-title">
                                    <strong>{course.title}</strong>
                                </p>      
                                <p>
                                    Category:{" "}
                                    {course.categoryNames.map((x)=>(
                                        <span>
                                            {" "}
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <p>
                                    Your teacher:{" "}
                                    {course.teacher}
                                </p>
                                <div className="course-price">
                                    <div>
                                        {formatCurrency(course.price)}
                                    </div>
                          
                                        </div>
                            </div>
                        </div> */}
                    </Zoom>
                </Modal>}


        <Footer/>

        </div>
    );
    
  }
}
