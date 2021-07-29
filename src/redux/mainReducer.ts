import { combineReducers } from 'redux';
import { gameReducer, IGameState } from './game/game-reducers';

export interface IStoreState {
  game: IGameState;
}

export const reducers = combineReducers<IStoreState>({
  game: gameReducer,
});
