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
    <div className="w-11/12 bg-black border shadow rounded-xl m-4">
      <div className=" px-4 py-3 sm:p-6">
        <pre className=" flex flex-column text-white">
          Query:
          <code className="text-green-500">{gqlRequest}</code>
        </pre>
      </div>
    </div>
  );
};
export default Query;
