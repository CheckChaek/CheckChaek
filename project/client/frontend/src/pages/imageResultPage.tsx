/* eslint-disable */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { BookInterface } from '../interface/predictResult';

import PredictResult from '../components/predict_result/predictResult';

import Loading from '../components/common/loading';
import TaConfirm from '../components/predict_result/taConfirm';
import {
  PredictRepository,
  TaConfirmRepository,
} from '../repository/business/predictRepository';

function ResultPage() {
  // const location: { bookInformation: BookInfo } = useLocation();
  const [pageState, setPageState] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const defaultBook: BookInterface = {
    title: 'Book title',
    author: 'Book author',
    publisher: 'Book publisher',
  };
  const [bookInfo, setBookInfo] = useState(defaultBook);

  const location: { state: File[] } = useLocation();
  const imageList = location.state;

  const pageHandleRegister = (status: number) => {
    if (status >= 0 && status < 3) {
      setPageState(status);
    }
  };
  let predictRes;
  let res;
  useEffect(() => {
    const taApiRequest = async () => {
      res = await TaConfirmRepository({ imageList });
      if (res !== undefined) {
        pageHandleRegister(1);
      }
    };
    taApiRequest();
  }, []);
  useEffect(() => {
    const predictApiRequest = async () => {
      predictRes = await PredictRepository({ bookInfo });
      if (predictRes !== undefined) {
        pageHandleRegister(2);
      }
    };
    predictApiRequest();
  }, [isChecked]);

  switch (pageState) {
    case 1:
      return (
        <TaConfirm
          bookInfo={res}
          pageHandleRegister={pageHandleRegister}
          // setPageState={setPageState}
          setBookInfo={setBookInfo}
          setIsChecked={setIsChecked}
        />
      );
    case 2:
      return (
        <div className="PredictResult">
          <PredictResult PredictBookInfo={predictRes} />
        </div>
      );

    default:
      return <Loading />;
  }
}

export default ResultPage;
