import { React, useObsidian } from '../../../deps.ts';
import CacheResponseDisplay from './CacheResponse&Display.tsx';
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
  const { query, cache, setCache, clearCache } = useObsidian();
  return (
    <div className="flex flex-row h-96">
      <div className="flex flex-col items-center w-1/2 h-96 bg-gray-500">
        <Query gqlRequest={gqlRequest} />
        <Performance queryTime={queryTime} />
      </div>
      <div className="flex flex-col items-center w-1/2 h-96  bg-gray-300">
        <CacheDisplay dashResponse={dashResponse} />
        <Performance queryTime={queryTime} gqlRequest={gqlRequest} />
        {/* <CacheResponseDisplay dashResponse={dashResponse} /> */}
      </div>
    </div>
  );
};
export default DashboardContainer;
