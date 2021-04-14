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
      <div className="flex flex-row items-center w-full h-boxes items-stretch sm:flex-column">
        <Query gqlRequest={gqlRequest} />
        <Performance queryTime={queryTime} />
      </div>
      <div className="flex flex-row items-center w-full h-boxes items-stretch sm:flex-column">
        <CacheDisplay dashResponse={dashResponse} />
        <Response dashResponse={dashResponse} />
      </div>
    </div>
  );
};
export default DashboardContainer;
