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

const Query = (props: any) => {
  const { gqlRequest } = props;

  return (
    <div className="w-11/12 h-11/12 bg-black overflow-hidden shadow rounded-xl m-4">
      <div className="px-4 py-5 sm:p-6">
        <pre className="text-indigo-600">
          Query:
          <code className="text-indigo-500">{gqlRequest}</code>
        </pre>
      </div>
    </div>
  );
};
export default Query;
