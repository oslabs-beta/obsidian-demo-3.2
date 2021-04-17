import { React, useObsidian } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      br: any;
      pre: any;
      code: any;
      label: any;
      select: any;
      option: any;
      p: any;
      input: any;
      canvas: any;
    }
  }
}

const Timer = (props: any) => {
  const { queryTime, gqlRequest } = props;
  const chartRef = (React as any).useRef();

  const [labels, setlables] = (React as any).useState([0]);
  let [perfChart, setPerfChart] = (React as any).useState();

  //This creates the chart initially with the canvas element as context
  //It could likely use some refactoring, the use of useState and useEffect is a little strange. We used useState to allow the data to persist, but had to initialize through useEffect. Seems like there should be a better way to do this, but ran out of time.
  (React as any).useEffect(() => {
    perfChart = new (window as any).Chart(chartRef.current, config);
    setPerfChart(perfChart);
  }, []);

  //this is watching queryTime to update the chart, if the time stays constant from request to request the chart will not update as of now. Should possibly tie this to onSubmit or create another watchdog.
  (React as any).useEffect(() => {
    addData(perfChart, labels, queryTime);
  }, [queryTime]);

  //allows adding of data to chart
  function addData(chart: any, label: any, data: any) {
    chart.data.labels.push(labels[labels.length - 1] + 1);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  //initial data for chart
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: 0,
      },
    ],
  };

  //configuration for chart
  const config = {
    type: 'line',
    data,
    options: {
      aspectRatio: 1.5,
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 600,
          ticks: {
            // Include a ms sign in the ticks
            callback: function (value: any, index: any, values: any) {
              return value + ' ms';
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'rgb(255, 99, 132)',
          },
        },
      },
    },
  };

  return (
    <div className="timer-query">
      <div className="flex justify-end">
        <code className="text-blue-500">{`Response Time: ${queryTime}ms`}</code>
      </div>
      <div>
        <canvas id="myChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
};
export default Timer;
