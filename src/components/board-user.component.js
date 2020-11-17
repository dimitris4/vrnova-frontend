import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
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
  
  showCourses(user) {
    console.log(user);
    // if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_MODERATOR')) {
      return <div class="col-md-12">
              <h5 class="mt-2"><span class="fa fa-clock-o ion-clock float-right"></span> My Courses</h5>
              <table class="table table-sm table-hover table-striped">
                <tbody>                                    
                  <tr>
                    <td>
                      <strong>VR for Beginners (Instructor: Anastasia Andreasen)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Photoshop for Advanced Learners (Instructor: Anastasia Andreasen)</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>; 
    // }
  }

  render() {
    const { user : currentUser } = this.props;
    return (
        this.showCourses(currentUser)
        // <h3>{this.state.content}</h3>
    );
  }
}
