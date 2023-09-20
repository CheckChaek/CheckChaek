import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 페이지
import MainPage from './pages/mainPage';
import ProfilePage from './pages/profilePage';
import ResultPage from './pages/imageResultPage';
import PredictPage from './pages/imagePredictPage';
import SocialLogin from './pages/socialLogin';
import ErrorPage from './pages/errorPage';
// 나브바 & 바텀시트
import Navbar from './components/common/navbar';

function App() {
  return (
    <div className="App h-screen snap-y snap-mandatory overflow-scroll scrollbar-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="" element={<MainPage />} />
            <Route path="predict" element={<PredictPage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="history" element={<ProfilePage />} />
            <Route path="login/redirect" element={<SocialLogin />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
