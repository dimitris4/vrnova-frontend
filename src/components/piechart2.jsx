import { Gif } from '@material-ui/icons';
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
        
        const{totalCount, javaCount,arCount,vrCount,jsCount,gitCount,angularCount,cCount,nodeCount,reactCount,reduxCount}=this.props;
        // console.log(userCount, adminCount, moderatorCount);
        console.log(javaCount,arCount,vrCount,jsCount,gitCount,angularCount,cCount,nodeCount,reactCount,reduxCount, totalCount);



        const count = [{
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "AR (" + Math.round((arCount*1000)/totalCount)/10+"%)",
            value: arCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "VR (" + Math.round((vrCount*1000)/totalCount)/10+"%)",
            value: vrCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "Angular (" + Math.round((angularCount*1000)/totalCount)/10+"%)",
            value: angularCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "Java (" + Math.round((javaCount*1000)/totalCount)/10+"%)",
            value: javaCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "Git (" + Math.round((gitCount*1000)/totalCount)/10+"%)",
            value: gitCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "JavaScript (" + Math.round((jsCount*1000)/totalCount)/10+"%)",
            value: jsCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "C# (" + Math.round((cCount*1000)/totalCount)/10+"%)",
            value: cCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "NodeJS (" + Math.round((nodeCount*1000)/totalCount)/10+"%)",
            value: nodeCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "React (" + Math.round((reactCount*1000)/totalCount)/10+"%)",
            value: reactCount
            },
            {
            color: "#"+Math.floor(Math.random()*16777215).toString(16),
            title: "Redux (" + Math.round((reduxCount*1000)/totalCount)/10+"%)",
            value: reduxCount
            }
        ];

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
