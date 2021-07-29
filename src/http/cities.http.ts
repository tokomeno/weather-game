import { cities } from './data';

export interface ICity {
  id: number;
  city: string;
  country: string;
  temperatureCelsius: number;
}

class _CityService {
  // imitation of async api call
  all = () => {
    return new Promise<{ cities: ICity[] }>((res, rej) => {
      setTimeout(() => {
        res({ cities: cities });
      }, 1500);
    });
  };
}

export const CityService = new _CityService();
