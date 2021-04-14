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

  const [resTimes, setResTimes] = (React as any).useState([]);
  const [labels, setlables] = (React as any).useState([0]);

  function addData(chart: any, label: any, data: any) {
    chart.data.labels.push(labels[labels.length - 1] + 1);
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  const data = {
    labels: labels,
    datasets: [
      {
        // label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: 0,
      },
    ],
  };

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
            // Include a dollar sign in the ticks
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
  // const newChart: any = new (window as any).Chart(chartRef.current, config);

  let [myChart, setMyChart] = (React as any).useState();

  console.log(myChart);
  (React as any).useEffect(() => {
    myChart = new (window as any).Chart(chartRef.current, config);
    setMyChart(myChart);
  }, []);

  (React as any).useEffect(() => {
    addData(myChart, labels, queryTime);
  }, [queryTime]);

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
