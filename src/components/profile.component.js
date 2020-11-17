import React, { Component, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/";

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { email : null, password : null,  errors : { email: '', password : '', } };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid form')
      alert("Your changes have been saved. Log out and log in again to view them.")
      const data = {userId: this.props.user.id, email : this.email.value, password : this.password.value };
      return axios.put(API_URL + "profile/update", data, { headers: authHeader() } )
    } else {
      console.error('Invalid form')
    }
  }

  showCourses(user) {
    if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_MODERATOR') ) {
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
    }
  }

  showDeactivate(user) {
    if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_MODERATOR') ) {
      return <div class="tab-content py-4">
              <div class="tab-pane active" id="profile">
                <h5 class="mb-3">By clicking deactivate your profile will be deleted.</h5>
                <div class="row">
                  <div class="col-md-6">
                  
                     <button type="button" class="btn btn-danger" style={{"margin-top": 10}}>Deactivate</button>
                  </div>
                </div>
                </div>
              </div>;
    } else {
      return <h6 style={{"margin-top": 20}}>Admins and Moderators are not allowed to deactivate their profiles.</h6>
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    // destructuring
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'email':
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password = 
          value.length < 6
          ? 'Password must be 6 characters long!'
          : '';
        break;
      default:
        break;
    }

    this.setState( { errors, [name]: value } );
  }

  render() {
    const { user : currentUser } = this.props;
    
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    const {errors} = this.state;

    return (

      <div class="container">
      <div class="row my-2">
        <div class="col-lg-8 order-lg-2"></div>
      <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
        <Tab label={"Profile"}>
          <div class="tab-content py-4">
            <div class="tab-pane active" id="profile">
                <h5 class="mb-3">User Profile</h5>
                <div class="row">
                    <div class="col-md-6">
                        <h6>Username</h6>
                          <p>{currentUser.username}</p>
                        <h6>Email</h6>
                          <p>{currentUser.email}</p>
                    </div>
                    {this.showCourses(currentUser)}
              </div>
            </div>
          </div>
                    
        </Tab>

        <Tab label="Update">
          <div className="tab-content py-4">
            <div className="tab-pane active" id="profile">
              <div className="wrap">
                <h5>Update your email address or password.</h5>
                <form onSubmit={this.handleSubmit} noValidate >
                  <div>
                    <label for="email"> Email</label>
                      <input 
                        type="text"
                        id="email" 
                        name="email" 
                        className="cool"
                        defaultValue={currentUser.email} 
                        onChange={this.handleChange}
                        ref={ (input) => this.email = input }
                        noValidate />  
                        {errors.email.length > 0 && 
                        <span className='error'>{errors.email}</span>}                  
                  </div>
                  <div>
                    <label for="password"> Password</label>
                      <input 
                        type="password"
                        id="password"
                        className="cool" 
                        name="password" 
                        // defaultValue={this.state.user.password}
                        onChange={this.handleChange}
                        ref={ (input) => this.password = input }
                        noValidate />   
                        {errors.password.length > 0 && 
                        <span className='error'>{errors.password}</span>}   
                  </div>
                  <div>
                    <input type="submit" value="Save" />
                  </div> 
                </form>
              </div>
            </div>
          </div>
        </Tab>

        <Tab label="Deactivate">{this.showDeactivate(currentUser)}</Tab> 

        </Tabs>
      </div>
    </div>    
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
