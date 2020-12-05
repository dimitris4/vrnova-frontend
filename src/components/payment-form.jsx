import React,{Component} from "react";
import { Redirect } from 'react-router-dom';
import Card from "react-credit-cards";
import "../cards.css";
import "react-credit-cards/es/styles-compiled.css";
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import axios from "../connections";
import authHeader from "../services/auth-header";
// import SupportedCards from "./cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "../utils";


export default class PaymentForm extends Component {

  constructor(props) {
    super(props);
  this.state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
    isPaid: false
  };
}

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {}); 

    this.setState({ isPaid:true});
    this.setState({ formData});
    this.form.reset();
  };

 closeModal=()=>{
  const data = {userId: this.props.user.id, items : this.props.items };
 
  //sending data to backend
  axios.post("orders/save", data, { headers: authHeader() } ).then(()=>{localStorage.setItem("cartItems", null); window.location.reload();});

 };

  render() {
    const { redirect, name, number, expiry, cvc, focused, issuer, formData, isPaid } = this.state;
  const {items, user }= this.props;


    return (
      <div>
        <Fade right cascade>
      <div key="Payment">
                           
        <div className="App-payment">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions">
              <button className="btn-submit">Submit</button>
            </div>
          </form>
          {/* {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )} */}
          {/* <SupportedCards/> */}
        </div>
      </div>
      </Fade>
      {isPaid && <Modal className={"pay-conf-modal"} isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                      <div className="bg">
                        <div className="card1">
                          <h1 className="card__msg">Payment Complete</h1>
                           <h2 className="card__submsg">Thank you for your transfer</h2>
                               <div className="card__body">
                                  <img src="./logo1_transparent.png" className="card__avatar"/>
                                   <div className="card__recipient-info">
                                 <p className="card__recipient">{this.state.name}</p>
                                         <p className="card__email">{user.email}</p>
                                  </div>
                                  <h1 className="card__price">{formatCurrency(items.reduce((a,c) => a + c.price*c.count,0))}</h1>
                                  <p className="card__method">Payment method</p>
                                  <div className="card__payment">
                                      <img src="./credit.png" className="card__credit-card"/>
                                      <div className="card__card-details">
                                        <p className="card__card-type">Credit / debit card</p>
                                        <p className="card__card-number">Card ending in **{this.state.number.slice(-2)}</p>          
                                  </div>
                              </div>
                          </div>
                          <div className="card__tags">
                              <span className="card__tag">completed</span>
                              <span className="card__tag">#123456789</span>        
                          </div>
                              <span>{" "}<button className="button" onClick={this.closeModal}>Close</button></span>
                         </div>
                      </div>
                    </Zoom>
                </Modal>}
      </div>
    );
  }
}
