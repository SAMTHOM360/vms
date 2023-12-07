import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend

} from 'chart.js';

import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { fontSize } from '@mui/system';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);



export default function DoughnutChart({allData}){

  const [availableRooms, setAvailableRooms] = useState(0);
  const [busyRooms, setBusyRooms] = useState(0);

  const companyId = sessionStorage.getItem('companyId');


  
 
useEffect(() => {
  
// if(allData){
  setAvailableRooms(allData?.totalAvailableRoom);
  setBusyRooms(allData?.totalBusyRooms);

// }
// else {
//   return null;
// }

}, [allData]);




    const data ={
        
        // labels:['Available','Busy'],
        labels: [
          `Available:${availableRooms} `,
          `Busy:${busyRooms}`,
    
      ],
        datasets:[{
            // label:"Poll",
            // data:[totalRooms,availableRooms,busyRooms],
            data:[availableRooms,busyRooms],
            backgroundColor:['#34aadc','#32577e','#618fbed9'],
            borderColor:['#34aadc','#32577e','#618fbed9'],
            
        }]
    }

    const options = {
        maintainAspectRatio: false, 
        responsive: true, 
        plugins: {
          legend: {
            display: true,
            labels:{
              font: {
                size: 22
            }
            },
            position: 'bottom', 
          },

      
        },
        layout: {
          padding: {
            top: 10, 
            bottom: 30, 
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
             <div style={{display:"flex",justifyContent:"cenetr",alignItems:"center"}}>
                <Doughnut 
                data ={data}
                options={options}
                width="450px"
                 height="450px"
                
                >
                    
                </Doughnut>
             </div>
        </div>

    )
}
