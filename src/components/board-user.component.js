import React, { Component } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import YouTube from "react-youtube";
import "../index.css";
import axios from "../connections";
import authHeader from "../services/auth-header";
import { ChangeEvent } from "react";

import UserService from "../services/user.service";
import Footer from "./footer";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      firstChk: "",
      secondChk: "",
      thirdChk: "",
      videoId: "",
      course: null,
      content: "",
      bought: [],
      allCourses: [],
      roles: localStorage.getItem("roles"),
    };

  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
    
    axios
      .post(
        "orders/my-courses",
        { userId: localStorage.getItem("id") },
        { headers: authHeader() }
      )
      .then((resp) => this.setState({ bought: resp.data, isLoading: false }));

    axios
      .get("courses", { headers: authHeader() })
      .then((resp) => this.setState({ allCourses: resp.data }));
  }

  openModal = (course) => {
    this.setState({
      course,
      firstChk: false,
      secondChk: false,
      thirdChk: false,
    });
  };

  closeModal = () => {
    let progress = this.state.course.progress;

    if (this.state.firstChk === true) progress += 41;
    if (this.state.secondChk === true) progress += 39;
    if (this.state.thirdChk === true) progress += 20;

    const data = {
      userId: localStorage.getItem("id"),
      courseId: this.state.course.id,
      progress: progress,
    };
    console.log(data);
    axios
      .post("orders/save-progress", data, { headers: authHeader() })
      .then(() => {
        this.setState({ course: null });
        window.location.reload();
      });
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  handleChange1 = (event) => {
    console.log(event.target.checked);
    this.setState({ firstChk: event.target.checked });
  };

  handleChange2 = (event) => {
    console.log(event.target.checked);
    this.setState({ secondChk: event.target.checked });
  };

  handleChange3 = (event) => {
    console.log(event.target.checked);
    this.setState({ thirdChk: event.target.checked });
  };

  checkStatusChecked1 = (course) => {
    if (
      course.progress === 100 ||
      course.progress === 80 ||
      course.progress === 41 ||
      course.progress === 61
    )
      return true;
    return false;
  };

  checkStatusChecked2 = (course) => {
    if (
      course.progress === 100 ||
      course.progress === 80 ||
      course.progress === 39 ||
      course.progress === 59
    )
      return true;
    return false;
  };

  checkStatusChecked3 = (course) => {
    if (
      course.progress === 100 ||
      course.progress === 20 ||
      course.progress === 59 ||
      course.progress === 61
    )
      return true;
    return false;
  };

  render() {
    const { bought, course, videoId, allCourses, roles, isLoading } = this.state;
    let myListOfCourses = [];
    const opts = {
      height: "390",
      width: "550",
      playerVars: {
        autoplay: 1,
      },
    };

    if (roles === "ROLE_ADMIN" || roles === "ROLE_MODERATOR")
      myListOfCourses = allCourses;
    else if (bought.length > 0) myListOfCourses = bought;

    return (
      <div>
        <Fade bottom cascade>
          <ul className="myCourses-list">
            {myListOfCourses.length > 0 
            ? (myListOfCourses.map((course) => (<li key={course.id} className="myCourses-list-item">
                  <div className="wrapper">
                    <div className="item pic1 "><img src={course.image} className="rounded img-fluid" alt="Picture"></img></div>
                    <div className="item name1">
                      <a href={"#" + course.id + "/start"} onClick={() => this.openModal(course)} className="text-decoration-none text-info">{course.title}</a>
                    </div>
                    <div className="item teacher1 text-info">
                      <i className="fas fa-chalkboard-teacher"></i>{" "}
                      {course.teacher}
                    </div>
                    <div className="item time1 text-info">
                      <i className="fa fa-clock-o"></i> {course.duration}
                    </div>
                    {!roles.includes("ROLE_ADMIN") &&
                      !roles.includes("ROLE_MODERATOR") && (
                        <div className="item complete1 text-info">
                          {" "}
                          <i className="far fa-check-circle"></i>{" "}
                          {course.progress}% Completed{" "}
                        </div>
                      )}
                  </div>
                </li>
              ))) 
            : (!isLoading && roles !== "ROLE_ADMIN" && roles !== "ROLE_MODERATOR" &&<h1>No courses bought</h1>)}
          </ul>
        </Fade>

        {course && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <button className="close-modal-tutorial" onClick={this.closeModal}>
              x
            </button>
            <div className="row">
              <div className="b-course">
                <img
                  id="title-image"
                  src={course.image}
                  alt={course.title}
                ></img>
                <span className="modal-course-title">
                  <i className="fa fa-file-text"></i>&nbsp;
                  {course.title} with {course.teacher} ({course.duration})
                </span>

                <ul className="section-list">
                  <li className="yt-link">
                    <a
                      className="item"
                      onClick={() =>
                        this.setState({ videoId: course.videoUrls[0] })
                      }
                    >
                      <span
                        className="status-container"
                        aria-label="Completed item"
                      >
                        <span className="status-icon">&nbsp;</span>
                      </span>
                      <div className="title-container">
                        <div className="btn-primary btn-sm float-right">
                          Start
                        </div>
                        <span className="lecture-icon">
                          <i className="fa fa-youtube-play"></i>
                        </span>
                        <span className="lecture-name">Part 1</span>
                      </div>
                    </a>
                  </li>
                  {!roles.includes("ROLE_ADMIN") &&
                    !roles.includes("ROLE_MODERATOR") && (
                      <>
                        {this.checkStatusChecked1(course) ? (
                          <p className="completion-status">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            Completed
                          </p>
                        ) : (
                          <label className="checkbox-inline">
                            <input
                              type="checkbox"
                              onChange={(event) => this.handleChange1(event)}
                            />{" "}
                            Mark as completed
                          </label>
                        )}
                      </>
                    )}

                  <li className="yt-link">
                    <a
                      className="item"
                      onClick={() =>
                        this.setState({ videoId: course.videoUrls[1] })
                      }
                    >
                      <span
                        className="status-container"
                        aria-label="Completed item"
                      >
                        <span className="status-icon">&nbsp;</span>
                      </span>
                      <div className="title-container">
                        <div className="btn-primary btn-sm pull-right">
                          Start
                        </div>
                        <span className="lecture-icon">
                          <i className="fa fa-youtube-play"></i>
                        </span>
                        <span className="lecture-name">Part 2</span>
                      </div>
                    </a>
                  </li>
                  {!roles.includes("ROLE_ADMIN") &&
                    !roles.includes("ROLE_MODERATOR") && (
                      <>
                        {this.checkStatusChecked2(course) ? (
                          <p className="completion-status">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            Completed
                          </p>
                        ) : (
                          <label className="checkbox-inline">
                            <input
                              type="checkbox"
                              onChange={(event) => this.handleChange2(event)}
                            />{" "}
                            Mark as completed
                          </label>
                        )}
                      </>
                    )}

                  <li className="yt-link">
                    <a
                      className="item"
                      onClick={() =>
                        this.setState({ videoId: course.videoUrls[2] })
                      }
                    >
                      <span
                        className="status-container"
                        aria-label="Completed item"
                      >
                        <span className="status-icon">&nbsp;</span>
                      </span>
                      <div className="title-container">
                        <div className="btn-primary btn-sm pull-right">
                          Start
                        </div>
                        <span className="lecture-icon">
                          <i className="fa fa-youtube-play"></i>
                        </span>
                        <span className="lecture-name">Part 3</span>
                      </div>
                    </a>
                  </li>
                  {!roles.includes("ROLE_ADMIN") &&
                    !roles.includes("ROLE_MODERATOR") && (
                      <>
                        {this.checkStatusChecked3(course) ? (
                          <p className="completion-status">
                            <i class="fa fa-check" aria-hidden="true"></i>
                            Completed
                          </p>
                        ) : (
                          <label className="checkbox-inline">
                            <input
                              type="checkbox"
                              onChange={(event) => this.handleChange3(event)}
                            />{" "}
                            Mark as completed
                          </label>
                        )}
                      </>
                    )}

                  <li className="">
                    <a
                      className="item"
                      href="https://github.com/dimitris4/vrnova-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className="status-container"
                        aria-label="Completed item"
                      >
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
              <div className="video-box">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  onReady={this._onReady}
                />
              </div>
            </div>
          </Modal>
        )}
             <Footer/>
      </div>
    );
  }
}
