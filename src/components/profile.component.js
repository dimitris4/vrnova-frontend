import React, { Component, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import axios from "axios";
import authHeader from "../services/auth-header";
import { logout } from "../actions/auth";
import "../App.css";
import Footer from "./footer";

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
    this.logOut = this.logOut.bind(this);
    this.state = { email : null, password : null,  errors : { email: '', password : '', } };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info('Valid form')
      alert("Your changes have been saved. Log out and log in again to view them.");
      const data = {userId: this.props.user.id, email : this.email.value, password : this.password.value };
      return axios.put(API_URL + "profile/update", data, { headers: authHeader() } )
    } else {
      console.error('Invalid form')
    }
  }

  logOut(){
    this.props.dispatch(logout());
  }

  handleDeactivation = event => {
      event.preventDefault();
      if(window.confirm('Are you sure you want to deactivate your account? \n WARNING: Your account will be deleted and you will be logged out!')){
          axios.put(API_URL + "profile/deactivate", {userId: this.props.user.id}, { headers: authHeader() } );
          this.logOut();
      }    
  }

  showDeactivate(user) {
    if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_MODERATOR') ) {
      return <div class="tab-content py-4">
              <div class="tab-pane active" id="profile">
                <h5 style={{fontWeight: 'bold', fontSize:"80%"}} class="mb-3">By clicking deactivate your profile will be deleted.</h5>
                <div class="row">
                  <div class="col-md-6">
                  
                     <button type="button" class="btn btn-danger" style={{fontWeight: 'bold', fontSize:"80%"}} onClick={this.handleDeactivation}>Deactivate</button>
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
      <div className='main-container'>
      <div className="container">
      <div className="row my-2">
        <div className="col-lg-8 order-lg-2"></div>
      <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
        <Tab label={"PROFILE"}>
          <div className="tab-content py-2">
            <div className="tab-pane active" id="profile">
                <div className="row">
                    <div className="col-md-6">
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>USERNAME</h6>
                        <p style={{fontSize:"80%"}}>{currentUser.username}</p>
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>E-MAIL</h6>
                          <p style={{fontSize:"80%"}}>{currentUser.email}</p>
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>COURSES PURCHASED</h6>
                          <p style={{fontSize:"80%"}}>2</p>
                    </div>
              </div>
            </div>
          </div>
                    
        </Tab>

        <Tab label="UPDATE">
          <div className="tab-content py-2">
            <div className="tab-pane active" id="profile">
              <div className="wrap">
                <h8 style={{fontWeight: 'bold', fontSize:"80%"}}>Update your email address or password.</h8>
                <form onSubmit={this.handleSubmit} noValidate >
                  <div>
                    <label for="email" style={{fontWeight: 'bold', fontSize:"80%"}}> E-MAIL</label>
                      <input style={{fontSize:"80%"}}
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
                    <label for="password" style={{fontWeight: 'bold', fontSize:"80%"}}> PASSWORD</label>
                      <input style={{fontSize:"80%"}}
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
                    <input type="submit" value="SAVE" style={{fontWeight: 'bold', fontSize:"80%"}} />
                  </div> 
                </form>
              </div>
            </div>
          </div>
        </Tab>

        <Tab label="DEACTIVATE">{this.showDeactivate(currentUser)}</Tab> 

        </Tabs>
      </div>
      
    </div>   
    <Footer/>
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
