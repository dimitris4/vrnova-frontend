import React, { Component } from 'react';
import { PieChart } from "react-minimal-pie-chart";


export default class MyPiechart extends Component {
    
    constructor(props) {
        super(props);
         this.state = {
             content: "",
            data:[]
        }
    }

    render() { 
        
        const{count}=this.props;
        return (<PieChart
            
            data={count}
            animate={true}
            animationDuration={2000}
            animationEasing="ease-out"
            center={[50, 50]}
            labelPosition={60}
            labelStyle={{
                fontSize: "15%",
                fontColor: "FFFFFA",
                fontWeight: "800",
              }}
              label={(data) => data.dataEntry.title}
            lengthAngle={360}
            lineWidth={70}
            paddingAngle={0}
            radius={40}
            rounded={false}
            startAngle={0}
            viewBoxSize={[100, 100]}
               />  );
    }
}
