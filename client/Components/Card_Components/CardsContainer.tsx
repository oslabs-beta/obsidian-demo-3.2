import { React, useObsidian, BrowserCache } from '../../../deps.ts';
import CardsDisplay from './CardsDisplay.tsx';
import QueryDisplay from './QueryDisplay.tsx';
import MutationDisplay from './MutationDisplay.tsx';
import DashboardContainer from '../Dashboard/DashboardContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      h2: any;
    }
  }
}

const initialState = {
  firstName: '',
  lastName: '',
  nickname: '',
  title: '',
  releaseYear: '',
};

const useInput = (init: any) => {
  const [value, setValue] = (React as any).useState(init);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

function CardsContainer(props: any) {
  const { query, mutate, cache, setCache, clearCache } = useObsidian();
  const [queryTime, setQueryTime] = (React as any).useState(0);
  const [gqlRequest, setGqlRequest] = (React as any).useState('');
  const [dashResponse, setDashResponse] = (React as any).useState('');
  const [cardsResponse, setCardsResponse] = (React as any).useState('');
  const [display, setDisplay] = (React as any).useState('');
  const [genre, setGenre] = (React as any).useState('');
  const [cardGenre, setCardGenre] = useInput('');
  const [actorResponse, setActorResponse] = (React as any).useState('');
  const [movieResponse, setMovieResponse] = (React as any).useState('');

  const [
    { firstName, lastName, nickname, title, releaseYear },
    setState,
  ] = (React as any).useState(initialState);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };
  const allQueries = {
    allMoviesQuery: `query {
      movies {
        id
        __typename
        title
        releaseYear
        actors {
          id
          __typename
          firstName
          lastName
        }
        genre
      }
    }
  `,

    allActorsQuery: `query {
      actors {
        id
        __typename
        firstName
        lastName
        nickname
        movies {
          id
          __typename
          title
          releaseYear
          genre
        }
      }
    }
  `,

    allMoviesByGenre: `query {
      movies(input: {genre: ${genre}}){
        id
        __typename
        title
        releaseYear
        genre
        actors {
          id
          __typename
          firstName
          lastName
        }
      }
    }
  `,

    moviesByReleaseYear: `query {
    movies(input: {order : ASC }) {
      id
      __typename
      title
      releaseYear
      actors {
        id
        __typename
        firstName
        lastName
      }
      genre
    }
}
  `,

    addMovie: `mutation {
    addMovie(input: {title: "${title}", releaseYear: ${releaseYear}, genre: ${cardGenre} }) {
      id
      title
      releaseYear
      genre
      actors {
        id
        firstName
        lastName
      }
    }

  }
  `,

    addActor: `mutation {
    addActor(input: {firstName: "${firstName}", lastName: "${lastName}", nickname: "${nickname}" }) {
      id
      firstName
      lastName
      nickname
      movies {
        id
        title
        releaseYear
        genre
      }
    }
  }
  `,
  };

  const {
    allMoviesQuery,
    allActorsQuery,
    allMoviesByGenre,
    moviesByReleaseYear,
    addMovie,
    addActor,
  } = allQueries;

  const fetchAllMovies = async (e: any) => {
    setGqlRequest(allMoviesQuery);
    const start = Date.now();
    const res = await query(allMoviesQuery);
    setQueryTime(Date.now() - start);
    const actorRes = await query(allActorsQuery);
    setActorResponse(actorRes.data);
    setDisplay('');
    setDashResponse(res.data);
    setCardsResponse(res.data);
    setDisplay('all movies');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    console.log('all movies', res);
  };

  const fetchAllActors = async (e: any) => {
    setGqlRequest(allActorsQuery);
    const start = Date.now();
    const res = await query(allActorsQuery);
    setQueryTime(Date.now() - start);
    const movieRes = await query(allMoviesQuery);
    setMovieResponse(movieRes.data);
    setDisplay('');
    setDashResponse(res.data);
    setCardsResponse(res.data);
    setDisplay('all actors');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    console.log('all actors', res);
  };

  const fetchMoviesByGenre = async (e: any) => {
    setGqlRequest(allMoviesByGenre);
    const start = Date.now();
    const res = await query(allMoviesByGenre);
    setQueryTime(Date.now() - start);
    const actorRes = await query(allActorsQuery);
    setActorResponse(actorRes.data);
    setDisplay('');
    setDashResponse(res.data);
    setCardsResponse(res.data);
    setDisplay('by genre');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    console.log('by genre', res);
  };

  const fetchReleaseYear = async (e: any) => {
    setGqlRequest(moviesByReleaseYear);
    const start = Date.now();
    const res = await query(moviesByReleaseYear);
    setQueryTime(Date.now() - start);
    const actorRes = await query(allActorsQuery);
    setActorResponse(actorRes.data);
    setDisplay('');
    setDashResponse(res.data);
    setCardsResponse(res.data);
    setDisplay('by year');
    setTimeout(() => setCache(new BrowserCache(cache.storage)), 1);
    console.log('by year', res);
  };

  const newMovieCacheUpdate = async (cache: any, respObj: any) => {
    const result = await cache.read(allMoviesQuery);
    const newMovie = respObj.data.addMovie;
    if (result) {
      const { movies } = result.data;
      const updatedMovieArr = [newMovie, ...movies];
      const updatedRespObj = { data: { movies: updatedMovieArr } };
      await cache.write(allMoviesQuery, updatedRespObj);
    }
    // updating movies by release year
    const resultRelease = await cache.read(moviesByReleaseYear);
    if (resultRelease) {
      const { movies } = resultRelease.data;
      const updatedMovieArr = [newMovie, ...movies];
      const updatedMovieReleaseArr = updatedMovieArr.sort(
        (movie1, movie2) => movie1.releaseYear - movie2.releaseYear
      );
      const updatedRespReleaseObj = {
        data: { movies: updatedMovieReleaseArr },
      };
      await cache.write(moviesByReleaseYear, updatedRespReleaseObj);
    }
    // updating movies by genre
    const movieGenre = newMovie.genre;
    const allMoviesByGenre = `query {
      movies(input: {genre: ${movieGenre}}){
        id
        __typename
        title
        releaseYear
        actors {
          id
          __typename
          firstName
          lastName
        }
      }
    }
  `;
    const resultGenre = await cache.read(allMoviesByGenre);
    if (resultGenre) {
      const { movies } = resultGenre.data;
      const updatedMovieGenreArr = [...movies, newMovie];
      const updatedRespGenreObj = {
        data: { movies: updatedMovieGenreArr },
      };
      await cache.write(allMoviesByGenre, updatedRespGenreObj);
    }
  };

  const addMovieCard = async (e: any) => {
    e.preventDefault();
    setGqlRequest(addMovie);
    const start = Date.now();
    const res = await mutate(addMovie, { update: newMovieCacheUpdate });
    setQueryTime(Date.now() - start);
    setDashResponse(res.data);
    setTimeout(async () => {
      const newRes = await query(allMoviesQuery);
      const actorRes = await query(allActorsQuery);
      setActorResponse(actorRes.data);
      setDisplay('');
      setCardsResponse(newRes.data);
      setDisplay('all movies');
    }, 1);
    await setCache(new BrowserCache(cache.storage));
    await clearState();
    console.log('add movie', res);
  };

  const newActorCacheUpdate = async (cache: any, respObj: any) => {
    const result = await cache.read(allActorsQuery);
    if (!result) return;
    const { actors } = result.data;
    const newActor = respObj.data.addActor;
    const updatedActorArr = [newActor, ...actors];
    const updatedRespObj = { data: { actors: updatedActorArr } };
    await cache.write(allActorsQuery, updatedRespObj);
  };

  const addActorCard = async (e: any) => {
    e.preventDefault();
    setGqlRequest(addActor);
    const start = Date.now();
    const res = await mutate(addActor, { update: newActorCacheUpdate });
    setQueryTime(Date.now() - start);
    if (res.data.addActor.nickname === '') {
      res.data.addActor.nickname = null;
    }
    setDashResponse(res.data);
    setTimeout(async () => {
      const newRes = await query(allActorsQuery);
      const movieRes = await query(allMoviesQuery);
      setMovieResponse(movieRes.data);
      setDisplay('');
      setCardsResponse(newRes.data);
      setDisplay('all actors');
    }, 1);
    await setCache(new BrowserCache(cache.storage));
    await clearState();
    console.log('add card', res);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-around mt-3">
        <QueryDisplay
          id="query-display"
          allMovies={fetchAllMovies}
          allActors={fetchAllActors}
          byGenre={fetchMoviesByGenre}
          byYear={fetchReleaseYear}
          genre={genre}
          setGenre={setGenre}
          allQueries={allQueries}
          setGqlRequest={setGqlRequest}
        />
        <MutationDisplay
          id="mutation-display"
          addMovieCard={addMovieCard}
          addActorCard={addActorCard}
          firstName={firstName}
          lastName={lastName}
          nickname={nickname}
          title={title}
          releaseYear={releaseYear}
          cardGenre={cardGenre}
          setCardGenre={setCardGenre}
          onChange={onChange}
        />
      </div>

      <DashboardContainer
        queryTime={queryTime}
        gqlRequest={gqlRequest}
        dashResponse={dashResponse}
      />
      <div className="flex flex-row justify-center flex-wrap">
        <CardsDisplay
          display={display}
          setDisplay={setDisplay}
          actorResponse={actorResponse}
          movieResponse={movieResponse}
          genre={genre}
          setQueryTime={setQueryTime}
          setCardsResponse={setCardsResponse}
          cardsResponse={cardsResponse}
        />
      </div>
    </div>
  );
}
export { CardsContainer };
