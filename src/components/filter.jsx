import React, { Component } from 'react';
import "../index.css";

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Courses</div>
                <div className="filter-sort">
                    Order{" "}  
                    <select value={this.props.sort} onChange={this.props.sortCourses}>
                        <option>Latest</option>
                        <option value="lowest">Lowest price</option>
                        <option value="highest">Highest price</option>
                    </select>
                </div>
                <div className="filter-price">
                    Filter by teacher{" "} 
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
