import React, { Component } from 'react';
import Footer from "./footer";
// import data from "../data.json";
import "../index.css";
import CourseList from './course-list.component';
import Filter from './filter';
import Cart from './cart';
import 'react-credit-cards/es/styles-compiled.css';
import axios from "../connections";
import authHeader from "../services/auth-header";


export default class Courses extends Component {
   constructor(props){
      super(props);
      this.state = {
                    courses: [],
                    allCourses:[],
                    // courses: data.courses, 
                    cartItems:JSON.parse(localStorage.getItem("cartItems"))? JSON.parse(localStorage.getItem("cartItems")):[], 
                    teacher:"", 
                    sort:"", 
                    categories:"", 
                    query:""};

                    axios.get('courses', { headers: authHeader() }).then(resp => this.setState({courses: resp.data}));
                    axios.get('courses', { headers: authHeader() }).then(resp => this.setState({allCourses: resp.data}));
   }


   createOrder =(order)=>{
       //order.name
       alert("Need to save order for " + order.cartItems);
   }

   removeFromCart=(course)=>{
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x=>x.id !== course.id)});
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x.id !== course.id)));
    window.location.reload();
   };
   
   addToCart = (course)=>{
       const cartItems = this.state.cartItems.slice();

       let alreadyInCart = false;
       cartItems.forEach(item=>{
           if(item.id===course.id)
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
            : a.id < b.id
            ? 1
            : -1
          ),
       }));  
   };
   
   filterCourses=(event)=>{

    const allCourses = this.state.allCourses.slice();
        console.log(event.target.value);
        if(event.target.value===""||event.target.value==="ALL"){
            this.setState({teacher: event.target.value, courses:allCourses});
        } else{
            this.setState({teacher: event.target.value, courses: allCourses.filter(course=>course.teacher.indexOf(event.target.value)>=0)});
        } 
   };

   filterCourses2=(event)=>{
    const allCourses = this.state.allCourses.slice();
    console.log(event.target.value);
    if(event.target.value===""||event.target.value==="ALL"){
        this.setState({categories: event.target.value, courses:allCourses});
    } else{
        this.setState({categories: event.target.value, courses: allCourses.filter(course=>course.categoryNames.indexOf(event.target.value)>=0)});
    } 
};

handleOnInputChange = (event) =>{
    const allCourses = this.state.allCourses.slice();
    this.setState({query: event.target.value, courses: allCourses.filter(course=>course.title.toLowerCase().includes(event.target.value.toLowerCase()))});
}

// disableBuyButton = (course) =>{


// }

    render() {
        return (
            <div className="grid-container">
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter count={this.state.courses.length}
                            teacher={this.state.teacher}
                            categories={this.state.categories}
                            sort={this.state.sort}
                            filterCourses={this.filterCourses}
                            filterCourses2={this.filterCourses2}
                            sortCourses={this.sortCourses}
                            handleOnInputChange={this.handleOnInputChange}
                            ></Filter>
                            <CourseList 
                                user={this.props.user} 
                                courses={this.state.courses} 
                                addToCart={this.addToCart}
                                disableBuyButton={this.disableBuyButton}
                            ></CourseList>        
                        </div>
                        <div className="sidebar">
                            <Cart
                                user={this.props.user} 
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
