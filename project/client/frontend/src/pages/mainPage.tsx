import MainBooks from '../assets/images/main_page/books.png';
import Login from '../components/modal/logInContents';
import LeftArrowIcon from '../assets/icons/leftArrowIcon';
import RightArrowIcon from '../assets/icons/rightArrowIcon';

function MainPage() {
  return (
    <div className=" MainPage">
      <div className="snap-end FirstPage bg-MAIN-200 w-screen min-h-[80vh]">
        <div className="flex justify-center pt-20">
          <img className="w-64 h-90 " src={MainBooks} alt="MainBookImage" />
          <div className="ml-32">
            <h3 className="text-4xl font-bold pt-32 text-center text-FONT-50">
              중고책이 얼마라고?
            </h3>
            <div className="flex justify-center">
              <a
                href="/predict"
                className="text-2xl text-center font-bold mt-10 text-FONT-50 animate-bounce">
                내 책 예측하러가기
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="snap-end SecondPage bg-cover bg-second-page w-screen h-screen">
        <div className="TextPard bg-BACKGROUND-800 bg-opacity-50 w-screen h-full align-middle pt-64">
          <h3 className="text-6xl font-bold  text-center text-FONT-50">
            책장이 혹시...
          </h3>
          <div className="flex-col justify-center mt-10">
            <a
              href="/predict"
              className="text-2xl text-center font-bold mt-10 text-FONT-50 flex justify-center items-center  animate-bounce">
              정리하러 가기
              <RightArrowIcon styleString="w-10 h-10 ml-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="snap-center ThirdPagePage w-screen h-screen bg-MAIN-300 md:snap-none">
        <div className="LoginPart w-full h-full flex justify-center">
          <Login />
          <div className="TextPart  self-center ml-20">
            <p className="LoginText text-center font-bold text-4xl text-FONT-50 pb-10">
              내 책 예상가격 보러가기
            </p>
            <div className="StartServiceText flex items-center justify-center">
              <LeftArrowIcon styleString="w-10 h-10 text-FONT-50 font-bold mr-4" />
              <p className="LoginText text-center font-bold text-2xl text-FONT-50 ">
                로그인하고 시작하기
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="snap-start" />
    </div>
  );
}

export default MainPage;
