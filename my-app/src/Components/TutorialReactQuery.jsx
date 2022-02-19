/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios, { CancelToken } from 'axios';
import PostMates from './TutorialPartTwo';
import { GetUsers, InvalidateQueriesButton } from './tutorialPartThree';
import { GetRandomNum } from './tutorialPartThree';
import { CreateTodo } from './MutationsTutorial';
import { TodoList } from './MutationsTutorial';
import CamComponent from './WebCams';

const email = 'Sincere@april.biz';

const DependentQuery = () => {
  const userQuery = useQuery(
    'user',
    async () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  );

  const userId = userQuery.data?.id;

  const postsQuery = useQuery(
    'posts',
    async () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
  );

  return userQuery.isLoading ? (
    'Loading user...'
  ) : (
    <>
      <div className="justify-center flex flex-col items-center text-center">
        <h1 key={userQuery.data.name}>{userQuery.data.name}</h1>
      </div>
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        'Loading posts...'
      ) : (
        <div className="justify-center flex flex-col items-center text-center">
          Post Count: {postsQuery.data.length}
        </div>
      )}
    </>
  );
};

function usePokemon() {
  return useQuery(
    'pokemon',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then((res) => res.data.results);
    },
    {
      staleTime: 5000,
      refetchOnWindowFocus: false,
    },
  );
}

const Count = () => {
  const queryInfo = usePokemon();
  return (
    <div className="flex flex-row justify-center items-center">
      <p className="text-xl font-bold">
        You are looking at {queryInfo.data?.length} pokemon.
      </p>
    </div>
  );
};

const PokemonSearch = ({ pokemon }) => {
  const queryInfo = useQuery(
    ['pokemon', pokemon],
    () => {
      const source = CancelToken.source();
      const promise = new Promise((resolve) => setTimeout(resolve, 1000))
        .then(() => {
          return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            cancelToken: source.token,
          });
        })
        .then((res) => res.data);

      promise.cancel = () => {
        source.cancel('Query was cancelled by React Query');
      };
      return promise;
    },
    {
      enabled: !!pokemon,
      refetchOnWindowFocus: false,
    },
  );

  return queryInfo.isLoading ? (
    'Loading'
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div className="p-6">
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ) : (
        <p>Pokemon not found</p>
      )}
      <br />
      {queryInfo.isFetching ? 'Updating' : null}
    </div>
  );
};

const GetPokemon = () => {
  const queryInfo = usePokemon();
  return queryInfo.isLoading ? (
    'Loading...'
  ) : (
    <ul role="list" className="divide-y divide-gray-200">
      {queryInfo.data.map((pokemon) => (
        <li key={pokemon.name} className="py-4 flex">
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{pokemon.name}</p>
          </div>
        </li>
      ))}
      <br />
      {queryInfo.isFetching && 'Updating...'}
    </ul>
  );
};

async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
}

export default function TutorialReactQuery() {
  const [pokemon, setPokemon] = useState('');
  const [showPosts, setShowPosts] = useState(false);

  const queryClient = useQueryClient();

  const prefetchPosts = async () => {
    console.log('prefetching');
    queryClient.prefetchQuery('posts', fetchPosts, { staleTime: 50000 });
  };

  useEffect(() => {
    prefetchPosts();
  }, []);

  function renderShowPostsButton() {
    return (
      <div className="mb-4 mt-4 flex flex-row justify-center items-center text-align-center">
        <button
          onClick={() => setShowPosts(!showPosts)}
          type="button"
          className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Show Posts
        </button>
      </div>
    );
  }

  return (
    <>
      <CamComponent />

      {/* {renderShowPostsButton()}
      <InvalidateQueriesButton />
      <GetRandomNum subKey="A" />
      <GetRandomNum subKey="B" />
      <GetRandomNum subKey="C" />
      <DependentQuery />
      {showPosts && <PostMates />}
      <GetUsers /> */}
      {/* <div className="p-6">
        <input
          value={pokemon}
          placeholder="Search Pokemon..."
          onChange={(e) => setPokemon(e.target.value)}
          type="text"
          className="p-4 shadow-xl focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800  rounded-md h-12"
        />
      </div>
      <PokemonSearch pokemon={pokemon} />
      <Count />
      <GetPokemon /> */}
    </>
  );
}
