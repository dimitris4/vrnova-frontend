import React, { Component } from 'react';

export default class Footer extends Component {

    styles =
    {
        color : 'gray',
        fontSize: '12px',
        backgroundColor:'black',
        padding:0,
        image: {
            width: '5%',
            height: '5%',
        },
        list: {
            width: '20%'
        }
        

    } 

    render() { 
        return (
           
                <nav className="navbar navbar-expand-sm container-fluid text-center myFooter" style={this.styles} >
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-1" ><img src="./email.jpg" style={this.styles.image}></img>vrnova@vrnova.dk</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-1" ><img src="./phone.png" style={this.styles.image}></img> +45 50227000</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-1" > CVR: 37874620</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-1" ><img src="./address.png" style={this.styles.image}></img> Store Mølle Vej 2, 2300 Copenhagen</li>
                        <li style={this.styles.list} className="list-inline-item footer-copyright text-center py-1" >© 2020 Copyright:
                            <a className="social-icon text-xs-center" target="_blank" href="https://vrnova.dk/"> vrnova.dk</a>
                        </li>
                </nav>
      
                );
    }
}
