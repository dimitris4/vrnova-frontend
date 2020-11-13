import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header>
      // </div>

         <div class="intro"> 
         	 <div class="title">
                <div class="line_1">      
                    <div class="letter letter-0">L</div>  
                    <div class="letter letter-1">E</div>
                    <div class="letter letter-2">A</div>
                    <div class="letter letter-3">R</div> 
                    <div class="letter letter-4">N</div>  	
                    <div class="letter letter-5"> </div>
                    <div class="letter letter-6">A</div>
                    <div class="letter letter-7">T</div>
                </div>
                
                <div class="line_2"> 
                    <div class="letter letter-8">V</div>
                    <div class="letter letter-9">R</div>
                    <div class="letter letter-10">N</div>
                    <div class="letter letter-11">O</div>
                    <div class="letter letter-12">V</div>
                    <div class="letter letter-13">A</div>
                </div>
                </div>
                </div>
    );
  }
}
