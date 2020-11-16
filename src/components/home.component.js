import React, { Component } from "react";
import Particles, { HoverMode } from 'react-particles-js'; 
import Footer from "./footer";
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
    <div className="intro container-fluid" id="particle-canvas"> 
        <Particles 
        params={{
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#000000"
            },
            "shape": {
              "type": "circle",
              // "type": "images",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                // "src": "1.png",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "value": 1,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#000000",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 3.206824121731046,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }
    
        }
      /> 
        <div class="title" >
            <div class="line_1">      
                     <div class="letter letter-0">L</div>  
                     <div class="letter letter-1">E</div>
                     <div class="letter letter-2">A</div>
                     <div class="letter letter-3">R</div> 
                     <div class="letter letter-4">N</div>  	
                     <div class="letter letter-5"> </div>
                     <div class="letter letter-6">W</div>
                     <div class="letter letter-7">I</div>
                     <div class="letter letter-8">T</div>
                     <div class="letter letter-9">H</div>
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
        <Footer />
        
  </div> 

  ); 
} }