import { Outlet } from 'react-router-dom';
import UserDropdown from '../login_page/userdropdown';
import UserLogin from '../login_page/userlogin';
import CheckChaek from '../../assets/images/logo/CheckChaek.png';
import { useAccessToken } from '../../data_source/apiInfo';
import BottomSheet from './bottomSheet';

function Navbar() {
  const token = useAccessToken();
  return (
    <>
      <nav className="flex justify-around items-center py-4 px-6 text-xl shadow-md w-screen">
        <a href="/">
          <img src={CheckChaek} alt="CheckChaek" />
        </a>
        <div className="flex items-center space-x-4">
          {[
            ['예측', '/predict'],
            token ? ['내 서재', '/history'] : ['', ''],
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
      <Outlet />
      <BottomSheet />
    </>
  );
}

export default Navbar;
