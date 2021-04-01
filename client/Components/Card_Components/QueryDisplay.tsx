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
  const handleSubmit = (e: any) => {
    props.byGenre(props.genre);
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-row">
        <h3>Make a query</h3>
        <button
          type="button"
          id="fetchAllMovies"
          onClick={props.allMovies}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          All Movies
        </button>
        <button
          type="button"
          id="fetchAllActors"
          onClick={props.allActors}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          All Actors
        </button>
        <button
          type="button"
          id="fetchByYear"
          onClick={props.byYear}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Movies by Release Year
        </button>

        <form onSubmit={handleSubmit}>
          <div id="dropdown-content">
            <select
              required
              id="genres"
              value={props.genre}
              onChange={props.setGenre}
              className="form-select"
            >
              <option value="">Select the genre</option>
              <option value="ACTION">ACTION</option>
              <option value="SCIFI">SCIFI</option>
              <option value="DRAMA">DRAMA</option>
              <option value="COMEDY">COMEDY</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="ADVENTURE">ADVENTURE</option>
            </select>
          </div>
          <input type="submit" value="Movies by Genre" />
        </form>
      </div>
    </>
  );
};

export default QueryDisplay;
