import React, { Component, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import axios from "axios";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8080/";

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { firstName : this.props.user.firstName, lastName : this.props.user.lastName, address : this.props.user.username };
    this.setState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name] : target.value });
  }

  handleSubmit() {
    const data = {userId: this.props.user.id, firstName: "asd", lastName: this.props.lastName, address: this.props.address} 
    this.setState();
    return axios.put(API_URL + "profile/update", data, { headers: authHeader() } )
  };

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

  render() {
    const { user } = this.props;

    if (!user) {
      return <Redirect to="/login" />;
    }

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
                          <p>{user.username}</p>
                        <h6>Email</h6>
                          <p>{user.email}</p>
                    </div>
                    {this.showCourses(user)}
              </div>
            </div>
          </div>
                    
        </Tab>

        <Tab label="Update">
          <div class="tab-content py-4">
            <div class="tab-pane active" id="profile">
              <h5 class="mb-3">Update</h5>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group row">
                    <label class="col-md-4 col-form-label form-control-label"> First Name:
                      <div class="col-md-8">
                        <input 
                          type="text" 
                          name="firstName" 
                          value={this.state.firstName} 
                          onChange={this.handleChange} 
                          
                        />
                      </div>
                    </label>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-4 col-form-label form-control-label"> Last Name:
                      <div class="col-md-8">
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}  />
                      </div>
                    </label>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-4 col-form-label form-control-label"> Address:
                      <div class="col-md-8">
                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange}  />
                      </div>
                    </label>
                  </div>
                  <input type="submit" value="Submit" />
                </form>
            </div>
          </div>
        </Tab>

        <Tab label="Deactivate">{this.showDeactivate(user)}</Tab> 

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
