import MainBooks from '../assets/images/main_page/books.png';
import Login from '../components/logInModal';

function MainPage() {
  return (
    <div className="snap-mandatory-y MainPage">
      <div className="snap-center FirstPage bg-MAIN-200 w-screen h-[36rem]  ">
        <div className="flex justify-center pt-20">
          <img className="w-64 h-90 " src={MainBooks} alt="MainBookImage" />
          <div className="ml-32">
            <h3 className="text-4xl font-bold pt-32 text-center text-FONT-50">
              중고책이 얼마라고?
            </h3>
            <p className="text-2xl text-center font-bold mt-10 text-FONT-50">
              내 책 예측하러가기
            </p>
          </div>
        </div>
      </div>
      <div className="snap-center SecondPage bg-cover bg-second-page w-screen h-screen">
        <div className="TextPard bg-BACKGROUND-800 bg-opacity-50 m-screen  h-full align-middle pt-64">
          <h3 className="text-6xl font-bold  text-center text-FONT-50">
            책장이 혹시...
          </h3>
          <p className="text-2xl text-center font-bold mt-10 text-FONT-50">
            이런 상태라고?
          </p>
        </div>
      </div>
      <div className="snap-center ThirdPagePage m-screen h-screen bg-MAIN-300 ">
        <div className="LoginPart ml-64 h-full flex">
          <Login />
          <div className="TextPart min-w-[24rem] self-center ml-20">
            <p className="LoginText text-center font-bold text-4xl text-FONT-50 pb-10">
              내 책 예상가격 보러가기
            </p>
            <p className="LoginText text-center font-bold text-2xl text-FONT-50">
              로그인하고 시작하기
            </p>
          </div>
        </div>
      </div>
      <div className="snap-center BottomSheet m-screen h-[132px] bg-BUTTON2-200 "></div>
    </div>
  );
}

export default MainPage;
