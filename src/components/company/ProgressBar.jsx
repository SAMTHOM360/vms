
import React, { useEffect,useState,useRef } from 'react';
import Chart from 'chart.js/auto';
import '../../css/ProgressBar.css';
import axios from 'axios';

const ProgressBar = () => {

    const[meetingHours,setMeetingHours] = useState([]);
    const chartRef = useRef(null);


    // const[totalMeetingTime,setTotalMeetingTime] = useState(0);
    // const[totalAverageTime,setTotalAverageTime] = useState(0);



    //fetchHours function

    const fetchHours = async () => {
                try {
            const companyId = localStorage.getItem("companyId")
                            const today = new Date().toISOString().split('T')[0];
        
                const eightDaysAgo = new Date();
                eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
                const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];
    
                    const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`
        
                    const payload = {
                                    page: 0,
                                    size: 1000,
                                    // phoneNumber: '',
                                    // searchQuery: '',
                                    companyId: companyId,
                                    fromDate: eightDaysAgoFormatted,
                                    toDate: today
                                    // status:status,
                                    // date:'2023-10-18T11:00:00'
                        
                                }
        
                    const response = await axios.post(getVisitorUrl, payload);
                    const responseData = response.data.data.meetingHours;
        
                    setMeetingHours(responseData);
                 
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };








//useEffect fetchhours()
useEffect(()=>{
    fetchHours();

},[])


    //useEffect data

    useEffect(() => {



        const totalMeetingHoursByDay = meetingHours.map(hour => hour.totalMeetingHours);
        const totalMeetingDate = meetingHours.map(Date => Date.date);
        const totalMeeting = meetingHours.map(hour => hour.totalMeeting);
        const averageMeeting = meetingHours.map(hour => hour.meetingAverage);
        
        // Setup data
        const data = {
          
            labels:totalMeetingDate,
          
            datasets: [
                {
                label: 'Total Meeting Hours',
               
                data:totalMeetingHoursByDay,
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 1.1)',
                    'rgba(54, 162, 235, 1.2)',
                    'rgba(54, 162, 235, 1.3)',
                    'rgba(54, 162, 235, 1.4)',
                    'rgba(54, 162, 235, 1.5)',
                    'rgba(54, 162, 235, 1.6)',
                    'rgba(54, 162, 235, 1.7)',
                ],
                borderWidth: 0,
                borderSkipped: false,
                borderRadius: 10,
                barPercentage: 0.1,
                categoryPercentage: 0.8,
            },

            



        ],

        };


        console.log(data, "dataaaaa");


        //progressBar plugin block

        const progressBar = {
            id: "progressBar",
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
                ctx.save();



                const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;

                data.datasets[0].data.forEach((datapoint, index) => {

                    //labeltext
                    const fontSizeLabel = 12;

                    // console.log(y);
                    
                    ctx.font = `${fontSizeLabel}px sans-serif`;
                    ctx.fillStyle = 'rgba(102,102,102,1)';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);


                    //valueText
                    const fontSizeDataPoint = 15;

                    // console.log(y);
                    ctx.font = `bolder ${fontSizeDataPoint}px sans-serif`;
                    ctx.fillStyle = 'rgba(102,102,102,1)';
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDataPoint - 5);


                    //bg color progress bar

                    ctx.beginPath();
                    ctx.fillStyle = data.datasets[0].borderColor[index];
                    ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight)

                })

            }
        }

        // Config
        const config = {
            type: 'bar',
            data,
            options: {
                indexAxis: "y",

                plugins: {
                    legend: {
                        display: false

                    }
                },
                scales: {

                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                // Config

    // ...
 
  
            

            },
            plugins: [progressBar]
        };




        data.datasets[0].barPercentage = 0.9; // Adjust this value (default is 0.9)
data.datasets[0].categoryPercentage = 0.2;
        // Render chart

        
        // const chartCanvas = document.getElementById('myChart');
        // new Chart(chartCanvas, config);

        // // Instantly assign Chart.js version
        // const chartVersion = document.getElementById('chartVersion');
        // // chartVersion.innerText = Chart.version;




        if (chartRef.current) {
            chartRef.current.destroy();
          }
    
          // Render chart
          const chartCanvas = document.getElementById('myChart');
          if (chartCanvas) {
            chartRef.current = new Chart(chartCanvas, config);
          }
        
    }, [meetingHours]);

    return (
        <div>
            <div className="chartMenu">
                {/* <p>Meeting Hours </p> */}
                {/* <p>Meeting Hours ( <span id="chartVersion"></span>)</p> */}
            </div>
            <div className="chartCard">
                <div className="chartBox">
                <h2 style={{ color: "black" }}>MeetingDetails</h2>
                    <canvas id="myChart" style={{height:"1000px !important",width:"900px"}}></canvas>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;



















// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import axios from 'axios';

// const ProgressBar = () => {
//     const [meetingHours, setMeetingHours] = useState([]);

//     useEffect(() => {
//         fetchHours();
//     }, []);

//     const fetchHours = async () => {
//         try {
//     const companyId = localStorage.getItem("companyId")
//                     const today = new Date().toISOString().split('T')[0];

//         const eightDaysAgo = new Date();
//         eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
//         const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];






//             const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`

//             const payload = {
//                             page: 0,
//                             size: 1000,
//                             // phoneNumber: '',
//                             // searchQuery: '',
//                             companyId: companyId,
//                             fromDate: eightDaysAgoFormatted,
//                             toDate: today
//                             // status:status,
//                             // date:'2023-10-18T11:00:00'
                
//                         }

//             const response = await axios.post(getVisitorUrl, payload);
//             const responseData = response.data.data.meetingHours;

//             setMeetingHours(responseData);
//             renderProgressBarChart(responseData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     const renderProgressBarChart = (hoursData) => {
//         const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//         const data = hoursData.map((hour) => hour.totalMeetingHours);

//         const ctx = document.getElementById('myChart').getContext('2d');
//         new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: daysOfWeek,
//                 datasets: [{
//                     label: 'Weekly Total Meeting Hours',
//                     data: data,
//                     backgroundColor: [
//                         'rgba(54, 162, 235, 1.1)',
//                         'rgba(54, 162, 235, 1.2)',
//                         'rgba(54, 162, 235, 1.3)',
//                         'rgba(54, 162, 235, 1.4)',
//                         'rgba(54, 162, 235, 1.5)',
//                         'rgba(54, 162, 235, 1.6)',
//                         'rgba(54, 162, 235, 1.7)',
//                     ],
//                     borderColor: [
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                     ],
//                     borderWidth: 0,
//                     borderSkipped: false,
//                     borderRadius: 10,
//                     barPercentage: 0.3,
//                     categoryPercentage: 0.8,
//                 }]
//             },
//             options: {
//                 indexAxis: 'y',
//                 plugins: {
//                     legend: {
//                         display: false
//                     }
//                 },
//                 scales: {
//                     x: {
//                         beginAtZero: true,
//                         grid: {
//                             display: false,
//                             drawBorder: false,
//                         },
//                         ticks: {
//                             display: false
//                         }
//                     },
//                     y: {
//                         beginAtZero: true,
//                         grid: {
//                             display: false,
//                             drawBorder: false,
//                         },
//                         ticks: {
//                             display: false
//                         }
//                     }
//                 }
//             }
//         });
//     };

//     return (
//         <div className="chartCard">
//             <div className="chartBox">
//                 <canvas id="myChart" style={{ height: '500px', width: '900px' }}></canvas>
//             </div>
//         </div>
//     );
// };

// export default ProgressBar;

