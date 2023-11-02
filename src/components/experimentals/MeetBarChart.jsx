// import React from "react";
// import {Bar} from 'react-chartjs-2'

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// }
// from 'chart.js'

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// )

// const MeetBarChart = () => {
//   const data = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label:'Business',
//         data: [3,6,9],
//         backgroundColor: '#2EBEA2',
//       },
//       {
//         label:'InterView',
//         data: [3,6,9],
//         backgroundColor: '#2E4ABE',
//       },
//       {
//         label:'Casual',
//         data: [3,6,9],
//         backgroundColor: '#BE2E4A',
//       },
//     ]
//   }

//   const options = {
//     scales: {
//       x: {
//         stacked: true
//       },
//       y:{
//         stacked: true
//       }
//     }

//   }

//   return (
//     <div style={{marginLeft:'1em', width:'95%', height:'95%'}}>
//       <Bar data={data} options={options}></Bar>
//     </div>
//   )
// }

// export default MeetBarChart



// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const MeetBarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const data = {
//       labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//       datasets: [
//         {
//           label: 'Daily Sales',
//           data: [18, 12, 6, 9, 12, 3, 9],
//           backgroundColor: '#2EBEA2',

//         },
//         {
//           label: 'Weekly Sales',
//           data: [18, 12, 6, 9, 12, 3, 9],
//           backgroundColor: '#2E4ABE',

//         },
//         {
//           label: 'Monthly Sales',
//           data: [18, 12, 6, 9, 12, 3, 9],
//           backgroundColor: '#BE2E4A',
//         },
//       ],
//     };

//     const sumDataLabel = {
//       id: 'sumDataLabel',
//       afterDatasetDraw(chart, args, plugins) {
//         const { ctx, scales: { y } } = chart;

//         const datasetMeta0 = chart.getDatasetMeta(0);
//         const datasetMeta1 = chart.getDatasetMeta(1);
//         const datasetMeta2 = chart.getDatasetMeta(2);

//         datasetMeta0.data.forEach((dataPoint, index) => {
//           let y0 = datasetMeta0.data[index].y;
//           let y1 = datasetMeta1.data[index].y;
//           let y2 = datasetMeta2.data[index].y;

//           if (y0 > 0 || y1 > 0 || y2 > 0) {
//             y0 = datasetMeta0.hidden ? 1000 : y0;
//             y1 = datasetMeta1.hidden ? 1000 : y1;
//             y2 = datasetMeta2.hidden ? 1000 : y2;

//             let newY0 = Math.abs(y0);
//             let newY1 = Math.abs(y1);
//             let newY2 = Math.abs(y2);

//             const value = Math.min(newY0, newY1, newY2);
//             ctx.save();
//             ctx.font = 'bold 12px sans-serif';
//             ctx.textAlign = 'center';
//             ctx.fillStyle = plugins.color || 'black';
//             ctx.fillText(y.getValueForPixel(value).toFixed(0), dataPoint.x, value - 12);
//             ctx.restore();
//           }
//         });
//       },
//     };

//     const config = {
//       type: 'bar',
//       data,
//       options: {
//         legend: {
//           labels: {
//             color: 'white', // Color of the legend labels
//           },
//         },        
//         scales: {
//           x: {
//             stacked: true,
//             title: {
//               color: 'white', // Color of the X-axis title
//             },
//             ticks: {
//               color: 'white', // Color of the X-axis tick labels
//             },
//           },
//           y: {
//             beginAtZero: true,
//             stacked: true,
//             grace: 1,
//             title: {
//               color: 'white', // Color of the X-axis title
//             },
//             ticks: {
//               color: 'white', // Color of the X-axis tick labels
//             },
//           },
//         },
//         plugins: {
//           sumDataLabel: {
//             color: 'white',
//           },
//         },
//       },
//       plugins: [sumDataLabel],
//     };

//     const chartInstance = new Chart(chartRef.current, config);

//     return () => {
//       chartInstance.destroy();
//     };
//   }, []);

//   return (
//     <div style={{marginLeft:'1em', width:'95%', height:'95%',}}>
//           <canvas ref={chartRef} id="myChart"></canvas>
//     </div>
//   );
// };

// export default MeetBarChart;


















import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MeetBarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',],
      datasets: [
        {
          label: 'Business Meeting',
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: '#305BA6',
        },
        {
          label: 'Casual Meeting',
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: '#54ccd2',
        },
        {
          label: 'Interview Meeting',
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: '#d9c9b4',
        },
      ],
    };

    const sumDataLabel = {
      id: 'sumDataLabel',
      afterDatasetDraw(chart, args, plugins) {
        const { ctx, scales: { y } } = chart;

        const datasetMeta0 = chart.getDatasetMeta(0);
        const datasetMeta1 = chart.getDatasetMeta(1);
        const datasetMeta2 = chart.getDatasetMeta(2);

        datasetMeta0.data.forEach((dataPoint, index) => {
          let y0 = datasetMeta0.data[index].y;
          let y1 = datasetMeta1.data[index].y;
          let y2 = datasetMeta2.data[index].y;

          if (y0 > 0 || y1 > 0 || y2 > 0) {
            y0 = datasetMeta0.hidden ? 1000 : y0;
            y1 = datasetMeta1.hidden ? 1000 : y1;
            y2 = datasetMeta2.hidden ? 1000 : y2;

            let newY0 = Math.abs(y0);
            let newY1 = Math.abs(y1);
            let newY2 = Math.abs(y2);

            const value = Math.min(newY0, newY1, newY2);
            ctx.save();
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'; // Set the label color to white
            ctx.fillText(y.getValueForPixel(value).toFixed(0), dataPoint.x, value - 12);
            ctx.restore();
          }
        });
      },
    };

    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          x: {
            stacked: true,
            title: {
              color: 'white', // Color of the X-axis title
            },
            ticks: {
              color: 'white', // Color of the X-axis tick labels
            },
            grid: {
              color: '#404E6B', // Color of the grid lines
            },
          },
          y: {
            beginAtZero: true,
            stacked: true,
            grace: 1,
            title: {
              color: 'white', // Color of the Y-axis title
            },
            ticks: {
              color: 'white', // Color of the Y-axis tick labels
            },
            grid: {
              color: '#404E6B', // Color of the grid lines
            },
          },
        },
        plugins: {
          sumDataLabel: {
            color: 'white',
          },
          legend: {
            labels: {
              color: 'white', // Color of the legend labels
            },
          },
          zoom: {
            pan: {
               enabled: true
            },
            zoom: {
               enabled: true
            }
         },
        },
      },
      plugins: [sumDataLabel],
    };

    const chartInstance = new Chart(chartRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div style={{ marginLeft: '1em', width: '100%', height: '99%', display:'flex',justifyContent:'center'}}>
      <canvas ref={chartRef} id="myChart" width='15000'></canvas>
    </div>
  );
};

export default MeetBarChart;
