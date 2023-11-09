import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MeetBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const dataEntries = Object.entries(data);

    // const dataEntries = unReversed.reverse();

    const labels = dataEntries.map(([date]) => new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }));

    const datasets = [
      {
        label: 'Business',
        data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS'] || 0),
        backgroundColor: '#305BA6',
      },
      {
        label: 'Casual',
        data: dataEntries.map(([, meetingData]) => meetingData['CASUAL'] || 0),
        backgroundColor: '#54ccd2',
      },
      {
        label: 'Interview',
        data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW'] || 0),
        backgroundColor: '#d9c9b4',
      },
    ];

    const datas = {
      labels: labels,
      datasets: [
        {
          label: 'BUSINESS',
            data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS'] || 0),
            backgroundColor: '#305BA6',
          stack: 'Stack 0',
        },
        {
          label: 'CASUAL',
            data: dataEntries.map(([, meetingData]) => meetingData['CASUAL'] || 0),
            backgroundColor: '#54ccd2',
          stack: 'Stack 0',
        },
        {
          label: 'INTERVIEW',
            data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW'] || 0),
            backgroundColor: '#d9c9b4',
          stack: 'Stack 0',
        },
        {
          label: 'BUSINESS',
            data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS_HOUR'] || 0),
            backgroundColor: '#094C66',
          stack: 'Stack 1',
        },
        {
          label: 'CASUAL',
            data: dataEntries.map(([, meetingData]) => meetingData['CASUAL_HOUR'] || 0),
            backgroundColor: '#1C84A6',
          stack: 'Stack 1',
        },
        {
          label: 'INTERVIEW',
            data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW_HOUR'] || 0),
            backgroundColor: '#0EA499',
          stack: 'Stack 1',
        },
      ]
    };


        const sumDataLabel = {
      id: 'sumDataLabel',
      afterDatasetDraw(chart, args, plugins) {
        const { ctx, scales: { y } } = chart;

        const datasetMeta0 = chart.getDatasetMeta(0);
        const datasetMeta1 = chart.getDatasetMeta(1);
        const datasetMeta2 = chart.getDatasetMeta(2);
        const datasetMeta3 = chart.getDatasetMeta(3);
        const datasetMeta4= chart.getDatasetMeta(4);
        const datasetMeta5= chart.getDatasetMeta(5);

        datasetMeta0.data.forEach((dataPoint, index) => {
          let y0 = datasetMeta0.data[index].y;
          let y1 = datasetMeta1.data[index].y;
          let y2 = datasetMeta2.data[index].y;
          let y3 = datasetMeta3.data[index].y;
          let y4 = datasetMeta4.data[index].y;
          let y5 = datasetMeta5.data[index].y;

          if (y0 > 0 || y1 > 0 || y2 > 0) {
            y0 = datasetMeta0.hidden ? 1000 : y0;
            y1 = datasetMeta1.hidden ? 1000 : y1;
            y2 = datasetMeta2.hidden ? 1000 : y2;

            let newY0 = Math.abs(y0);
            let newY1 = Math.abs(y1);
            let newY2 = Math.abs(y2);

            const value = Math.min(newY0, newY1, newY2);
            ctx.save();
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'; // Set the label color to white
            ctx.fillText(y.getValueForPixel(value).toFixed(0)+'  MEETINGS', dataPoint.x, value - 12);
            ctx.restore();
          }

        });
      },
    };

    const sumDataLabel2 = {
      id: 'sumDataLabel2',
      afterDatasetDraw(chart, args, plugins) {
        const { ctx, scales: { y } } = chart;
        const datasetMeta3 = chart.getDatasetMeta(3);
        const datasetMeta4= chart.getDatasetMeta(4);
        const datasetMeta5= chart.getDatasetMeta(5);

        datasetMeta3.data.forEach((dataPoint, index) => {
          let y3 = datasetMeta3.data[index].y;
          let y4 = datasetMeta4.data[index].y;
          let y5 = datasetMeta5.data[index].y;

          if (y3 > 0 || y4 > 0 || y5 > 0) {
            y3 = datasetMeta3.hidden ? 1000 : y3;
            y4 = datasetMeta4.hidden ? 1000 : y4;
            y5 = datasetMeta5.hidden ? 1000 : y5;

            let newY3 = Math.abs(y3);
            let newY4 = Math.abs(y4);
            let newY5 = Math.abs(y5);

            const value = Math.min(newY3, newY4, newY5);
            ctx.save();
            ctx.font = ' 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white'; // Set the label color to white
            ctx.fillText(y.getValueForPixel(value).toFixed(0)+ '  HOURS', dataPoint.x, value - 12);
            ctx.restore();
          }

        });
      },
    };

    const config = {
      type: 'bar',
      data: datas,
      options: {
        scales: {
          x: {
            stacked: true,
            title: {
              color: 'white',
            },
            ticks: {
              color: 'white',
            },
            grid: {
              color: '#404E6B',
            },
          },
          y: {
            beginAtZero: true,
            stacked: true,
            grace: 1,
            title: {
              color: 'white',
            },
            ticks: {
              color: 'white',
            },
            grid: {
              color: '#404E6B',
            },
          },
        },
        plugins: {
          sumDataLabel: {
            color: 'white',
          },
          sumDataLabel2: {
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
      plugins: [sumDataLabel, sumDataLabel2],
    };

    const chartInstance = new Chart(chartRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div style={{ marginLeft: '1em', width: '100%', height: '99%', display: 'flex', justifyContent: 'center' }}>
      <canvas ref={chartRef} id="myChart" 
      // width='15000'
      ></canvas>
    </div>
  );
};

export default MeetBarChart;





















// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const MeetBarChart = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (!chartRef.current || !data) return;

//     const dataEntries = Object.entries(data);

//     const labels = dataEntries.map(([date]) =>
//       new Date(date).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//       })
//     );

//     const datasets1 = [
//       {
//         label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS'] || 0),
//         backgroundColor: '#305BA6',
//       },
//       {
//         label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['CASUAL'] || 0),
//         backgroundColor: '#54ccd2',
//       },
//       {
//         label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW'] || 0),
//         backgroundColor: '#d9c9b4',
//       },
//     ];

//     const datasets2 = [
//       {
//         label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS_HOUR'] || 0),
//         backgroundColor: '#305BA6',
//       },
//       {
//         label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['CASUAL_HOUR'] || 0),
//         backgroundColor: '#54ccd2',
//       },
//       {
//         label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW_HOUR'] || 0),
//         backgroundColor: '#d9c9b4',
//       },
//     ]


// const datas = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS'] || 0),
//         backgroundColor: '#305BA6',
//       stack: 'Stack 0',
//     },
//     {
//       label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['CASUAL'] || 0),
//         backgroundColor: '#54ccd2',
//       stack: 'Stack 0',
//     },
//     {
//       label: 'Meetings',
//         data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW'] || 0),
//         backgroundColor: '#d9c9b4',
//       stack: 'Stack 0',
//     },
//     {
//       label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['BUSINESS_HOUR'] || 0),
//         backgroundColor: '#305BA6',
//       stack: 'Stack 1',
//     },
//     {
//       label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['CASUAL_HOUR'] || 0),
//         backgroundColor: '#54ccd2',
//       stack: 'Stack 1',
//     },
//     {
//       label: 'Hours',
//         data: dataEntries.map(([, meetingData]) => meetingData['INTERVIEW_HOUR'] || 0),
//         backgroundColor: '#d9c9b4',
//       stack: 'Stack 1',
//     },
//   ]
// };

//     const config = {
//       type: 'bar',
//       data: datas,
//       options: {
//         plugins: {
//           title: {
//             display: true,
//             text: 'Chart.js Bar Chart - Stacked'
//           },
//         },
//         responsive: true,
//         interaction: {
//           intersect: false,
//         },
//         scales: {
//           x: {
//             stacked: true,
//           },
//           y: {
//             stacked: true
//           }
//         }
//       }
//     };

//     const chartInstance = new Chart(chartRef.current, config);

//     return () => {
//       chartInstance.destroy();
//     };
//   }, [data]);

//   return (
//     <div style={{ marginLeft: '1em', width: '100%', height: '99%', display: 'flex', justifyContent: 'center' }}>
//       <canvas ref={chartRef} id="myChart"></canvas>
//     </div>
//   );
// };

// export default MeetBarChart;
