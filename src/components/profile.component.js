import React, { Component, useState} from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {Tabs, Tab} from 'react-bootstrap-tabs';
import axios from "../connections";
import authHeader from "../services/auth-header";
import { logout } from "../actions/auth";
import "../App.css";
import Footer from "./footer";
import BootBox from 'react-bootbox';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


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
    this.state = { bought:[], password : null, password2 : null, showDeactivateDialog: false, showUpdateDialog: false,  errors : { password: '', password2 : ''} };

    axios.post("orders/my-courses",{ userId: localStorage.getItem("id") },{ headers: authHeader() }).then((resp) => this.setState({ bought: resp.data }));

  }



  showAlert = () => {
    alert('Yes is clicked');
  }

  handleClose = () => {
    this.setState({showDeactivateDialog:false});
    this.setState({showUpdateDialog:false});
  }

  logOut(){
    this.props.dispatch(logout());
  }

  handleSubmit = event => {
    if(event) event.preventDefault();
    if (!this.password2.value) {
      this.state.errors.password2 = 'Required'
      alert("Required field!")
    }
    if (validateForm(this.state.errors)) {
      console.info('Valid form');
      const data = {userId: this.props.user.id, password : this.password.value };
      axios.put("profile/update", data, { headers: authHeader() } );
      return this.setState({showUpdateDialog:true});

    } else {
      console.error('Invalid form')
    }
  }

  handleDeactivation=event=>{
      if(event) event.preventDefault();
      axios.put("profile/deactivate", {userId: this.props.user.id}, { headers: authHeader() } ).then(()=>{
        this.logOut();  
        window.location.reload();
      });
          
  }


  showDeactivate(user) {
    if (!user.roles.includes('ROLE_ADMIN') && !user.roles.includes('ROLE_MODERATOR') ) {
      return <div className="tab-content py-4">
              <div className="tab-pane active" id="profile">
                <h5 style={{fontWeight: 'bold', fontSize:"80%"}} className="mb-3">By clicking deactivate your profile will be deleted.</h5>
                <div className="row">
                  <div className="col-md-6">
                     <button type="button" className="btn btn-danger" style={{fontWeight: 'bold', fontSize:"80%"}} onClick={()=>{this.setState({showDeactivateDialog:true})}}>Deactivate</button>
                     <BootBox show={this.state.showDeactivateDialog} 
                        message="Are you sure you want to deactivate your account?
                          WARNING: Your account will be deleted and you will be logged out!"
                        onYesClick = {this.handleDeactivation}
                        onNoClick = {this.handleClose}
                        onClose = {this.handleClose}
                    />
                     
                  </div>
                </div>
                </div>
              </div>;
    } else {
      return <h6 style={{"margin-top": 20}}>Admins and Moderators are not allowed to deactivate their profiles.</h6>
    }
  }

  validatePassword(x) {
    return x.length > 5 && x === this.password.value;
  }

  handleChange = (event) => {
    event.preventDefault();
    // destructuring
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'password':
        errors.password = 
            value.length > 5
            ? ''
            : 'Password must be at least 6 characters long!';
        break;
      case 'password2':
        errors.password2 = 
          this.validatePassword(value)
          ? ''
          : 'Password must be the same!';
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
    } else {
      localStorage.setItem("id", currentUser.id);
      localStorage.setItem("roles", currentUser.roles);
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
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>USERNAME:
                              <p style={{fontSize:'90%', fontWeight:'normal'}}>{currentUser.username}</p>
                        </h6>
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>E-MAIL:
                             <p style={{fontSize:'90%', fontWeight:'normal'}}>{currentUser.email}</p>
                        </h6>
                        {!currentUser.roles.includes('ROLE_ADMIN') && !currentUser.roles.includes('ROLE_MODERATOR')&&
                        <h6 style={{fontWeight: 'bold', fontSize:"80%"}}>COURSES PURCHASED:
                             <p style={{fontSize:'90%', fontWeight:'normal'}}>{this.state.bought.length}</p>
                        </h6>}
                    </div>
              </div>
            </div>
          </div>
                    
        </Tab>

        <Tab label="UPDATE PASSWORD">
          <div className="tab-content py-2">
            <div className="tab-pane active" id="profile">
              <div className="wrap">
                <h8 style={{fontWeight: 'bold', fontSize:"80%"}}>Change your password.</h8>
                <form onSubmit={this.handleSubmit} noValidate >
                <Alert show={this.state.showUpdateDialog} variant="success" style={{height: "30%", width: "70%", fontSize:"80%"}}>
                  <Alert.Heading style={{fontSize:"80%", fontWeight: 'bold'}}>Password changed successfully!</Alert.Heading>
                       <p>
                        We have sent a confirmation to your e-mail address.
                      </p>
                      <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={() => this.setState({showUpdateDialog:false})} variant="outline-success" style={{height: "30%", width: "30%", fontWeight: 'bold', fontSize:"80%"}}>CLOSE</Button>
                        </div>
                </Alert>
                  <div>
                    <label for="email" style={{fontWeight: 'bold', fontSize:"80%"}}> NEW PASSWORD</label>
                      <input style={{fontSize:"80%"}}
                        type="password"
                        id="password" 
                        name="password" 
                        className="cool"
                        // defaultValue={currentUser.email} 
                        onChange={this.handleChange}
                        ref={ (input) => this.password = input }
                        noValidate />  
                        {errors.password.length > 0 && 
                        <span className='error'>{errors.password}</span>}                  
                  </div>
                  <div>
                    <label for="password2" style={{fontWeight: 'bold', fontSize:"80%"}}> RE-ENTER NEW PASSWORD</label>
                      <input style={{fontSize:"80%"}}
                        type="password"
                        id="password2"
                        className="cool" 
                        name="password2" 
                        // defaultValue={this.state.user.password}
                        onChange={this.handleChange}
                        ref={ (input) => this.password2 = input }
                        noValidate />   
                        {errors.password2.length > 0 && 
                        <span className='error'>{errors.password2}</span>}   
                  </div>
                  <div>
                    <input type="submit" value="SAVE" className="btn btn-primary" style={{fontWeight: 'bold', fontSize:"80%"}}style={{fontWeight: 'bold', fontSize:"80%", marginTop: 10, marginLeft:43}} />
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
