import React, { Component } from "react";
import Particles, { HoverMode } from 'react-particles-js'; 
import Footer from "./footer";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      started: false
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




imagesPath = {
  on: "./pc-on.png",
  off: "./pc-off.png"
}

  
  changeImage = () => {
    this.setState(state => ({ started: !state.started }))
  }

  getImageName = () => this.state.started ? 'on' : 'off';

render() { 
  const imageName = this.getImageName();
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
      <img id="learning-pc" src={this.imagesPath[imageName]} onClick={this.changeImage}></img>
        <div className="title" >
            <div className="line_1">      
                     <div className="letter letter-0">L</div>  
                     <div className="letter letter-1">E</div>
                     <div className="letter letter-2">A</div>
                     <div className="letter letter-3">R</div> 
                     <div className="letter letter-4">N</div>  	
                     <div className="letter letter-5"> </div>
                     <div className="letter letter-6">W</div>
                     <div className="letter letter-7">I</div>
                     <div className="letter letter-8">T</div>
                     <div className="letter letter-9">H</div>
            </div>
                
            <div className="line_2"> 
                     <div className="letter letter-8">V</div>
                     <div className="letter letter-9">R</div>
                     <div className="letter letter-10">N</div>
                     <div className="letter letter-11">O</div>
                     <div className="letter letter-12">V</div>
                     <div className="letter letter-13">A</div>
            </div>
        </div>
        <Footer />
        
  </div> 

  ); 
} }