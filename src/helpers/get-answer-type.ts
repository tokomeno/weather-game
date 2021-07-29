import { ICity } from '../http/cities.http';
import { IUserAnswer } from '../redux/game/game-reducers';

export const getAnswerType = (answer: IUserAnswer, city: ICity) => {
  if (city.id === answer.correctCityId) return 'correct';
  if (answer.userAnswerCityId === city.id) return 'wrong';
};
