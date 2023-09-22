import { useNavigate } from 'react-router-dom';

import Card from '../common/card';
// medals
import State_medal_best from '../../assets/images/predict_result/state_medal_best.png';
import State_medal_high from '../../assets/images/predict_result/state_medal_high.png';
import State_medal_medium from '../../assets/images/predict_result/state_medal_medium.png';
import State_medal_low from '../../assets/images/predict_result/state_medal_low.png';
import PredictBtn from '../common/predictBtn';
import { PredictBookInfo } from '../../interface/predictResult';

function PredictResult(props: { predictBookInfo: PredictBookInfo }) {
  const { predictBookInfo } = props;
  const navigate = useNavigate();
  const bookInfo =
    predictBookInfo === undefined
      ? {
          title: '제목',
          author: '저자',
          publisher: '출판사',
          status: '알 수 없음',
          originalPrice: '알 수 없음',
          estimatedPrice: '알 수 없음',
          coverImage: '알 수 없음',
        }
      : predictBookInfo;
  let medal;
  let status: string;
  switch (bookInfo.status) {
    case 'best':
      medal = State_medal_best;
      status = '최상';
      break;
    case 'high':
      medal = State_medal_high;
      status = '상';
      break;
    case 'medium':
      medal = State_medal_medium;
      status = '중';
      break;
    case 'low':
      medal = State_medal_low;
      status = '매입불가';
      break;
    default:
      medal = '';
      status = '';
      break;
  }
  return (
    <Card height="h-[40rem]" width="w-[80rem]">
      <div className="Result flex justify-center align-middle">
        <div className="ResultImage h-[32rem] w-[24rem] ml-20">
          <img
            src={bookInfo.coverImage}
            alt="결과 이미지"
            className="h-full w-full"
          />
        </div>
        <div className="ResultContents h-[32rem] w-[32rem] px-10 relative place-items-stretch bg-MAIN-100 ml-10 rounded-2xl p-10">
          <div className="absolute -right-2 top-0 w-[8rem] h-[10rem]">
            <img src={medal} alt="상태 메달" />
          </div>
          <div className="Contents text-2xl p-4 font-bold">
            <p>제목: {bookInfo.title}</p>
            <p>저자: {bookInfo.author}</p>
            <p>출판사: {bookInfo.publisher}</p>
            <br />

            <p>상태: {status}</p>

            <br />
            <p>새책 가격: {bookInfo.originalPrice}</p>
            <p>예상 가격: {bookInfo.estimatedPrice}</p>
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
  );
}

export default PredictResult;
