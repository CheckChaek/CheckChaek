import { useNavigate, useLocation } from 'react-router-dom';

import Card from '../components/common/card';
import Goodcover from '../assets/images/guide/goodcover.jpg';
import PredictBtn from '../components/common/predictBtn';
import State_medal_best from '../assets/images/predict_result/state_medal_best.png';
import State_medal_high from '../assets/images/predict_result/state_medal_high.png';
import State_medal_medium from '../assets/images/predict_result/state_medal_medium.png';
import State_medal_low from '../assets/images/predict_result/state_medal_low.png';

function ResultPage() {
  const navigate = useNavigate();
  const location: { state: string } = useLocation();
  const status = location.state;
  let medal;
  switch (status) {
    case '0':
      medal = State_medal_best;
      break;
    case '1':
      medal = State_medal_high;
      break;
    case '2':
      medal = State_medal_medium;
      break;
    case '3':
      medal = State_medal_low;
      break;
    default:
      medal = '';
      break;
  }

  return (
    <div className="PredictResult">
      <Card height="h-[40rem]" width="w-[80rem]">
        <div className="Result flex justify-center align-middle">
          <div className="ResultImage h-[32rem] w-[24rem] ml-20">
            <img src={Goodcover} alt="결과 이미지" className="h-full w-full" />
          </div>
          <div className="ResultContents h-[32rem] w-[32rem] px-10 relative place-items-stretch bg-MAIN-100 ml-10 rounded-2xl p-10">
            <div className="absolute -right-2 top-0 w-[8rem] h-[10rem]">
              <img src={medal} alt="상태 메달" />
            </div>
            <div className="Contents text-2xl p-4 font-bold">
              <p>제목: title</p>
              <p>저자: author</p>
              <p>출판사: publisher</p>
              <br />

              <p>상태: state</p>

              <br />
              <p>새책 가격: newBook price</p>
              <p>예상 가격: predict price</p>
              <p>평균 가격: average price</p>
            </div>
            <div className="RestartBtn flex justify-center  mt-10">
              <PredictBtn
                height="h-[3rem]"
                width="w-[15rem]"
                defaultColor="bg-BUTTON1-500"
                selectedColor="bg-BUTTON1-900"
                fontColor="text-FONT-50 text-lg"
                action={() => {
                  navigate('/predict');
                }}>
                다시하기
              </PredictBtn>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ResultPage;
