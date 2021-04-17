import { React, useObsidian } from '../../../deps.ts';
import Response from './Response.tsx';
import Performance from './Performance.tsx';
import Query from './Query.tsx';
import CacheDisplay from './CacheDisplay.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
      h2: any;
    }
  }
}
const DashboardContainer = (props: any) => {
  const { queryTime, gqlRequest, dashResponse } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap justify-center w-full items-stretch">
        <Query gqlRequest={gqlRequest} />
        <Performance queryTime={queryTime} />
        <CacheDisplay dashResponse={dashResponse} />
        <Response dashResponse={dashResponse} />
      </div>
    </div>
  );
};
export default DashboardContainer;
