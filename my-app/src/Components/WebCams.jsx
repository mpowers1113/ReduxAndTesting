/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import { useQuery, useQueryClient, QueryClient } from 'react-query';
import axios from 'axios';
import countryCodes from '../iso-code.json.json';
import { GuessTheCountry } from './ButtonGrid';
import { WEBCAMKEY } from '../apiKey';

export const COUNTRY_KEYS = Object.keys(countryCodes);
const COUNTRY_CODE = 'Alpha-2 code';

async function fetchCamLocation(location) {
  console.log(location, 'from the fetch');

  return axios
    .get(
      `https://webcamstravel.p.rapidapi.com/webcams/list/country=${location}/orderby=popularity/limit=20?show=webcams:location,image`,
      {
        headers: {
          'x-rapidapi-host': 'webcamstravel.p.rapidapi.com',
          'x-rapidapi-key': WEBCAMKEY,
        },
      },
    )
    .then((res) => res.data);
}

export function UseWebCams({
  location,
  country,
  setLocation,
  setCurrentScore,
  currentScore,
}) {
  console.log('from use web cams', location, 'country', country);

  const { isLoading, isError, data, error, isFetching } = useQuery(
    ['location', location],
    () => fetchCamLocation(location),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (!isLoading) console.log(data);

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : data.result.webcams.length > 0 ? (
        <>
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {data.result.webcams.map((cam) => (
              <li key={cam.id} className="relative">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <img
                    src={cam.image.current.preview}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {cam.location.city}, {cam.location.country}
                </p>
              </li>
            ))}
          </ul>
          <GuessTheCountry
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            setLocation={setLocation}
            location={country}
            countries={COUNTRY_KEYS}
          />
        </>
      ) : (
        <div className="flex flex-row justify-center items-center mb-4">
          <h1 className="text-2xl text-center">{`Nothing found for ${country} 😱`}</h1>
        </div>
      )}
      {isFetching && (
        <div className="flex flex-row justify-center align-middle items-center mt-2 mb-4">
          <p>Updating...</p>
        </div>
      )}
      {isError && (
        <div className="flex flex-row justify-center align-middle items-center mt-2 mb-4">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

export function generateRandomCountry(countryKeys) {
  return countryKeys[Math.floor(Math.random() * 246)];
}

export default function CamComponent() {
  const [location, setLocation] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  function renderScore() {
    return (
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="p-4">
          <h1>Guess the correct country!</h1>
        </div>
        <div className="p-4">
          <h1>{`Current Score: ${currentScore}`}</h1>
        </div>
      </div>
    );
  }

  if (location)
    console.log(location, 'countryCodes', countryCodes[location][COUNTRY_CODE]);

  return (
    <>
      {renderScore()}
      <div className="flex flex-row justify-center items-center p-4">
        <div>
          <button
            onClick={() => {
              setLocation(generateRandomCountry(COUNTRY_KEYS));
            }}
            className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Generate Random Location
          </button>
        </div>
      </div>
      <>
        {location && (
          <UseWebCams
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            setLocation={setLocation}
            location={countryCodes[location][COUNTRY_CODE]}
            country={location}
          />
        )}
      </>
    </>
  );
}
