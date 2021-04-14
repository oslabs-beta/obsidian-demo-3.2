import { React } from '../../../deps.ts';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      article: any;
      h3: any;
      h5: any;
      svg: any;
      path: any;
      rect: any;
      img: any;
      strong: any;
    }
  }
}

const Instructions = (props: any) => {
  return (
    <div className="flex align-center border-t mt-1 mb-3 items-center">
      <div className="text-sm pt-3 pb-1 text-gray-400">
        <p className="py-1">
          <strong>Query:</strong> Displays the actual GraphQL query that is
          going to be made. Select an option from the drop down to see the
          different queries available and hit submit when youre ready to test
          out Obsidian!
        </p>
        <p className="py-1">
          <strong>Performance:</strong> Provides the time it took for the
          request to respond. Notice the difference when the data isn't cached?
        </p>
        <p className="py-1">
          <strong>Cache:</strong> We can see our destructured query and
          responses which are currently stored in a local client cache. If you
          query for a specific property that is stored in the cache, the
          Obsidian algorithm will find and return it. Eliminating the need to
          query the database again.
        </p>
        <p className="py-1">
          <strong>Response:</strong> Moments after the query is excecuted, the
          raw response from the GraphQL API is displayed..
        </p>
      </div>
    </div>
  );
};

export default Instructions;
