import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { Option } from '../../components/option/option';
import { IStoreState } from '../../redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestionAction,
  restartGameAction,
  saveUserAnswerAction,
} from '../../redux/game/game-actions';
import { ICity } from '../../http/cities.http';
import { findHottest } from '../../helpers/is-hottest';
import { IUserAnswer } from '../../redux/game/game-reducers';
import { getAnswerType } from '../../helpers/get-answer-type';

interface Props {}

export const GamePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const score = useSelector((state: IStoreState) => state.game.score);
  const currentQuestion = useSelector(
    (state: IStoreState) => state.game.currentQuestion!
  );
  const [currentAnswer, setCurrentAnswer] = useState<IUserAnswer | null>(null);

  const nextQuestion = () => {
    setCurrentAnswer(null);
    dispatch(nextQuestionAction());
  };

  const onAnswer = (city: ICity) => {
    if (currentAnswer) return;
    const correctCityId = findHottest(currentQuestion.options).id;
    const answer = {
      isCorrect: city.id === correctCityId,
      userAnswerCityId: city.id,
      cities: currentQuestion.options,
      correctCityId,
    };
    setCurrentAnswer(answer);
    dispatch(saveUserAnswerAction(answer));
  };

  return (
    <div>
      <button
        onClick={() => push(routes.settings())}
        className="btn btn-primary mb-4"
      >
        Settings
      </button>

      <button
        onClick={() => {
          dispatch(restartGameAction());
          setCurrentAnswer(null);
        }}
        className="btn btn-secondary mb-4 mx-3"
      >
        Restart
      </button>

      {!currentAnswer && <h4>Which city is hotter?</h4>}
      {currentAnswer &&
        (currentAnswer.isCorrect ? <h4>You Won</h4> : <h4>You Lost</h4>)}

      <div className="my-2">Score: {score}</div>

      <div className="d-flex flex-wrap ">
        {currentQuestion.options.map((city) => (
          <Option
            hasAnswered={!!currentAnswer}
            answerType={currentAnswer && getAnswerType(currentAnswer, city)}
            city={city}
            key={city.id}
            onClick={() => {
              onAnswer(city);
            }}
          />
        ))}
      </div>

      {currentAnswer && (
        <button onClick={nextQuestion} className="btn btn-success mt-4">
          Next Cities
        </button>
      )}
    </div>
  );
};
