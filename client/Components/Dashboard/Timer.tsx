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
// console.log(Chart);
const Timer = (props: any) => {
  const { queryTime, gqlRequest } = props;
  const chartRef = (React as any).useRef();

  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  const config = {
    type: 'line',
    data,
    options: {},
  };
  console.log((window as any).Chart);
  (React as any).useEffect(() => {
    const myChart = new (window as any).Chart(chartRef.current, config);
  }, []);

  return (
    <div className="timer-query">
      <div>
        <div>
          <canvas id="myChart" ref={chartRef}></canvas>
        </div>
        <code className="text-red-600">{`Request Timer ${queryTime}ms`}</code>
      </div>
    </div>
  );
};
export default Timer;
