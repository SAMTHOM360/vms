
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../../css/ProgressBar.css';
import axios from 'axios';




const ProgressBar = ({meetingHour,allData}) => {

    


    const [meetingHours, setMeetingHours] = useState([]);
    const [averageHoursPerWeek, setAverageHoursPerWeek] = useState();
    const [totalMeetingsPerWeek, setTotalMeetingsPerWeek] = useState('');

    const chartRef = useRef(null);
    const chartInstance = useRef(null);


    // const[totalMeetingTime,setTotalMeetingTime] = useState(0);
    // const[totalAverageTime,setTotalAverageTime] = useState(0);


       console.log(meetingHour,"xxxx")
 useEffect(() => {


    if(allData){
        setAverageHoursPerWeek(allData.averageHoursPerWeek)
        // console.log(allData,"xxxxx")
    }

   

    if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    if(chartRef.current){
        const ctx = chartRef.current.getContext('2d');


        // setAverageHoursPerWeek(averageHoursPerWeek)
       
        const totalMeetingHoursByDay = meetingHour?.map(hour => hour.totalMeetingHours);
        const totalMeetingDate = meetingHour?.map(Date => Date.date);
        const totalMeeting = meetingHour?.map(hour => hour.totalMeeting);
        const averageMeeting = meetingHour?.map(hour => hour.meetingAverage);

        const data = {

            labels: totalMeetingDate,
    
            datasets: [
                {
                    label: 'Total Meeting Hours',
    
                    data: totalMeetingHoursByDay,
                    datas: totalMeeting,
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
                    borderRadius: 0,
                    barPercentage: 0.4,
                    categoryPercentage: 0.8,
                    hidden: false
                },
                {
    
                    label: 'Total Meetings',
    
                    // data:totalMeetingHoursByDay,
                    data: totalMeeting,
                    borderColor: [
                        'rgba(0, 0, 128, 0.2)', // Dark blue border color with alpha
                        'rgba(0, 0, 128, 0.2)',
                        'rgba(0, 0, 128, 0.2)',
                        'rgba(0, 0, 128, 0.2)',
                        'rgba(0, 0, 128, 0.2)',
                        'rgba(0, 0, 128, 0.2)',
                        'rgba(0, 0, 128, 0.2)',
                    ],
                    backgroundColor: [
                        'rgba(0, 0, 128, 1.1)', // Dark blue background color with alpha
                        'rgba(0, 0, 128, 1.2)',
                        'rgba(0, 0, 128, 1.3)',
                        'rgba(0, 0, 128, 1.4)',
                        'rgba(0, 0, 128, 1.5)',
                        'rgba(0, 0, 128, 1.6)',
                        'rgba(0, 0, 128, 1.7)',
                    ],
                    borderWidth: 0,
                    borderSkipped: false,
                    borderRadius: 0,
                    barPercentage: 0.4,
                    categoryPercentage: 0.8,
                    hidden: false
                },
                {
    
                    label: 'Average Meeting Hours ',
    
                    // data:totalMeetingHoursByDay,
                    data: averageMeeting,
                    borderColor: [
                        'rgba(97, 143, 190, 0.85)', // Border color in RGBA
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                    ],
                    backgroundColor: [
                        'rgba(97, 143, 190, 0.85)', // Background color in RGBA
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                        'rgba(97, 143, 190, 0.85)',
                    ],
                    borderWidth: 0,
                    borderSkipped: false,
                    borderRadius: 0,
                    barPercentage: 0.4,
                    categoryPercentage: 0.8,
                    hidden: false
                }
            ],
    
        };



        const progressBar = {
            id: "progressBar",
            beforeDatasetsDraw(chart, args, pluginOptions) {
                const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
                ctx.save();
    
                const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;
    
                data.datasets[0].data.forEach((datapoint, index) => {
                    const fontSizeLabel = 12;
                    ctx.font = `${fontSizeLabel}px sans-serif`;
                    ctx.fillStyle = 'rgba(102,102,102,1)';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);
    
                    const fontSizeDataPoint = 15;
                    ctx.font = `bolder ${fontSizeDataPoint}px sans-serif`;
                    ctx.fillStyle = 'rgba(102,102,102,1)';
                    ctx.textAlign = 'right';
                    ctx.textBaseline = 'middle';
                    const padding = 50; //extra
    
                    // Displaying totalMeetingHours/totalMeeting
                    ctx.fillText(`${datapoint} hrs / ${data.datasets[0].datas[index]} Meetings`, right - 60 + padding, y.getPixelForValue(index) - fontSizeDataPoint - 5);
    
                    ctx.beginPath();
                    ctx.fillStyle = data.datasets[0].borderColor[index];
                    ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight);
                });
            }
        };

        const config = {
            type: 'bar',
            data,
            options: {
                indexAxis: "y",
    
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            font: {
                                size: 18, // Adjust the size as needed
                            },
                        },
                        layout: {
                            padding: {
                                top: '50px', // Increase top padding to move legends further down
                            },
                        },
    
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
    
                },
                scales: {
    
                    x: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            display: false,
                            font: {
                                size: 14, // Adjust the font size for meeting date/time labels
                            },
    
                        }
                    },
                    y: {
                        stacked: true,
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
        // new Chart(ctx, config);
        chartInstance.current = new Chart(ctx, config);

        

    }


 },[meetingHour])

   

   

   


  


    //fetchHours function

    // const fetchHours = async () => {
    //     try {
    //         const companyId = sessionStorage.getItem("companyId")
    //         const today = new Date().toISOString().split('T')[0];

    //         const eightDaysAgo = new Date();
    //         eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
    //         const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];

    //         const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`

    //         const payload = {
    //             page: 0,
    //             size: 1000,
    //             // phoneNumber: '',
    //             // searchQuery: '',
    //             companyId: companyId,
    //             fromDate: eightDaysAgoFormatted,
    //             toDate: today
    //             // status:status,
    //             // date:'2023-10-18T11:00:00'

    //         }

    //         const response = await axios.post(getVisitorUrl, payload);
    //         const responseData = response.data.data.meetingHours;

    //         setMeetingHours(responseData);
    //         setAverageHoursPerWeek(response.data.data.avgHoursPerWeek);
    //         setTotalMeetingsPerWeek(response.data.data.totalMeetingPerWeek);
            
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };


    //useEffect fetchhours()
    // useEffect(() => {
    //     // fetchHours();
    //     // chartFunc()

    // }, [])


    // const chartFunc = () => {
    //     debugger

    //     console.log(meetingHour,"meetinghour")
    //     const totalMeetingHoursByDay = meetingHour?.map(hour => hour.totalMeetingHours);
    //     const totalMeetingDate = meetingHour?.map(Date => Date.date);
    //     const totalMeeting = meetingHour?.map(hour => hour.totalMeeting);
    //     const averageMeeting = meetingHour?.map(hour => hour.meetingAverage);

    //     // const totalMeetingHoursByDay = meetingHours.map(hour => hour.totalMeetingHours);
    //     // const totalMeetingDate = meetingHours.map(Date => Date.date);
    //     // const totalMeeting = meetingHours.map(hour => hour.totalMeeting);
    //     // const averageMeeting = meetingHours.map(hour => hour.meetingAverage);

    //     // Setup data
    //     const data = {

    //         labels: totalMeetingDate,

    //         datasets: [
    //             {
    //                 label: 'Total Meeting Hours',

    //                 data: totalMeetingHoursByDay,
    //                 datas: totalMeeting,
    //                 borderColor: [
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(54, 162, 235, 1.1)',
    //                     'rgba(54, 162, 235, 1.2)',
    //                     'rgba(54, 162, 235, 1.3)',
    //                     'rgba(54, 162, 235, 1.4)',
    //                     'rgba(54, 162, 235, 1.5)',
    //                     'rgba(54, 162, 235, 1.6)',
    //                     'rgba(54, 162, 235, 1.7)',
    //                 ],
    //                 borderWidth: 0,
    //                 borderSkipped: false,
    //                 borderRadius: 0,
    //                 barPercentage: 0.2,
    //                 categoryPercentage: 0.8,
    //                 hidden: false
    //             },
    //             {

    //                 label: 'Total Meetings',

    //                 // data:totalMeetingHoursByDay,
    //                 data: totalMeeting,
    //                 borderColor: [
    //                     'rgba(0, 0, 128, 0.2)', // Dark blue border color with alpha
    //                     'rgba(0, 0, 128, 0.2)',
    //                     'rgba(0, 0, 128, 0.2)',
    //                     'rgba(0, 0, 128, 0.2)',
    //                     'rgba(0, 0, 128, 0.2)',
    //                     'rgba(0, 0, 128, 0.2)',
    //                     'rgba(0, 0, 128, 0.2)',
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(0, 0, 128, 1.1)', // Dark blue background color with alpha
    //                     'rgba(0, 0, 128, 1.2)',
    //                     'rgba(0, 0, 128, 1.3)',
    //                     'rgba(0, 0, 128, 1.4)',
    //                     'rgba(0, 0, 128, 1.5)',
    //                     'rgba(0, 0, 128, 1.6)',
    //                     'rgba(0, 0, 128, 1.7)',
    //                 ],
    //                 borderWidth: 0,
    //                 borderSkipped: false,
    //                 borderRadius: 0,
    //                 barPercentage: 0.3,
    //                 categoryPercentage: 0.8,
    //                 hidden: false
    //             },
    //             {

    //                 label: 'Average Meeting Hours ',

    //                 // data:totalMeetingHoursByDay,
    //                 data: averageMeeting,
    //                 borderColor: [
    //                     'rgba(97, 143, 190, 0.85)', // Border color in RGBA
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                 ],
    //                 backgroundColor: [
    //                     'rgba(97, 143, 190, 0.85)', // Background color in RGBA
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                     'rgba(97, 143, 190, 0.85)',
    //                 ],
    //                 borderWidth: 0,
    //                 borderSkipped: false,
    //                 borderRadius: 0,
    //                 barPercentage: 0.3,
    //                 categoryPercentage: 0.8,
    //                 hidden: false
    //             }






    //         ],

    //     };


    //     console.log(data, "dataaaaa");



    //     //zzzz

    //     // ... (other code)

    //     // progressBar plugin block

    //     const progressBar = {
    //         id: "progressBar",
    //         beforeDatasetsDraw(chart, args, pluginOptions) {
    //             const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
    //             ctx.save();

    //             const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;

    //             data.datasets[0].data.forEach((datapoint, index) => {
    //                 const fontSizeLabel = 12;
    //                 ctx.font = `${fontSizeLabel}px sans-serif`;
    //                 ctx.fillStyle = 'rgba(102,102,102,1)';
    //                 ctx.textAlign = 'left';
    //                 ctx.textBaseline = 'middle';
    //                 ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);

    //                 const fontSizeDataPoint = 15;
    //                 ctx.font = `bolder ${fontSizeDataPoint}px sans-serif`;
    //                 ctx.fillStyle = 'rgba(102,102,102,1)';
    //                 ctx.textAlign = 'right';
    //                 ctx.textBaseline = 'middle';
    //                 const padding = 50; //extra

    //                 // Displaying totalMeetingHours/totalMeeting
    //                 ctx.fillText(`${datapoint} hrs / ${data.datasets[0].datas[index]} Meetings`, right - 60 + padding, y.getPixelForValue(index) - fontSizeDataPoint - 5);

    //                 ctx.beginPath();
    //                 ctx.fillStyle = data.datasets[0].borderColor[index];
    //                 ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight);
    //             });
    //         }
    //     };



    //     // Config
    //     const config = {
    //         type: 'bar',
    //         data,
    //         options: {
    //             indexAxis: "y",

    //             plugins: {
    //                 legend: {
    //                     position: 'bottom',
    //                     display: true,
    //                     labels: {
    //                         font: {
    //                             size: 18, // Adjust the size as needed
    //                         },
    //                     },
    //                     layout: {
    //                         padding: {
    //                             top: '50px', // Increase top padding to move legends further down
    //                         },
    //                     },

    //                 },
    //                 tooltip: {
    //                     mode: 'index',
    //                     intersect: false,
    //                 },

    //             },
    //             scales: {

    //                 x: {
    //                     stacked: true,
    //                     beginAtZero: true,
    //                     grid: {
    //                         display: false,
    //                         drawBorder: false,
    //                     },
    //                     ticks: {
    //                         display: false,
    //                         font: {
    //                             size: 14, // Adjust the font size for meeting date/time labels
    //                         },

    //                     }
    //                 },
    //                 y: {
    //                     stacked: true,
    //                     beginAtZero: true,
    //                     grid: {
    //                         display: false,
    //                         drawBorder: false,
    //                     },
    //                     ticks: {
    //                         display: false
    //                     }
    //                 }
    //             },
    //             // Config

    //             // ...




    //         },
    //         plugins: [progressBar]
    //     };




    //     data.datasets[0].barPercentage = 0.9; // Adjust this value (default is 0.9)
    //     data.datasets[0].categoryPercentage = 0.3;
    //     // Render chart


    //     // const chartCanvas = document.getElementById('myChart');
    //     // new Chart(chartCanvas, config);

    //     // // Instantly assign Chart.js version
    //     // const chartVersion = document.getElementById('chartVersion');
    //     // // chartVersion.innerText = Chart.version;




    //     if (chartRef.current) {
    //         // chartRef();
    //     }


    //     // Render chart
    //     // const chartCanvas = document.getElementById('myChart');
    //     // if (chartCanvas) {

    //     //     chartRef.current = new Chart(chartCanvas, config);
    //     // }




    //     // const chartCanvas = document.getElementById('myChart');
    //     // return () => {
    //     //     if (chartRef.current) {
    //     //         chartRef.current.destroy();
    //     //     }
    //     //   };

    // }

    //useEffect data


    // return (
    //     <div>
    //         <div className="chartMenu">
    //             {/* <p>Meeting Hours </p> */}
    //             {/* <p>Meeting Hours ( <span id="chartVersion"></span>)</p> */}
    //         </div>
    //         <div className="chartCard" style={{backgroundColor:""}}>
    //         <h2 style={{ color: "black" }}>MeetingDetails (Average Hours/week :{averageHoursPerWeek} ,Total Meetings/week:{totalMeetingsPerWeek})</h2>
    //             <div className="chartBox" style={{display:"flex",justifyContent: "",backgroundColor:"" }}>

    //                 <canvas id="myChart" style={{ height: "1000px !important", width: "900px",marginRight: "",backgroundColor:"" }}></canvas>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div>

            <div className="statsSummary">
                <h2>
                    Meeting Details (
                    {/* <span className="meetingDetails">Meeting Details ( */}
                    <span className="avgHours">Average Hours/Week: {averageHoursPerWeek}</span>
                    <span className="totalMeetings"> , Total Meetings/Week: {totalMeetingsPerWeek}) </span>
                </h2>
            </div>

            {/* <div className="chartMenu">
            <h3>Weekly Trend</h3> 
          </div> */}

            <div className="chartCard">
                <div className="chartBox">
                    <canvas id="myChart"  ref={chartRef}style={{ height: "1%", width: "60%", marginTop: "50px", backgroundColor: "" ,padding:"",}}></canvas>
                </div>
            </div>

        </div>
    );
};

export default ProgressBar;









