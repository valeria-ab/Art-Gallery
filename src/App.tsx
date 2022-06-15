import React, { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import UnauthorizedUserPage from './components/UnauthorisedUserPage/UnauthorizedUserPage';
import { getArtistsTC } from './store/gallery-reducer';
import { AppDispatch } from './store/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getArtistsTC());
  }, []);

  return (
    <div className="App">
      <div className="AppContainer">
        <UnauthorizedUserPage />
      </div>
    </div>
  );
};

export default App;
