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
      <div className="w-11/12 bg-black border overflow-hidden shadow rounded-xl ml-2 mt-4 mr-4 mb-2">
        <div className="flex flex-column px-4 py-3 sm:p-6 text-white">
          Performance:
          <Timer queryTime={queryTime} gqlRequest={gqlRequest} />
        </div>
      </div>
    </>
  );
};
export default Performance;
