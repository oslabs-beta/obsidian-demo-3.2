import { React, useObsidian } from '../../../deps.ts';
import Timer from './Timer.tsx';
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

const Performance = (props: any) => {
  const { queryTime, gqlRequest } = props;
  const query = `query AllMoviesByDate {
    movies(sort: { release: ASC }) {
      __typename
      id
      title
      releaseYear
      genre
      isFavorite
    }
  }
`;
  return (
    <>
      <div className="w-11/12 h-11/12 bg-black overflow-hidden shadow rounded-xl m-4">
        <div className="px-4 py-5 sm:p-6">
          <Timer queryTime={queryTime} gqlRequest={gqlRequest} />
        </div>
      </div>
    </>
  );
};
export default Performance;
