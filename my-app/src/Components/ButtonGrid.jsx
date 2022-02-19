import React, { useState } from 'react';
import { shuffle } from 'lodash';
import { generateRandomCountry } from './WebCams';
import { COUNTRY_KEYS } from './WebCams';

const DEFAULT_BUTTON_CLASS =
  'cursor-pointer border border-1 border-blue-200 text-center w-full p-4 sm:w-1/2 lg:w-1/3 text-gray-700 bg-blue-100 hover:bg-blue-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg';

const INCORRECT_BUTTON_CLASS =
  'cursor-pointer border border-1 border-red-200 text-center w-full p-4 sm:w-1/2 lg:w-1/3 text-gray-700 bg-red-100 hover:bg-red-200 focus:ring-1 focus:ring-red-500 focus:border-red-500 rounded-lg';

export function GridButton({ id, checkIfCorrectHandler }) {
  const [isIncorrect, setIsIncorrect] = useState(false);
  return (
    <div
      className={!isIncorrect ? DEFAULT_BUTTON_CLASS : INCORRECT_BUTTON_CLASS}
      id={id}
      onClick={(e) => {
        if (isIncorrect) return;
        checkIfCorrectHandler(e.target.id);
        setIsIncorrect(true);
      }}>
      {id}
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
  let availablePoints = 6;
  const countriesMap = {};
  let mapCount = 0;

  while (mapCount < 5) {
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
      setCurrentScore(currentScore + availablePoints);
      setLocation(generateRandomCountry(COUNTRY_KEYS));
    } else {
      availablePoints--;
    }
  };

  return (
    <>
      <>
        <div className="max-w-screen-xl mx-auto px-4 my-6">
          <div className="-mx-4 flex flex-wrap">
            {postShuffle.map((place) => {
              return (
                <GridButton
                  key={place}
                  id={place}
                  checkIfCorrectHandler={checkIfCorrectHandler}
                />
              );
            })}
          </div>
        </div>
      </>
    </>
  );
}
