import React, { Component, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';


class Profile extends Component {



  
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
    const { user: currentUser } = this.props;

    if (!currentUser) {
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
          <div class="tab-content py-4">
            <div class="tab-pane active" id="profile">
              <h5 class="mb-3">Update</h5>
                <form>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">First name</label>
                      <div class="col-md-8">
                          <input class="form-control" type="text" value="Jane"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Last name</label>
                      <div class="col-md-8">
                          <input class="form-control" type="text" value="Bishop"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Email</label>
                      <div class="col-md-8">
                          <input class="form-control" type="email" value="email@gmail.com"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Address</label>
                      <div class="col-md-8">
                          <input class="form-control" type="text" placeholder="Street"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Username</label>
                      <div class="col-md-8">
                          <input class="form-control" type="text" value="janeuser"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Password</label>
                      <div class="col-md-8">
                          <input class="form-control" type="password" value="11111122333"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                      <label class="col-md-4 col-form-label form-control-label">Confirm password</label>
                      <div class="col-md-8">
                          <input class="form-control" type="password" value="11111122333"></input>
                      </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-4 col-form-label form-control-label"></label>
                    <div class="col-md-8">
                        <input type="reset" class="btn btn-secondary" value="Cancel"></input>
                        <input type="button" class="btn btn-primary" value="Save Changes" style={{"margin-left": 10}}></input>
                    </div>
                  </div>
                </form>
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
