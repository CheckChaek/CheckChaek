import { ArcElement, Chart as ChartJS, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Card from '../common/card';
import { ScoreInfo } from '../../interface/predictResult';
// import ChartComponent from './chartComponent';

import State_medal_best from '../../assets/images/predict_result/state_medal_best.png';
import State_medal_high from '../../assets/images/predict_result/state_medal_high.png';
import State_medal_medium from '../../assets/images/predict_result/state_medal_medium.png';
import State_medal_low from '../../assets/images/predict_result/state_medal_low.png';

ChartJS.register(ArcElement, Tooltip);

function ResultChart(props: { scoreInfo: ScoreInfo }) {
  const { scoreInfo } = props;

  let status: string;
  let medal;
  switch (scoreInfo.status) {
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
  }

  const backgroundColor = [
    // '#FF6384',
    'rgba(54, 162, 235, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(255, 99, 132, 0.2)',
  ];
  const borderColor = [
    'rgba(54, 162, 235, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(255, 99, 132, 1)',
  ];
  const backData = {
    labels: [],
    datasets: [
      {
        label: '책등',
        data: scoreInfo.back,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  const coverData = {
    labels: [],
    datasets: [
      {
        label: '책면',
        data: scoreInfo.cover,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  const sideData = {
    labels: [],
    datasets: [
      {
        label: '책옆',
        data: scoreInfo.side,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card height="h-[40rem]" width="w-[80rem]">
      <div className="text-center flex justify-center font-extrabold text-4xl mb-8">
        예측 결과 <img src={medal} alt="" className="w-14" />
      </div>
      <div className="pt-5">
        <div className="flex justify-around">
          <div className="w-[20rem] relative">
            <Doughnut data={backData} />
            <div className="absolute left-[39%] top-[45%] text-center font-medium text-4xl">
              책등
            </div>
          </div>
          <div className="w-[20rem] relative ">
            <Doughnut data={coverData} />
            <div className="absolute left-[39%] top-[45%] text-center font-medium text-4xl">
              책면
            </div>
          </div>
          <div className="w-[20rem] relative">
            <Doughnut data={sideData} />
            <div className="absolute left-[39%] top-[45%] text-center font-medium text-4xl">
              책옆
            </div>
          </div>
        </div>
        <div className="Legends flex justify-center font-bold pt-10">
          <div className="flex justify-center">
            <div className="w-8 h-8 m-1 bg-[#36A2EB] opacity-20" />
            <div className="text-center my-auto mx-1">최상</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 m-1 bg-[#4BC0C0] opacity-20" />
            <div className="text-center my-auto mx-1 ">상</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 m-1 bg-[#FFCE56] opacity-20" />
            <div className="text-center my-auto mx-1 ">중</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 m-1 bg-[#FF6384] opacity-20 " />
            <div className="text-center my-auto mx-1 ">매입불가</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ResultChart;
