import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MeetBarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const dataEntries = Object.entries(data);

    // const dataEntries = unReversed.reverse();



    const labels = dataEntries.map(([date]) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );

//     let largestCountSum = 0;

// ["BUSINESS", "CASUAL", "INTERVIEW"].forEach(category => {
//   // Find the largest count for the current category
//   const largestCount = Math.max(
//     ...dataEntries.map(
//       ([, meetingData]) => meetingData?.[category]?.count ?? 0
//     )
//   );
//   // Add the largest count to the total sum
//   largestCountSum += largestCount;
// });

// console.log('Largest Count Sum:', largestCountSum);


let largestCountSum = 0;
let largestHourSum = 0;

["BUSINESS", "CASUAL", "INTERVIEW"].forEach(category => {
  const countValues = dataEntries.map(
    ([, meetingData]) => meetingData?.[category]?.count ?? 0
  );
  const largestCount = countValues.length > 0 ? Math.max(...countValues) : 0;

  const hourValues = dataEntries.map(
    ([, meetingData]) => meetingData?.[category]?.hour ?? 0
  );
  const largestHour = hourValues.length > 0 ? Math.max(...hourValues) : 0;

  largestCountSum += largestCount;
  largestHourSum += largestHour;
});

// console.log('Largest Count Sum:', largestCountSum);
// console.log('Largest Hour Sum:', largestHourSum);

let meanScale = 15

if(largestCountSum >= largestHourSum) {
  meanScale = largestCountSum + 15
} else {
  meanScale = largestHourSum + 15
}



    let meow = null;

    if (labels) {
      if (labels.length === 1) {
        meow = 100;
      }
       if (labels.length === 7) {
        meow = 40;
      }
      if (labels.length === 15) {
        meow = 23;
      }
    }

    // meowRef.current = meow;

    const datas = {
      labels: labels,
      datasets: [
        {
          label: "BUSINESS COUNT",
          barThickness: meow,
          // meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["BUSINESS"]?.count ?? 0
          ),
          backgroundColor: "#305BA6",
          stack: "Stack 0",
        },
        {
          label: "CASUAL COUNT",
          barThickness: meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["CASUAL"]?.count ?? 0
          ),
          backgroundColor: "#54ccd2",
          stack: "Stack 0",
        },
        {
          label: "INTERVIEW COUNT",
          barThickness: meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["INTERVIEW"]?.count ?? 0
          ),
          backgroundColor: "#d9c9b4",
          stack: "Stack 0",
        },
        {
          label: "BUSINESS HOUR",
          barThickness: meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["BUSINESS"]?.hour ?? 0
          ),
          backgroundColor: "#094C66",
          stack: "Stack 1",
        },
        {
          label: "CASUAL HOUR",
          barThickness: meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["CASUAL"]?.hour ?? 0
          ),
          backgroundColor: "#1C84A6",
          stack: "Stack 1",
        },
        {
          label: "INTERVIEW HOUR",
          barThickness: meow,
          data: dataEntries.map(
            ([, meetingData]) => meetingData?.["INTERVIEW"]?.hour ?? 0
          ),
          backgroundColor: "#0EA499",
          stack: "Stack 1",
        },
      ],
    };


    const sumDataLabel = {
      id: "sumDataLabel",
      afterDatasetDraw(chart, args, plugins) {
        const {
          ctx,
          scales: { y },
        } = chart;

        const datasetMeta0 = chart.getDatasetMeta(0);
        const datasetMeta1 = chart.getDatasetMeta(1);
        const datasetMeta2 = chart.getDatasetMeta(2);

        const angle = Math.PI / 180;

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
            ctx.translate(dataPoint.x, value - 12);
            ctx.rotate(angle * 270);

            ctx.font = "10px arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#9ca8a8"; 
            // ctx.fillText(
            //   y.getValueForPixel(value).toFixed(0) + "  MEETINGS",
            //   33,
            //   0
            // );
            // console.log('value', value)
            // if(value) {
              ctx.fillText(
                y.getValueForPixel(value).toFixed(0) + "  MEETINGS",
                33,
                0
              );
            // } 
            // else {
            //   ctx.fillText(
            //     "No Record . . .",
            //     33,
            //     0
            //   );
            // }
            ctx.restore();
          }
        });
      },
    };

    const sumDataLabel2 = {
      id: "sumDataLabel2",
      afterDatasetDraw(chart, args, plugins) {
        const {
          ctx,
          scales: { y },
        } = chart;
        const datasetMeta3 = chart.getDatasetMeta(3);
        const datasetMeta4 = chart.getDatasetMeta(4);
        const datasetMeta5 = chart.getDatasetMeta(5);

        const angle = Math.PI / 180;

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
            ctx.translate(dataPoint.x, value - 12);
            ctx.rotate(angle * 270);

            ctx.font = " 10px arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#9ca8a8"; 
            // ctx.fillText(
            //   y.getValueForPixel(value).toFixed(0) + "  HOURS",
            //   33,
            //   0
            // );
            // if(value) {
              ctx.fillText(
                y.getValueForPixel(value).toFixed(0) + " HOURS",
                33,
                0
              );
            // }

            ctx.restore();
          }
        });
      },
    };

    const config = {
      type: "bar",
      data: datas,
      options: {
        Animation: false,
          layout: {
            padding: {
                top: 50
            }
        },

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
            // min: 0,
                // max: 50 ,
                max: meanScale, 
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
              color: 'white',
            },
          },

        //   zoom: {
        //     pan: {
        //        enabled: true
        //     },
        //     zoom: {
        //        enabled: true
        //     }
        //  },

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
    <div
      style={{
        // marginLeft: "1em",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        mb:'1em',
        // backgroundColor:'cyan'
      }}
    >
      <canvas
        ref={chartRef}
        id="myChart"
        // width='15000'
      ></canvas>
     </div>
  );
};

export default MeetBarChart;


