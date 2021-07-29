import React from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { TemperatureUnit } from '../../redux/game/game-reducers';
import { IStoreState } from '../../redux/mainReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextQuestionAction,
  updateSettingsAction,
} from '../../redux/game/game-actions';
import { Option } from '../../components/option/option';
import { getAnswerType } from '../../helpers/get-answer-type';

interface Props {}

export const GameSettingsPage: React.FC<Props> = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    ({ game }: IStoreState) => game.settings.temperatureUnit
  );
  const optionsCount = useSelector(
    ({ game }: IStoreState) => game.settings.optionsCount
  );
  const userAnswers = useSelector(({ game }: IStoreState) => game.userAnswers);

  return (
    <div>
      <button
        onClick={() => push(routes.game())}
        className="btn btn-primary mb-4"
      >
        Back
      </button>
      <h3>Settings</h3>
      <h5>Choose Option length</h5>
      {[2, 3, 4, 5].map((num) => (
        <div key={num} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={num.toString()}
            id={num.toString()}
            checked={optionsCount === num}
            onChange={() => {
              dispatch(updateSettingsAction({ optionsCount: num }));
              // get new questions with updated option length
              dispatch(nextQuestionAction());
            }}
          />
          <label className="form-check-label" htmlFor={num.toString()}>
            {num}
          </label>
        </div>
      ))}
      <h5 className="my-3">Units</h5>
      {[TemperatureUnit.celsius, TemperatureUnit.fahrenheit].map((unit) => (
        <div className="form-check" key={unit}>
          <input
            className="form-check-input"
            type="radio"
            name={unit}
            id={unit}
            checked={temperatureUnit === unit}
            onChange={() => {
              dispatch(updateSettingsAction({ temperatureUnit: unit }));
            }}
          />
          <label className="form-check-label" htmlFor={unit}>
            {unit}
          </label>
        </div>
      ))}
      <h5 className="my-3">History</h5>
      {userAnswers.map((answer, i) => (
        <>
          <div key={i} className="d-flex mt-4 flex-wrap">
            {answer.cities.map((city) => (
              <Option
                hasAnswered={true}
                answerType={getAnswerType(answer, city)}
                city={city}
                key={city.id}
              />
            ))}
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};
