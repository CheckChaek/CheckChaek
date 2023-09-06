import KakaoLogin from '../assets/images/kakao_login/kakao_login_medium_wide.png';
import CheckChaek from '../assets/images/logo/CheckChaek.png';

function login() {
  return (
    <div className="LoginPart h-full min-w-[384px]  bg-BACKGROUND-50 rounded-lg shadow-md">
      <div className="LoginTitle h-1/4 ">
        <h2 className="text-center font-bold text-3xl pt-16">시작하기</h2>
      </div>
      <div className="LoginLogo h-2/5 flex justify-center">
        <img src={CheckChaek} alt="CheckChaek" className="mx-auto py-24" />
      </div>
      <div className="LoginKakaoBtn h-1/6 pt-10">
        <img
          src={KakaoLogin}
          alt="KakaoLoginBtn"
          className="mx-auto shadow-lg"
        />
      </div>

      <div className="LoginContent">
        <hr className="w-10/12 mx-auto mb-3" />
        <p className="ServiceTerms text-center font-bold">서비스 약관</p>
      </div>
    </div>
  );
}

export default login;
