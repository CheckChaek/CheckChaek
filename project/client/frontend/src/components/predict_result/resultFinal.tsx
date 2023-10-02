import PredictResult from './predictResult';
import ResultChart from './resultChart';
import { PredictBookInfo, ScoreInfo } from '../../interface/predictResult';
import { BtnInfo } from '../../interface/common';

function ResultFinal(props: {
  predictBookInfo: PredictBookInfo;
  buttonInfo: BtnInfo;
  scoreInfo: ScoreInfo;
}) {
  const { predictBookInfo, buttonInfo, scoreInfo } = props;
  return (
    <div>
      <PredictResult
        buttonInfo={buttonInfo}
        predictBookInfo={predictBookInfo}
      />
      <ResultChart scoreInfo={scoreInfo} />
    </div>
  );
}

export default ResultFinal;
