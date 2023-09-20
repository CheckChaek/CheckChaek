import { useNavigate } from 'react-router-dom';
import PredictBtn from '../components/common/predictBtn';
import DoubleRightIcon from '../assets/icons/dobuleRightIcon';
import temp from '../assets/images/main_page/books.png';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-MAIN-200">
      <img src={temp} alt="temp" className="absolute left-[10%] top-[15%]" />
      <div className="absolute left-[40%] top-[32%] text-5xl font-do-hyeon">
        <p>오류가 발생했습니다.</p>
        <p className="mt-4">걱정하지마세요. 금방 해결 될거에요!</p>
        <div className="mt-4">
          <span>An </span>
          <span className="text-LOGO-500">error </span>
          <span>occured!</span>
          <p className="my-4">It will be resolved soon.</p>
        </div>
        <PredictBtn
          width="w-[15rem]"
          height="h-[3rem]"
          defaultColor="bg-BUTTON1-200"
          selectedColor="bg-BUTTON1-400"
          fontColor="text-lg"
          action={() => navigate('/predict')}>
          메인으로 돌아가기
        </PredictBtn>
      </div>
      <div className="absolute flex text-2xl left-[80%] top-[90%] font-do-hyeon">
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
