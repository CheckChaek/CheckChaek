import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import PredictResult from '../components/predict_result/predictResult';
import Loading from '../components/common/loading';
import TaConfirm from '../components/predict_result/taConfirm';
import {
  PredictRepository,
  TaConfirmRepository,
} from '../repository/business/predictRepository';
import { Book, BookInfo, PredictBookInfo } from '../interface/predictResult';

function ResultPage() {
  // const location: { bookInformation: BookInfo } = useLocation();
  const [pageState, setPageState] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const defaultBook: BookInfo = {
    bookId: 0,
    title: 'Book title',
    author: 'Book author',
    publisher: 'Book publisher',
    image: '',
  };
  const [bookInfo, setBookInfo] = useState(defaultBook);
  const defaultPredict: PredictBookInfo = {
    bookId: 0,
    title: '제목',
    author: '저자',
    publisher: '출판사',
    status: '알 수 없음',
    coverImage: '알 수 없음',
    originalPrice: 0,
    estimatedPrice: 0,
  };
  const [predictBookInfo, setPredictBookInfo] = useState(defaultPredict);
  const location: { state: File[] } = useLocation();
  const imageList = location.state;

  const pageHandleRegister = (status: number) => {
    if (status >= 0 && status < 3) {
      setPageState(status);
    }
  };

  let res: BookInfo | undefined;
  let predictRes: PredictBookInfo | undefined;

  const taApiRequest = async () => {
    res = await TaConfirmRepository({ imageList });
    console.log(res);
    if (res !== undefined) {
      setBookInfo(res);
      pageHandleRegister(1);
    }
  };

  const predictApiRequest = async () => {
    const requestBookInfo: Book = {
      bookId: bookInfo.bookId,
      title: bookInfo.title,
      author: bookInfo.author,
      publisher: bookInfo.publisher,
    };
    predictRes = await PredictRepository({ bookInfo: requestBookInfo });
    console.log(predictRes);
    if (predictRes !== undefined) {
      console.log(predictRes);
      setPredictBookInfo(predictRes);
      pageHandleRegister(2);
    }
  };

  useEffect(() => {
    taApiRequest();
  }, []);
  useEffect(() => {
    if (isChecked) {
      predictApiRequest();
    }
  }, [isChecked]);

  switch (pageState) {
    case 1:
      return (
        <TaConfirm
          bookInfo={bookInfo}
          pageHandleRegister={pageHandleRegister}
          // setPageState={setPageState}
          setBookInfo={setBookInfo}
          setIsChecked={setIsChecked}
        />
      );

    case 2:
      return (
        <div className="PredictResult">
          <PredictResult predictBookInfo={predictBookInfo} />
        </div>
      );

    default:
      return <Loading />;
  }
}

export default ResultPage;
