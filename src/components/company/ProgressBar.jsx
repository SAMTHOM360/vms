
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import '../../css/ProgressBar.css';

const ProgressBar = () => {
    useEffect(() => {
        // Setup data
        const data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Weekly Total Meeting Hours',
                data: [10, 12, 6, 9, 12, 3, 9],
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
                }
            },
            plugins: [progressBar]
        };

        // Render chart

        
        const chartCanvas = document.getElementById('myChart');
        new Chart(chartCanvas, config);

        // Instantly assign Chart.js version
        const chartVersion = document.getElementById('chartVersion');
        // chartVersion.innerText = Chart.version;
    }, []);

    return (
        <div>
            <div className="chartMenu">
                {/* <p>Meeting Hours </p> */}
                {/* <p>Meeting Hours ( <span id="chartVersion"></span>)</p> */}
            </div>
            <div className="chartCard">
                <div className="chartBox">
                    <canvas id="myChart" style={{height:"500px",width:"900px"}}></canvas>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;












