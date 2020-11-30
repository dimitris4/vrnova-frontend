import React, { Component } from 'react';
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import "../index.css";

export default class CourseList extends Component {

    constructor(props){
        super(props);
        this.state = {
            course: null,
            bought: JSON.parse(localStorage.getItem('bought'))? JSON.parse(localStorage.getItem('bought')):[],
            cartItems: JSON.parse(localStorage.getItem('cartItems'))? JSON.parse(localStorage.getItem('cartItems')):[],
            disabled: [],
            label: ''
        };
     }

    
     openModal = (course) => this.setState({course});

     closeModal= () => this.setState({course:null});
     
     text =(id)=> this.state.disabled.indexOf(id)!==-1 ? "In cart": "Add to cart"; 

     styling =(id)=> this.state.disabled.indexOf(id)!==-1 
        ? "in-cart-course"
        : "add-button"; 
          


    render() {
        const{course, bought, cartItems, disabled, label}=this.state;
        return (
            <div>
                <Fade bottom cascade>
                        <ul className="courses">
                            {this.props.courses.map(course =>(
                                <li key={course.id}>
                                    <div className="course">
                                        <a href={"#"+course.id} onClick={()=>this.openModal(course)}>
                                            <img src={course.image} alt="course image"></img>
                                            <p>{course.title}</p>
                                        </a>
                                        <div className="course-price">
                                            <div id="price-of-course">{formatCurrency(course.price)}</div>
                                            {bought.some(e => e.id === course.id)
                                                ?   <button className="button primary" disabled={true} id="bought-course">Bought</button>
                                                :   <>{cartItems.some(e => e.id === course.id)
                                                        ? <button className="button primary" disabled={true} id="in-cart-course">In cart</button> 
                                                : <button id={this.styling(course.id)} onClick={()=>{this.props.addToCart(course); this.text(course.id); this.setState({disabled:[...disabled, course.id]}); }} disabled={disabled.indexOf(course.id)!==-1} className="button primary">{this.text(course.id)}</button>}</>}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                
                
        
                    
                </Fade>
                {course && <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>x</button>
                        <div className="course-details">
                            <img src={course.image} alt={course.title}></img>
                            <div className="course-details-description">
                                <p className="modal-course-title">
                                    <strong>{course.title}</strong>
                                </p>
                                <p>
                                    {course.description}
                                </p>
                                <p>
                                    Category:{" "}
                                    {course.categoryNames.map((x)=>(
                                        <span>
                                            {" "}
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <p>
                                    Your teacher:{" "}
                                    {course.teacher}
                                </p>
                                <div className="course-price">
                                    <div>
                                        {formatCurrency(course.price)}
                                    </div>
                                    {bought.some(e => e.id === course.id)
                                                ?   <button className="button primary" disabled={true} id="bought-course">Bought</button>
                                                :   <>{cartItems.some(e => e.id === course.id)
                                                        ? <button className="button primary" disabled={true} id="in-cart-course">In cart</button> 
                                                : <button id={this.styling(course.id)} onClick={()=>{this.props.addToCart(course); this.text(course.id); this.setState({disabled:[...disabled, course.id]}); }} disabled={disabled.indexOf(course.id)!==-1} className="button primary">{this.text(course.id)}</button>}</>}
                                        </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>}
            </div>
        )
    }
}
