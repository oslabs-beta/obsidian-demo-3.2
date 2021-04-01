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
    <div className="w-11/12 h-full bg-black overflow-auto shadow rounded-xl m-4">
      <div className="px-4 py-5 sm:p-6">
        <pre className="pre-block" id="cacheDisplay">
          Cache:
          <code className="text-pink-600">
            {'{'}
            {cachedPair}
            {'}'}
          </code>
          <button type="button" id="clear-cache" onClick={onClick}>
            Clear Cache
          </button>
        </pre>
      </div>
    </div>
  );
};
export default CacheDisplay;
