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

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);








export default function DoughnutChart(){
  const[rooms,setRooms] = useState(0);

  const[totalRooms,setTotalRooms] = useState(0);
  const[availableRooms,setAvailableRooms] = useState(0);
  const[busyRooms,setBusyRooms] = useState(0);

  const companyId = localStorage.getItem('companyId');



function fetchRooms(){


  const today = new Date().toISOString().split('T')[0];

  const eightDaysAgo = new Date();
  eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
  const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];



  const payload = {
    page: 1,
    size: 1,
    // phoneNumber: '',
    // searchQuery: '',
    companyId: companyId,
    fromDate:eightDaysAgoFormatted,
    toDate:today
    // status:status,
    // date:'2023-10-18T11:00:00'

}
const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`
axios
    .post(getVisitorUrl,
        payload)
    .then(response => {
        const responseData = response.data.data;


        setRooms(responseData);
  
        // setTotalRooms(response.data.data.totalRooms);
        setAvailableRooms(response.data.data.totalAvailableRoom);
        setBusyRooms(response.data.data.totalBusyRooms);

    
    
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


}


useEffect(()=>{
  fetchRooms();

},[])


    const data ={
        // labels:['Total','Available','Busy'],
        labels:['Available','Busy'],
        datasets:[{
            // label:"Poll",
            // data:[totalRooms,availableRooms,busyRooms],
            data:[availableRooms,busyRooms],
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
            top: 10, // Increase or decrease top padding as needed
            bottom: 30, // Increase or decrease bottom padding as needed
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