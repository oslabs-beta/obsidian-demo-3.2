import { React, useObsidian, BrowserCache } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      span: any;
      br: any;
      pre: any;
      code: any;
      button: any;
    }
  }
}

const CacheDisplay = (props: any) => {
  const { cache, clearCache, setCache } = useObsidian();
  const { dashResponse } = props;
  function onClick(e: any) {
    console.log('clicked');
    clearCache();
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
  }
  function createCache() {
    // returns an array of arrays
    return Object.entries(cache.storage).reduce((acc: any, pair: any, i) => {
      if (typeof pair[1] === 'object') {
        const insidePair = [];
        let keyInc = 0;
        for (const key in pair[1]) {
          insidePair.push(
            <div key={`${keyInc}keyPair${i}`}>
              <span style={{ color: '#cc99ff' }}>
                {' '}
                {JSON.stringify(key)} :{' '}
              </span>{' '}
              {JSON.stringify(pair[1][key])},
            </div>
          );
          keyInc++;
        }
        acc.push(
          <div key={`pair${i}`}>
            <span style={{ color: '#ff66ff' }}>
              {JSON.stringify(pair[0])} :{' '}
            </span>{' '}
            {'{'}
            {insidePair} {'}'}
          </div>
        );
      } else if (pair[1] === 'DELETED') {
        acc.push(
          <div key={`pair${i}`}>
            <span style={{ color: '#ff66ff' }}>
              {JSON.stringify(pair[0])} :{' '}
            </span>{' '}
            {JSON.stringify(pair[1])}
          </div>
        );
      }
      return acc;
    }, []);
  }
  const cachedPair = createCache();

  return (
    <div className="w-boxes h-boxes bg-black shadow border overflow-x-hidden rounded-xl m-3">
      <div className="w-full h-full rounded-xl overflow-auto">
        <div className="px-4 py-3 sm:p-6">
          <pre className="flex flex-column overflow-hidden text-white">
            <div className="flex flex-row justify-between">
              <div>Cache:</div>
              <button
                type="button"
                className="content-center bg-transparent  text-indigo-700 hover:text-indigo-800 focus:outline-none"
                onClick={onClick}
              >
                Clear Cache
              </button>
            </div>
            <code className="text-wrap text-pink-600">
              {'{'}
              {cachedPair}
              {'}'}
            </code>
            <button
              type="button"
              className="content-center px-4 py-2 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={onClick}
            >
              Clear Cache
            </button>
          </pre>
        </div>
      </div>
    </div>
  );
};
export default CacheDisplay;
