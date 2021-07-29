import {
  IRestartGameAction,
  ISetCitiesInfoAction,
  ISaveUserAnswer,
  gameActionTypes,
  INextQuestionAction,
  IUpdateSettingsAction,
} from './game-types';

export const restartGameAction = (): IRestartGameAction => {
  return {
    type: gameActionTypes.RESTART_GAME,
  };
};

export const setCitiesInfoAction = (
  payload: ISetCitiesInfoAction['payload']
): ISetCitiesInfoAction => {
  return {
    payload,
    type: gameActionTypes.SET_CITIES_INFO,
  };
};

export const saveUserAnswerAction = (
  payload: ISaveUserAnswer['payload']
): ISaveUserAnswer => {
  return {
    payload,
    type: gameActionTypes.SAVE_USER_ANSWER,
  };
};

export const nextQuestionAction = (): INextQuestionAction => {
  return {
    type: gameActionTypes.NEXT_QUESTION,
  };
};

export const updateSettingsAction = (
  payload: IUpdateSettingsAction['payload']
): IUpdateSettingsAction => {
  return {
    payload,
    type: gameActionTypes.UPDATE_SETTINGS,
  };
};
