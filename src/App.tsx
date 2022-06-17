import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import UnauthorizedUserPage from './components/UnauthorizedUserPage/UnauthorizedUserPage';
import ArtistPage from './components/ArtistPage/ArtistPage';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

const App = () => (
  <div className="App">
    <div className="AppContainer">
      <Header />
      <Routes>
        <Route path="/artists/static" element={<UnauthorizedUserPage />} />
        <Route path="/artists/static/:authorId" element={<ArtistPage />} />
        <Route path="/" element={<Navigate to="/artists/static" />} />

        <Route path={'/*'} element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </div>
  </div>
);

export default App;
