import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/mainPage';
import ProfilePage from './pages/profilePage';
import ResultPage from './pages/imageResultPage';
import SearchPage from './pages/imageSearchPage';
import UserDropdown from './components/userdropdown';
import CheckChaek from './assets/images/logo/CheckChaek.png';

function App() {
  return (
    <div className="App">
      <nav className="flex justify-around items-center py-4 px-6 text-xl">
        <img src={CheckChaek} alt="CheckChaek" />
        <div className="flex items-center space-x-4">
          {[
            ['검색', '/search'],
            ['내 서재', '/history'],
          ].map(([title, url]) => (
            <a
              href={url}
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
              key={title}>
              {title}
            </a>
          ))}
        </div>
        <UserDropdown />
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
