import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend

} from 'chart.js';

import React from 'react';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);





export default function DoughnutChart(){

    const data ={
        labels:['Total','Busy','Available'],
        datasets:[{
            // label:"Poll",
            data:[9,6,3],
            backgroundColor:['#34aadc','#32577e','#618fbed9'],
            borderColor:['#34aadc','#32577e','#618fbed9']
        }]
    }

    const options = {
        maintainAspectRatio: false, // Prevent the chart from maintaining a 2:1 aspect ratio
        responsive: true, // Allow the chart to be responsive
        plugins: {
          legend: {
            display: true,
            position: 'bottom', // Adjust the legend position if needed
          },
        },
        layout: {
          padding: {
            top: 20, // Increase or decrease top padding as needed
            bottom: 20, // Increase or decrease bottom padding as needed
          },
        },
        // scales: {
        //   x: {
        //     display: false, // Hide the x-axis if not needed
        //   },
        //   y: {
        //     display: false, // Hide the y-axis if not needed
        //   },
        // },
      };











    return(
        <div>
             {/* <h1>Doughnut Chart</h1> */}
             <div>
                <Doughnut 
                data ={data}
                options={options}
                width="500px"
                 height="500px"
                >
                    
                </Doughnut>
             </div>
        </div>

    )
}