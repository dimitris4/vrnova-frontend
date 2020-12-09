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
        
        const{userCount, adminCount, moderatorCount}=this.props;
        console.log(userCount, adminCount, moderatorCount);


        const count = [{
            color: "#E38627",
            title: "Users (" + Math.round((userCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
            value: userCount
            },
            {
            color: "#C13C37",
            title: "Moderators (" + Math.round((moderatorCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
            value: moderatorCount
            },
            {
            color: "#6A2135",
            title: "Admins (" + Math.round((adminCount*1000)/(userCount+adminCount+moderatorCount))/10+"%)",
            value: adminCount
            }];

        return (<PieChart
            
            data={count}
            animate={true}
            animationDuration={2000}
            animationEasing="ease-out"
            center={[50, 50]}
            labelPosition={60}
            labelStyle={{
                fontSize: "20%",
                fontColor: "FFFFFA",
                fontWeight: "800",
              }}
              label={(data) => data.dataEntry.title}
            lengthAngle={360}
            lineWidth={70}
            paddingAngle={0}
            radius={50}
            rounded={false}
            startAngle={0}
            viewBoxSize={[100, 100]}
               />  );
    }
}
