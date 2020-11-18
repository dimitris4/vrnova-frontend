import React, { Component } from 'react';

export default class Footer extends Component {

    styles =
    {
        color : 'silver',
        backgroundColor:'black', 
        padding:0,
        image: {
            width: '25px',
            height: '25px'
        },
        list: {
            padding: '0px 30px'
        }
        

    } 

    render() { 
        return (
           
                <nav className="navbar navbar-expand-sm container-fluid myFooter" style={this.styles} >
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-3" ><img src="./email.jpg" style={this.styles.image}></img>vrnova@vrnova.dk</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-3" ><img src="./phone.png" style={this.styles.image}></img> +45 50227000</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-3" > CVR: 37874620</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-3" ><img src="./address.png" style={this.styles.image}></img> Store Mølle Vej 2, 2300 Copenhagen</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-3" >© 2020 Copyright:
                            <a className="social-icon text-xs-center" style={{width: '50%'}} target="_blank" href="https://vrnova.dk/"> vrnova.dk</a>
                        </li>
                </nav>
      
                );
    }
}