import { React } from '../../../deps.ts';
// import CardsContainer from './CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      label: any;
      select: any;
      option: any;
      form: any;
      h3: any;
    }
  }
}

const QueryDisplay = (props: any) => {
  const {
    byGenre,
    allMovies,
    allActors,
    byYear,
    genre,
    setGenre,
    allQueries,
    setGqlRequest,
  } = props;
  const genreOptions = [
    'ACTION',
    'SCIFI',
    'DRAMA',
    'COMEDY',
    'ROMANCE',
    'ADVENTURE',
  ];

  const {
    allMoviesQuery,
    allActorsQuery,
    allMoviesByGenre,
    moviesByReleaseYear,
    addMovie,
    addActor,
  } = allQueries;

  const [type, setType] = (React as any).useState('');

  (React as any).useEffect(() => {
    setGqlRequest(allMoviesByGenre);
    console.log('butts');
  }, [genre]);

  const handleDropChange = (selection: any) => {
    setType(selection);
    if (selection === 'ALLMOVIES') setGqlRequest(allMoviesQuery);
    else if (selection === 'ALLACTORS') setGqlRequest(allActorsQuery);
    else if (selection === 'MOVIESYEAR') setGqlRequest(moviesByReleaseYear);
    else if (genreOptions.includes(selection)) {
      setGenre(selection);
    }
  };

  const handleSubmit = (e: any) => {
    if (type === 'ALLMOVIES') allMovies();
    if (type === 'ALLACTORS') allActors();
    if (type === 'MOVIESYEAR') byYear();
    else if (genreOptions.includes(type)) {
      byGenre(genre);
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row w-1/3 border-r justify-center ">
        <div className="flex flex-col items-center">
          <h3 className="text-white text-lg">Make a query</h3>

          <form
            className="flex flex-col pt-12 pb-1 w-48 h-full justify-between"
            onSubmit={handleSubmit}
          >
            <div>
              <select
                required
                id="genres"
                value={type}
                onChange={(e: any) => handleDropChange(e.target.value)}
                // value={type}
                // onChange={setGenre}
                className="m-1 p-1 block w-full  pr-4 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Query</option>
                <option value="ALLMOVIES">All Movies</option>
                <option value="ALLACTORS">All Actors</option>
                <option value="MOVIESYEAR">Movies by Year</option>
                <option value="ACTION">Action Movies</option>
                <option value="SCIFI">Scifi Movies</option>
                <option value="DRAMA">Drama Movies</option>
                <option value="COMEDY">Comedy Movies</option>
                <option value="ROMANCE">Romance Movies</option>
                <option value="ADVENTURE">Adventure Moves</option>
              </select>
            </div>
            <div>
              <input
                className="p-1 m-1 w-full border-transparent text-sm text-center font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                type="submit"
                value="Submit Query"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QueryDisplay;
