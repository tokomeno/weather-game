import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { ICity } from '../../http/cities.http';
import { IStoreState } from '../../redux/mainReducer';
import { useSelector } from 'react-redux';
import { TemperatureUnit } from '../../redux/game/game-reducers';
import { celsiusToFahrenheit } from '../../helpers/celsius-to-fahrenheit';
import { addSign } from '../../helpers/add-sign';

interface Props {
  hasAnswered?: boolean;
  answerType?: 'correct' | 'wrong' | null | false;
  onClick?: () => void;
  city: ICity;
}

export const Option: React.FC<Props> = ({
  answerType,
  onClick,
  city,
  hasAnswered,
}) => {
  const temperatureUnit = useSelector(
    ({ game }: IStoreState) => game.settings.temperatureUnit
  );
  const getTemperature = (c: number, unit: TemperatureUnit) => {
    if (unit === TemperatureUnit.celsius) return addSign(c) + ' C';
    return addSign(celsiusToFahrenheit(c)) + ' F';
  };

  return (
    <div
      onClick={onClick}
      className={classnames(styles.item, {
        [styles.correct]: answerType === 'correct',
        [styles.wrong]: answerType === 'wrong',
      })}
    >
      <h5>
        {city.city}, {city.country}
      </h5>
      <div className={styles.temperatureWrapper}>
        {hasAnswered && (
          <div className="fade-in">
            {getTemperature(city.temperatureCelsius, temperatureUnit)}
          </div>
        )}
      </div>
    </div>
  );
};
