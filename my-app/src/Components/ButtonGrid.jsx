import React, { useState } from 'react';
import { shuffle } from 'lodash';
import { generateRandomCountry } from './WebCams';
import { COUNTRY_KEYS } from './WebCams';

export function GridButton({ id, checkIfCorrectHandler }) {
  return (
    <div className="m-0">
      <button
        id={id}
        onClick={(e) => checkIfCorrectHandler(e.target.id)}
        type="button"
        className="relative inline-flex items-center px-7 py-4 rounded-l border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
        {id}
      </button>
    </div>
  );
}

export function GuessTheCountry({
  location,
  countries,
  setLocation,
  setCurrentScore,
  currentScore,
}) {
  const countriesMap = {};
  let mapCount = 0;

  while (mapCount < 8) {
    const country = countries[Math.floor(Math.random() * 246)];
    if (country in countriesMap === false) {
      countriesMap[country] = country;
      mapCount++;
    }
  }

  const preShuffle = Object.keys(countriesMap).concat(location);
  const postShuffle = shuffle(preShuffle);
  console.log(postShuffle);

  const checkIfCorrectHandler = (country) => {
    if (country === location) {
      setCurrentScore(currentScore + 1);
      setLocation(generateRandomCountry(COUNTRY_KEYS));
    }
  };

  return (
    <>
      <></>
      <>
        <div className="grid grid-cols-3 auto-cols-auto place-items-center gap-0 mx-36 mt-4 mb-4 w-auto">
          {postShuffle.map((place) => {
            return (
              <GridButton
                key={place}
                id={place}
                checkIfCorrectHandler={checkIfCorrectHandler}
              />
            );
          })}
          {/* <div className="z-0 shadow-sm rounded-lg">
            <button
              id={postShuffle[0]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="relative inline-flex items-center px-7 py-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[0]}
            </button>
            <button
              id={postShuffle[1]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px inline-flex relative items-center px-7 py-4 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[1]}
            </button>
            <button
              id={postShuffle[2]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px inline-flex relative items-center px-7 py-4 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[2]}
            </button>
          </div>
          <div className=" z-0 shadow-sm rounded-lg">
            <button
              id={postShuffle[3]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="relative inline-flex items-center px-7 py-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[3]}
            </button>
            <button
              id={postShuffle[4]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px inline-flex relative items-center px-7 py-4 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[4]}
            </button>
            <button
              id={postShuffle[5]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px inline-flex relative items-center px-7 py-4 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[5]}
            </button>
          </div>
          <div className="z-0 shadow-sm rounded-lg">
            <button
              id={postShuffle[6]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="relative inline-flex items-center px-7 py-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[6]}
            </button>
            <button
              id={postShuffle[7]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px relative inline-flex  items-center px-7 py-4 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[7]}
            </button>
            <button
              id={postShuffle[8]}
              onClick={(e) => checkIfCorrectHandler(e.target.id)}
              type="button"
              className="-ml-px relative inline-flex items-center px-7 py-4 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              {postShuffle[8]}
            </button>
          </div> */}
        </div>
      </>
    </>
  );
}
