import React from 'react';
import api from '../apis/streams';
import { useQuery, useQueryClient } from 'react-query';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

export const GetUsers = () => {
  const { isLoading, isError, data, error, isFetching } = useQuery(
    'allUsers',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return api.get('/users').then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 50000,
    },
  );

  const snipUsers = data?.slice(0, 10);

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  return (
    <>
      <div>
        {snipUsers.map((user) => (
          <p key={user.id}>{user.first_name}</p>
        ))}
      </div>
      <div>{isFetching && <p>Updating...</p>}</div>
    </>
  );
};

export const InvalidateQueriesButton = () => {
  const queryClient = useQueryClient();

  return (
    <div className="mb-4 mt-4 flex flex-row justify-center items-center text-align-center">
      <button
        onClick={() => queryClient.invalidateQueries('randomNum')}
        type="button"
        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Invalidate Queries
      </button>
    </div>
  );
};

export const GetRandomNum = ({ subKey }) => {
  const { isLoading, isError, data, error } = useQuery(
    ['randomNum', subKey],
    async () => {
      return api.get('/random').then((res) => res.data);
    },
    {
      staleTime: Infinity,
    },
  );

  const randomNum = Math.floor(Math.random() * 9);
  const randomIndex = data ? data[randomNum] : null;

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-row justify-start items-center p-4">
        <h1 className="text-2xl font-bold mr-2">Random Number:</h1>
        <h1 className="text-2xl">
          {' '}
          {Math.round(randomIndex * Math.random() * 1000)}
        </h1>
      </div>
    </>
  );
};
