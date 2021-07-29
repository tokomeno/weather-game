import { ICity } from '../../http/cities.http';
import { gameActionTypes, IGameActions } from './game-types';

export enum TemperatureUnit {
  celsius = 'celsius',
  fahrenheit = 'fahrenheit',
}

export interface IUserAnswer {
  isCorrect: boolean;
  userAnswerCityId: number;
  correctCityId: number;
  cities: ICity[];
}

export interface IGameState {
  cities: ICity[];
  userAnswers: IUserAnswer[];
  currentQuestion: { options: ICity[] } | null;
  score: number;
  hasGameDataLoaded: boolean;
  settings: {
    temperatureUnit: TemperatureUnit;
    optionsCount: number;
  };
}

const initState: IGameState = {
  hasGameDataLoaded: false,
  cities: [],
  userAnswers: [],
  currentQuestion: null,
  score: 0,
  settings: {
    temperatureUnit: TemperatureUnit.celsius,
    optionsCount: 3,
  },
};

export const gameReducer = (
  state = initState,
  action: IGameActions
): IGameState => {
  switch (action.type) {
    case gameActionTypes.SET_CITIES_INFO: {
      return {
        ...state,
        cities: action.payload.cities,
        hasGameDataLoaded: true,
        currentQuestion: {
          options: getOptionCities(
            action.payload.cities,
            state.settings.optionsCount
          ),
        },
      };
    }
    case gameActionTypes.SAVE_USER_ANSWER: {
      return {
        ...state,
        userAnswers: [...state.userAnswers, action.payload],
        score: action.payload.isCorrect ? state.score + 1 : state.score,
      };
    }
    case gameActionTypes.RESTART_GAME: {
      return {
        ...state,
        userAnswers: [],
        score: 0,
        currentQuestion: {
          options: getOptionCities(state.cities, state.settings.optionsCount),
        },
      };
    }
    case gameActionTypes.NEXT_QUESTION: {
      return {
        ...state,
        currentQuestion: {
          options: getOptionCities(state.cities, state.settings.optionsCount),
        },
      };
    }
    case gameActionTypes.UPDATE_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};

const getOptionCities = (cities: ICity[], optionCount: number): ICity[] => {
  const citiesCount = cities.length;
  if (!cities || citiesCount < 2) {
    console.error('cities is empty');
    throw Error('Cities does not have enough elements');
  }
  const options = [Math.floor(Math.random() * citiesCount)];
  while (options.length < optionCount) {
    let nextOption = Math.floor(Math.random() * citiesCount);
    if (!options.includes(nextOption)) {
      options.push(nextOption);
    }
  }
  return options.map((index) => cities[index]);
};
