
// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import '../../css/ProgressBar.css';
// import axios from 'axios';

// const ProgressBar = () => {


//     const [hours, setHours] = useState([]);
//     const [totalMeetingHours, setTotalMeetingHours] = useState(0);
//     const companyId = localStorage.getItem("companyId")


//     function fetchHours() {



//         const today = new Date().toISOString().split('T')[0];

//         const eightDaysAgo = new Date();
//         eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
//         const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];



//         const payload = {
//             page: 1,
//             size: 1,
//             // phoneNumber: '',
//             // searchQuery: '',
//             companyId: companyId,
//             fromDate: eightDaysAgoFormatted,
//             toDate: today
//             // status:status,
//             // date:'2023-10-18T11:00:00'

//         }
//         const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`
//         axios
//             .post(getVisitorUrl,
//                 payload)
//             .then(response => {
//                 const responseData = response.data.data.meetingHours;
//                 // console.log(responseData);


//                 //   setHours(responseData);

//                 //   setTotalMeetingHours(responseData.totalMeetingHours);
//                 const meetingHours = response.data.data.meetingHours;

//                 if (meetingHours && meetingHours.length > 0) {
//                     const totalHours = meetingHours.map((hour) => hour.totalMeetingHours);
//                     setTotalMeetingHours(totalHours);




//                 }
                

//                 const labels = meetingHours.map((hour) => hour.date.split(' ')[0]); 
//             }


//             )
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });




//         const data = {

            
//             labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//             datasets: [{
//                 // label: 'Weekly Total Meeting Hours',
//                 label:labels,
//                 // data: [10, 12, 6, 9, 12, 3, 9],
//                 data: totalMeetingHours,

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
//                 borderRadius: 10,
//                 barPercentage: 0.3,
//                 categoryPercentage: 0.8,
//             }]
//         };





//         //progressBar plugin block

//         const progressBar = {
//             id: "progressBar",
//             beforeDatasetsDraw(chart, args, pluginOptions) {
//                 const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
//                 ctx.save();



//                 const barHeight = height / y.ticks.length * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;

//                 data.datasets[0].data.forEach((datapoint, index) => {

//                     //labeltext
//                     const fontSizeLabel = 12;

//                     // console.log(y);
//                     ctx.font = `${fontSizeLabel}px sans-serif`;
//                     ctx.fillStyle = 'rgba(102,102,102,1)';
//                     ctx.textAlign = 'left';
//                     ctx.textBaseline = 'middle';
//                     ctx.fillText(data.labels[index], left, y.getPixelForValue(index) - fontSizeLabel - 5);


//                     //valueText
//                     const fontSizeDataPoint = 15;

//                     // console.log(y);
//                     ctx.font = `bolder ${fontSizeDataPoint}px sans-serif`;
//                     ctx.fillStyle = 'rgba(102,102,102,1)';
//                     ctx.textAlign = 'right';
//                     ctx.textBaseline = 'middle';
//                     ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDataPoint - 5);


//                     //bg color progress bar

//                     ctx.beginPath();
//                     ctx.fillStyle = data.datasets[0].borderColor[index];
//                     ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight)

//                 })







//             }
//         }

//         // Config
//         const config = {
//             type: 'bar',
//             data,
//             options: {
//                 indexAxis: "y",

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
//             },
//             plugins: [progressBar]
//         };

//         // Render chart


//         const chartCanvas = document.getElementById('myChart');
//         new Chart(chartCanvas, config);

//         // Instantly assign Chart.js version
//         const chartVersion = document.getElementById('chartVersion');


//     }







//     useEffect(() => {

//         fetchHours()

//         // Setup data

//         // chartVersion.innerText = Chart.version;
//     }, []);

//     return (
//         <div>
//             <div className="chartMenu">
//                 {/* <p>Meeting Hours </p> */}
//                 {/* <p>Meeting Hours ( <span id="chartVersion"></span>)</p> */}
//             </div>
//             <div className="chartCard">
//                 <div className="chartBox">
//                     <canvas id="myChart" style={{ height: "500px", width: "900px" }}></canvas>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProgressBar;









// 2nd way

import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import '../../css/ProgressBar.css';
import axios from 'axios';

const ProgressBar = () => {
    const [totalMeetingHours, setTotalMeetingHours] = useState([]);
    const companyId = localStorage.getItem("companyId");

    useEffect(() => {
        const fetchHours = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const eightDaysAgo = new Date();
                eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
                const eightDaysAgoFormatted = eightDaysAgo.toISOString().split('T')[0];

                const payload = {
                    page: 1,
                    size: 1,
                    companyId: companyId,
                    fromDate: eightDaysAgoFormatted,
                    toDate: today
                };

                const getVisitorUrl = `http://192.168.12.54:8080/api/meeting/paginateDashBoard`;
                const response = await axios.post(getVisitorUrl, payload);

                const meetingHours = response.data.data.meetingHours;
                if (meetingHours && meetingHours.length > 0) {
                    const data = meetingHours.map((hour) => ({
                        date: hour.date.split(' ')[0],
                        totalMeetingHours: hour.totalMeetingHours,
                    }));

                    
                    const labels = meetingHours.map((hour) => hour.date.split(' ')[0]); 
                    // const avgHours = meetingHoursData.map(hour => hour.meetingAverage);
                    // setAverageMeetingHours(avgHours);

                    const datas = {
                        
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            // label: 'Weekly Total Meeting Hours',
                            // data: totalHours,
                            data:[10,12,5,7,8,9,5],
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
                            barPercentage: 0.3,
                            categoryPercentage: 0.8,
                        }]
                    };

                    const chartCanvas = document.getElementById('myChart');
                    new Chart(chartCanvas, {
                        type: 'bar',
                        data,
                        options: {
                            indexAxis: 'y',
                            plugins: {
                                legend: { display: false },
                            },
                            scales: {
                                x: { beginAtZero: true, grid: { display: false, drawBorder: false }, ticks: { display: false } },
                                y: { beginAtZero: true, grid: { display: false, drawBorder: false }, ticks: { display: false } },
                            },
                            plugins: [{
                                id: 'progressBar',
                                beforeDatasetsDraw(chart, args, pluginOptions) {
                                    const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { y } } = chart;
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
                                        ctx.fillText(datapoint, right, y.getPixelForValue(index) - fontSizeDataPoint - 5);

                                        ctx.beginPath();
                                        ctx.fillStyle = data.datasets[0].borderColor[index];
                                        ctx.fillRect(left, y.getPixelForValue(index) - (barHeight / 2), width, barHeight);
                                    });
                                }
                            }]
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHours();
    }, [companyId]);

    return (
        <div>
            <div className="chartMenu"></div>
            <div className="chartCard">
                <div className="chartBox">
                    <canvas id="myChart" style={{ height: '500px', width: '900px' }}></canvas>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;



