import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GameSettingsPage } from './pages/game-settings/game-settings';
import { GamePage } from './pages/game/game';
import { routes } from './routes/routes';
import './scss/app.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from './redux/mainReducer';
import { LoaderView } from './components/loader-view/loader-view';
import { CityService } from './http/cities.http';
import { setCitiesInfoAction } from './redux/game/game-actions';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const hasGameDataLoaded = useSelector(
    (state: IStoreState) => state.game.hasGameDataLoaded
  );
  useEffect(() => {
    CityService.all()
      .then(({ cities }) => {
        dispatch(setCitiesInfoAction({ cities }));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  if (!hasGameDataLoaded) {
    return <LoaderView />;
  }
  return (
    <div className="container py-5">
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.game()} component={GamePage} />
          <Route exact path={routes.settings()} component={GameSettingsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export { App };
