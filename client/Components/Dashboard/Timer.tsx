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
    }
  }
}

const Timer = (props: any) => {
  const { queryTime, gqlRequest } = props;

  return (
    <div className="timer-query">
      <div>
        <code className="text-red-600">{`Request Timer ${queryTime}ms`}</code>
      </div>
    </div>
  );
};
export default Timer;
