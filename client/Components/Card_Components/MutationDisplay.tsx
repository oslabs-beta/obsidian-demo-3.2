import { React } from '../../../deps.ts';
// import CardsContainer from './CardsContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      button: any;
      input: any;
      article: any;
      h3: any;
      h5: any;
    }
  }
}

const MutationDisplay = (props: any) => {
  return (
    <div
      className="flex flex-row w-2/3
    "
    >
      <div className="flex flex-col w-full">
        <h3 className="text-white text-center text-lg">Make a mutation</h3>
        <div className="flex flex-row justify-around">
          <form
            className="flex flex-col items-center h-full w-48 justify-around"
            onSubmit={props.addMovieCard}
          >
            <h5 className="text-white text-sm">Enter your movie details</h5>

            <label className="sr-only" htmlFor="title"></label>
            <input
              className="shadow-sm m-1 p-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="title"
              value={props.title}
              onChange={props.onChange}
              placeholder="Title"
              required
            />

            <label className="sr-only" htmlFor="releaseYear"></label>
            <input
              className="shadow-sm m-1 p-1  w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="releaseYear"
              value={props.releaseYear}
              onChange={props.onChange}
              placeholder="Release Year"
              required
            />

            <select
              className="m-1 p-1 block w-full pr-4 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              id="genres"
              value={props.cardGenre}
              onChange={props.setCardGenre}
              required
            >
              <option className="text-gray-500 bg-blue-500" value="">
                Select the genre
              </option>
              <option value="ACTION">ACTION</option>
              <option value="SCIFI">SCIFI</option>
              <option value="DRAMA">DRAMA</option>
              <option value="COMEDY">COMEDY</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="ADVENTURE">ADVENTURE</option>
            </select>

            <button className="p-1 m-1 w-full border-transparent text-sm text-center font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Add Movie
            </button>
          </form>

          <form
            className="flex flex-col h-full w-48 justify-around"
            onSubmit={props.addActorCard}
          >
            <h5 className="text-white text-sm">Enter your actor details</h5>

            <label className="sr-only" htmlFor="firstName"></label>
            <input
              className="shadow-sm m-1 p-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="firstName"
              value={props.firstName}
              onChange={props.onChange}
              placeholder="First Name"
              required
            />

            <label
              className="sr-only"
              htmlFor="las
        tName"
            ></label>
            <input
              className="shadow-sm m-1 p-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="lastName"
              value={props.lastName}
              onChange={props.onChange}
              placeholder="Last Name"
              required
            />

            <label className="sr-only" htmlFor="nickname"></label>
            <input
              className="shadow-sm m-1 p-1 w-full focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              name="nickname"
              value={props.nickname}
              onChange={props.onChange}
              placeholder="Nickname"
            />

            <button className="p-1 m-1 w-full border-transparent text-sm text-center font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Add Actor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MutationDisplay;
