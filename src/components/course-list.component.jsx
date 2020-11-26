import React, { Component } from 'react';
import formatCurrency from "../utils";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class CourseList extends Component {

    constructor(props){
        super(props);
        this.state = {
            course: null,

        };
     }
    
     openModal=(course)=>{
        this.setState({course});
     };

     closeModal=()=>{
        this.setState({course:null});
     };

    render() {
        const{course}=this.state;
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="courses">
                        {this.props.courses.map(course =>(
                            <li key={course._id}>
                                <div className="course">
                                    <a href={"#"+course._id} onClick={()=>this.openModal(course)}>
                                        <img src={course.image} alt="course image"></img>
                                        <p>{course.title}</p>
                                    </a>
                                    <div className="course-price">
                                        <div>{formatCurrency(course.price)}</div>
                                        <button onClick={()=>this.props.addToCart(course)} className="button primary">Buy course</button>
                                        {/* <button onClick={()=>this.props.disableBuyButton(course)} className="button primary">Buy course</button> */}
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
                                    <button className="button primary" onClick={()=>{
                                        this.props.addToCart(course);
                                        this.closeModal();
                                    }}>Buy Course</button>

                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>}
            </div>
        )
    }
}
