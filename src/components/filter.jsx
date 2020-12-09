import React, { Component } from 'react';
import "../index.css";

export default class Filter extends Component {

    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} {this.props.count===1?"course found":"courses found"}</div>
                <div className="search">
                    <label className="search-label" htmlFor="search-input">
                        <input className="search-input fontAwesome" type="text" value={this.props.query} onChange={this.props.handleOnInputChange} placeholder="&#xF002;Search for a course..."/>
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
                        <option value="Back End">Back End</option>
                        <option value="Version Control">Version Control</option>
                    </select>
                </div>
                <div className="filter-price">
                    Filter by teacher<br></br>  
                    <select value={this.props.teacher} onChange={this.props.filterCourses}>
                    <option value="ALL">ALL</option>
                        <option value="Avetis Ghukasyan">Avetis Ghukasyan</option>
                        <option value="John Smith">John Smith</option>
                        <option value="Mosh Hamedani">Mosh Hamedani</option>
                        <option value="Nelson Djalo">Nelson Djalo</option>
                        <option value="Quentin Valembois">Quentin Valembois</option>
                        <option value="Zach Gollwitzer">Zach Gollwitzer</option>
                    </select>
                </div>
            </div>
        )
    }
}
