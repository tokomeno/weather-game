import { ICity } from '../../http/cities.http';
import { IGameState, IUserAnswer } from './game-reducers';

export enum gameActionTypes {
  SET_CITIES_INFO = 'SET_CITIES_INFO',
  SAVE_USER_ANSWER = 'USER_HAS_ANSWERED',
  RESTART_GAME = 'RESTART_GAME',
  NEXT_QUESTION = 'NEXT_QUESTION',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
}

export interface IRestartGameAction {
  type: gameActionTypes.RESTART_GAME;
}

export interface ISetCitiesInfoAction {
  payload: {
    cities: ICity[];
  };
  type: gameActionTypes.SET_CITIES_INFO;
}

export interface ISaveUserAnswer {
  payload: IUserAnswer;
  type: gameActionTypes.SAVE_USER_ANSWER;
}

export interface INextQuestionAction {
  type: gameActionTypes.NEXT_QUESTION;
}

export interface IUpdateSettingsAction {
  payload: Partial<IGameState['settings']>;
  type: gameActionTypes.UPDATE_SETTINGS;
}

export type IGameActions =
  | ISetCitiesInfoAction
  | ISaveUserAnswer
  | IRestartGameAction
  | INextQuestionAction
  | IUpdateSettingsAction;
