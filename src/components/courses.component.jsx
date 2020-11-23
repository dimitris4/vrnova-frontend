import React, { Component } from 'react';
import Footer from "./footer";
import data from "../data.json";
import "../index.css";
import CourseList from './course-list.component';
import Filter from './filter';
import Cart from './cart';
import 'react-credit-cards/es/styles-compiled.css';


export default class Courses extends Component {
   constructor(props){
      super(props);
      this.state = {courses: data.courses, cartItems:JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")):[], teacher:"", sort:""};
   }

   createOrder =(order)=>{
       //order.name
       alert("Need to save order for " + order.cartItems);
   }

   removeFromCart=(course)=>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
        cartItems: cartItems.filter(x=>x._id !== course._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x._id !== course._id)));
   };
   
   addToCart = (course)=>{
       const cartItems = this.state.cartItems.slice();
       let alreadyInCart = false;
       cartItems.forEach(item=>{
           if(item._id===course._id)
               alreadyInCart=true;
       });
       if(!alreadyInCart){
           cartItems.push({...course, count:1})
       }
       this.setState({cartItems});
       localStorage.setItem("cartItems", JSON.stringify(cartItems));
   }

   sortCourses=(event)=>{
       const sort = event.target.value;
       console.log(event.target.value);
       this.setState(state=>({
         sort: sort,
         courses: this.state.courses
         .slice()
         .sort((a,b)=>
            sort==="lowest"
            ? a.price > b.price
              ? 1 
              : -1
            : sort==="highest"
            ? a.price < b.price
              ? 1 
              : -1
            : a._id < b._id
            ? 1
            : -1
          ),
       }));  
   };
   
   filterCourses=(event)=>{
        console.log(event.target.value);
        if(event.target.value===""||event.target.value==="ALL"){
            this.setState({teacher: event.target.value, courses:data.courses});
        } else{
            this.setState({teacher: event.target.value, courses: data.courses.filter(course=>course.teacher.indexOf(event.target.value)>=0)});
        } 
   };

    render() {
        
        
        return (
            <div className="grid-container">
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter count={this.state.courses.length}
                            teacher={this.state.teacher}
                            sort={this.state.sort}
                            filterCourses={this.filterCourses}
                            sortCourses={this.sortCourses}
                            ></Filter>
                            <CourseList 
                                courses={this.state.courses} 
                                addToCart={this.addToCart}
                            ></CourseList>        
                        </div>
                        <div className="sidebar">
                            <Cart 
                                cartItems={this.state.cartItems}
                                removeFromCart={this.removeFromCart}
                            />
                        </div>
                    </div>
                </main>
                <Footer/>
             </div>);
    
        }
}
