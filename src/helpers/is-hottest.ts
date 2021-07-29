import { ICity } from '../http/cities.http';

export const isHottest = (city: ICity, cities: ICity[]) => {
  const hotterCity = [...cities].sort(
    (a, b) => b.temperatureCelsius - a.temperatureCelsius
  )[0];
  return hotterCity.id === city.id;
};

export const findHottest = (cities: ICity[]) => {
  return [...cities].sort(
    (a, b) => b.temperatureCelsius - a.temperatureCelsius
  )[0];
};
