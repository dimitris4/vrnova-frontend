import React, { Component } from 'react';
import formatCurrency from '../utils';
import Fade from "react-reveal/Fade";
import PaymentForm from "./payment-form";

export default class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {showCheckout:false}
    }


    render() {
        const{cartItems}=this.props;
        return (
            
            <div>
                {cartItems.length===0 ? (
                    <div className="cart cart-header">Cart is empty</div>
                ) : (
                <div className="cart cart-header">
                    You have {cartItems.length} courses in the cart{" "}
                </div>
                )}
                <div>
                <div className="cart">
                    <Fade left cascade>
                    <ul className="cart-items">
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)}{" "}
                                        <button className="button" onClick={()=>this.props.removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </Fade>
                </div>
                {cartItems.length!==0 && (
                    <div>
                    <div className="cart">
                    <div className="total">
                        <div>
                            Total:{" "}
                            {formatCurrency(cartItems.reduce((a,c) => a + c.price*c.count,0))}
                        </div>
                        <button onClick={()=>this.setState({showCheckout:true})} className="button primary">Proceed</button>        
                    </div>
                </div>
                    {this.state.showCheckout && (<PaymentForm/>)}
                </div>
                )}
             </div>
        </div>
        );
    }
}
