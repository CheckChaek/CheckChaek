import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 로그인
import UserLogin from './components/login_page/userlogin';
import UserDropdown from './components/login_page/userdropdown';
// 페이지
import MainPage from './pages/mainPage';
import ProfilePage from './pages/profilePage';
import ResultPage from './pages/imageResultPage';
import PredictPage from './pages/imagePredictPage';
import GuidePage from './pages/guidePage';
import SocialLogin from './pages/socialLogin';
// 로고
import CheckChaek from './assets/images/logo/CheckChaek.png';
// 기능
import { useAccessToken } from './data_source/apiInfo';

function App() {
  const token = useAccessToken();

  return (
    <div className="App">
      <nav className="flex justify-around items-center py-4 px-6 text-xl shadow-md">
        <a href="/">
          <img src={CheckChaek} alt="CheckChaek" />
        </a>
        <div className="flex items-center space-x-4">
          {[
            ['가이드', '/guide'],
            ['예측', '/predict'],
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
        {token ? <UserDropdown /> : <UserLogin />}
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<ProfilePage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/login/redirect" element={<SocialLogin />} />
        </Routes>
      </Router>
      <div className="snap-center mt-3 BottomSheet m-screen h-[132px] bg-BUTTON2-200" />
    </div>
  );
}

export default App;
