// import { pool } from './db/db.ts';
import { Pool } from 'https://deno.land/x/postgres/mod.ts';
import { PoolClient } from 'https://deno.land/x/postgres/client.ts';

let pg_port: any = Deno.env.get('PG_PORT');
if (typeof pg_port === 'string') {
  pg_port = parseInt(pg_port);
}

const config = {
  user: Deno.env.get('PG_USER'),
  database: Deno.env.get('PG_DATABASE'),
  password: Deno.env.get('PG_PASSWORD'),
  hostname: Deno.env.get('PG_HOSTNAME'),
  port: pg_port,
};

const POOL_CONNECTIONS = 3; // breaks at 10+ due to ElephantSQL

let pool = new Pool(config, POOL_CONNECTIONS);

const resolvers = {
  Query: {
    movies: async (
      _: any,
      { input }: { input: { genre?: String; order?: String; actor?: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();

        const result = await client.queryObject({
          text: 'SELECT * FROM obsidian_demo_schema.films;',
          args: [],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr.id,
            title: arr.title,
            genre: arr.genre,
            releaseYear: arr.release_dt,
          };
        });

        if (input) {
          if (input.genre) {
            resObj = resObj.filter((obj: any) => obj.genre === input.genre);
          }
          if (input.order) {
            if (input.order === 'ASC') {
              resObj = resObj.sort(
                (a: any, b: any) => a.releaseYear - b.releaseYear
              );
            } else {
              resObj = resObj.sort(
                (a: any, b: any) => b.releaseYear - a.releaseYear
              );
            }
          }
          if (input.actor) {
            try {
              const client: PoolClient = await pool.connect();
              const result = await client.queryObject({
                text: `
                  SELECT film_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE actor_id = $1;
                  `,
                args: [input.actor],
              });
              client.release();
              const arrOfIds = result.rows.map((arr) => arr[0]);
              resObj = resObj.filter((obj: any) => arrOfIds.includes(obj.id));
            } catch (err) {
              console.log(err);
            }
          }
        }
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    actors: async (_: any, { input }: { input: { film?: String } }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: 'SELECT * FROM obsidian_demo_schema.actors;',
          args: [],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr.id,
            firstName: arr.first_name,
            lastName: arr.last_name,
            nickname: arr.nickname,
          };
        });
        if (input) {
          if (input.film) {
            try {
              const client: PoolClient = await pool.connect();
              const result = await client.queryObject({
                text: `
                  SELECT actor_id
                  FROM obsidian_demo_schema.actor_films
                  WHERE film_id = $1;
                  `,
                args: [input.film],
              });
              client.release();
              const arrOfIds = result.rows.map((arr) => arr[0]);
              resObj = resObj.filter((obj) => arrOfIds.includes(obj.id));
            } catch (err) {
              console.log(err);
              console.log('resetting connection');
              pool.end();
              pool = new Pool(config, POOL_CONNECTIONS);
            }
          }
        }
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  Movie: {
    actors: async ({ id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            SELECT a.*
            FROM obsidian_demo_schema.actors AS a
            INNER JOIN obsidian_demo_schema.actor_films AS af
            ON a.id = af.actor_id
            INNER JOIN obsidian_demo_schema.films AS f
            ON f.id =  af.film_id
            WHERE f.id = $1;
            `,
          args: [id],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr.id,
            firstName: arr.first_name,
            lastName: arr.last_name,
            nickname: arr.nickname,
          };
        });
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  Actor: {
    movies: async ({ id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            SELECT f.*
            FROM obsidian_demo_schema.films AS f
            INNER JOIN obsidian_demo_schema.actor_films AS af
            ON f.id = af.film_id
            INNER JOIN obsidian_demo_schema.actors AS a
            ON a.id =  af.actor_id
            WHERE a.id = $1;
            `,
          args: [id],
        });
        client.release();
        let resObj = result.rows.map((arr) => {
          return {
            id: arr.id,
            title: arr.title,
            genre: arr.genre,
            releaseYear: arr.release_dt,
          };
        });
        return resObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
  ActorOrMovie: {
    __resolveType(obj: any) {
      if (obj.firstName || obj.lastName || obj.nickName || obj.movies) {
        return 'Actor';
      }
      if (obj.title || obj.releaseYear || obj.genre || obj.actors) {
        return 'Movie';
      }
      return null;
    },
  },
  Mutation: {
    addMovie: async (
      _: any,
      {
        input,
      }: { input: { title: String; releaseYear: Number; genre: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            INSERT INTO obsidian_demo_schema.films (title,release_dt, genre)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.title, input.releaseYear, input.genre],
        });
        client.release();
        const newMovieArr = result.rows[0];
        const newMovieObj = {
          id: newMovieArr.id,
          title: newMovieArr.title,
          genre: newMovieArr.genre,
          releaseYear: newMovieArr.release_dt,
        };
        return newMovieObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    deleteMovie: async (_: any, { id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            DELETE FROM obsidian_demo_schema.films
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
        client.release();
        const deletedMovieArr = result.rows[0];
        const deletedMovieObj = {
          id: deletedMovieArr.id,
          title: deletedMovieArr.title,
          genre: deletedMovieArr.genere,
          releaseYear: deletedMovieArr.release_dt,
        };
        return deletedMovieObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    addActor: async (
      _: any,
      {
        input,
      }: { input: { firstName: String; lastName: String; nickname?: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            INSERT INTO obsidian_demo_schema.actors (first_name,last_name, nickname)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
          args: [input.firstName, input.lastName, input.nickname],
        });
        client.release();
        const newActorArr = result.rows[0];
        const newActorObj = {
          id: newActorArr.id,
          firstName: newActorArr.first_name,
          lastName: newActorArr.last_name,
          nickname: newActorArr.nickname,
        };
        return newActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    deleteActor: async (_: any, { id }: { id: String }) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            DELETE FROM obsidian_demo_schema.actors
            WHERE id = $1
            RETURNING *;
            `,
          args: [id],
        });
        client.release();
        const deletedActorArr = result.rows[0];
        const deletedActorObj = {
          id: deletedActorArr.id,
          firstName: deletedActorArr.first_name,
          lastName: deletedActorArr.last_name,
          nickname: deletedActorArr.nickname,
        };
        return deletedActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    updateNickname: async (
      _: any,
      { input }: { input: { actorId: String; nickname: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        const result = await client.queryObject({
          text: `
            UPDATE obsidian_demo_schema.actors
            SET nickname = $2
            WHERE id = $1
            RETURNING * ;
            `,
          args: [input.actorId, input.nickname],
        });
        client.release();
        const updatedActorArr = result.rows[0];
        const updatedActorObj = {
          id: updatedActorArr.id,
          firstName: updatedActorArr.first_name,
          lastName: updatedActorArr.last_name,
          nickname: updatedActorArr.nickname,
        };
        return updatedActorObj;
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
    associateActorWithMovie: async (
      _: any,
      {
        input,
      }: { input: { movieId: String; actorId: String; respType: String } }
    ) => {
      try {
        const client: PoolClient = await pool.connect();
        await client.queryObject({
          text: `
          INSERT INTO obsidian_demo_schema.actor_films (film_id, actor_id)
          VALUES ($1, $2)
          `,
          args: [input.movieId, input.actorId],
        });
        client.release();
        if (input.respType === 'MOVIE') {
          const client: PoolClient = await pool.connect();
          const result = await client.queryObject({
            text: `
              SELECT * FROM obsidian_demo_schema.films
              WHERE id = $1
              `,
            args: [input.movieId],
          });
          client.release();
          const MovieArr = result.rows[0];
          const MovieObj = {
            id: MovieArr.id,
            title: MovieArr.title,
            genre: MovieArr.genre,
            releaseYear: MovieArr.release_dt,
          };
          return MovieObj;
        } else {
          const client: PoolClient = await pool.connect();
          const result = await client.queryObject({
            text: `
              SELECT * FROM obsidian_demo_schema.actors
              WHERE id = $1
              `,
            args: [input.actorId],
          });
          client.release();
          const ActorArr = result.rows[0];
          const ActorObj = {
            id: ActorArr.id,
            firstName: ActorArr.first_name,
            lastName: ActorArr.last_name,
            nickname: ActorArr.nickname,
          };
          return ActorObj;
        }
      } catch (err) {
        console.log(err);
        console.log('resetting connection');
        pool.end();
        pool = new Pool(config, POOL_CONNECTIONS);
      }
    },
  },
};

export default resolvers;
