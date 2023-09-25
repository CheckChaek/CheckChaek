import { useNavigate } from 'react-router-dom';
import DoubleRightIcon from '../assets/icons/dobuleRightIcon';
import error from '../assets/images/error_page/error.png';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-MAIN-200 ">
      <img
        src={error}
        alt="error"
        className="absolute left-[10%] top-[20%] h-[55%] "
      />
      <div className="absolute left-[53.5%] top-[33%] text-5xl font-do-hyeon">
        <p>오류가 발생했습니다.</p>
        <p className="mt-4">걱정하지마세요. 금방 해결 될거에요!</p>
        <div className="mt-4">
          <span>An </span>
          <span className="text-LOGO-500">error </span>
          <span>occured!</span>
          <p className="my-4">It will be resolved soon.</p>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-[42%] top-[67%] w-[20rem] h-[4.5rem] font-do-hyeon text-2xl hover:bg-BUTTON1-400 hover:shadow-none bg-BUTTON1-200  rounded-2xl shadow-xl shadow-BACKGROUND-600 border-4 border-BUTTON1-300"
        onClick={() => navigate('/predict')}>
        메인으로 돌아가기
      </button>

      <div className="absolute flex text-2xl left-[80%] top-[85%] font-do-hyeon">
        <div>
          <p>문제를 해결해주세요!</p>
          <p>I need any help!</p>
        </div>
        <button type="button" onClick={() => navigate('/predict')}>
          <DoubleRightIcon styleString="h-14 w-16 mt-2 ml-3 text-SECONDARY-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
