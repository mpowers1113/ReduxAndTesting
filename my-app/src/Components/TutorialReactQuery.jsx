/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios, { CancelToken } from 'axios';

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

      Promise.cancel = () => {
        source.cancel('Query was cancelled by React Query');
      };
      return promise;
    },
    {
      enabled: !!pokemon,
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

export default function TutorialReactQuery() {
  const [pokemon, setPokemon] = useState('');
  return (
    <>
      <div className="p-6">
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
      <GetPokemon />
    </>
  );
}
