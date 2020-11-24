import React, { Component } from 'react';
import "../index.css";

export default class Filter extends Component {

    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} {this.props.count<2?"Course":"Courses"}</div>
                <div className="search">
                    <label className="search-label" htmlFor="search-input">
                        <input className="search-input" type="text" value={this.props.query} onChange={this.props.handleOnInputChange} placeholder="Search course..."/>
                        <i className="fas fa-search search-icon"></i>
                    </label>
                    
                </div>
                <div className="filter-sort">
                    Order by<br></br>  
                    <select value={this.props.sort} onChange={this.props.sortCourses}>
                        <option>Date (latest)</option>
                        <option value="lowest">Lowest price</option>
                        <option value="highest">Highest price</option>
                    </select>
                </div>
                <div className="filter-category">
                    Filter by category<br></br>  
                    <select value={this.props.categories} onChange={this.props.filterCourses2}>
                        <option value="ALL">ALL</option>
                        <option value="AR">AR</option>
                        <option value="VR">VR</option>
                        <option value="IoT">IoT</option>
                        <option value="AI">AI</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Programming">Programming</option>
                        <option value="Data Visualization">Data Visualization</option>
                        <option value="Front End">Front End</option>
                        <option value="Back End">Front End</option>
                        <option value="Version Control">Version Control</option>
                    </select>
                </div>
                <div className="filter-price">
                    Filter by teacher<br></br>  
                    <select value={this.props.teacher} onChange={this.props.filterCourses}>
                    <option value="ALL">ALL</option>
                        <option value="Anna Andreasen">Anna Andreasen</option>
                        <option value="Alex Sandrovschii">Alex Sandrovschii</option>
                        <option value="Dimitrios Gkiokas">Dimitrios Gkiokas</option>
                        <option value="Elias Martidis">Elias Martidis</option>
                        <option value="Max Payne">Max Payne</option>
                    </select>
                </div>
            </div>
        )
    }
}
