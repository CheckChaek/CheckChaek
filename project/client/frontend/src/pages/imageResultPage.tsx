import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PredictResult from '../components/predict_result/predictResult';
import Loading from '../components/common/loading';
import TaConfirm from '../components/predict_result/taConfirm';
import Modal from '../components/modal/modal';
import AlertContents from '../components/modal/alertContents';
import {
  PredictRepository,
  TaConfirmRepository,
} from '../repository/business/predictRepository';
import { Book, BookInfo, PredictBookInfo } from '../interface/predictResult';
import { useModal } from '../components/modal/modalClass';
import { BtnInfo } from '../interface/common';

function ResultPage() {
  // 페이지 띄우는 State
  const [pageState, setPageState] = useState(0);
  // 중간확인 페이지를 거쳤는가?
  const [isChecked, setIsChecked] = useState(false);
  // Modal 관련
  const { modalOpen, openModal, closeModal } = useModal();
  const modalName = 'predictResult';
  // 책 정보 기본 값
  const defaultBook: BookInfo = {
    bookId: 0,
    title: 'Book title',
    author: 'Book author',
    publisher: 'Book publisher',
    image: '',
  };
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

  // 책 정보 State
  const [bookInfo, setBookInfo] = useState(defaultBook);
  const [predictBookInfo, setPredictBookInfo] = useState(defaultPredict);

  // predict 페이지에서 받아온 이미지 리스트
  const location: { state: File[] } = useLocation();
  const imageList = location.state;

  const pageHandleRegister = (status: number) => {
    if (status >= 0 && status < 3) {
      setPageState(status);
    }
  };
  // 페이지 이동
  const navigate = useNavigate();

  // API Return 값 저장용
  let res: BookInfo | undefined | null;
  let predictRes: PredictBookInfo | undefined | null;

  // TA API 통신 예외처리
  const taApiRequest = async () => {
    res = await TaConfirmRepository({ imageList });
    console.log(res);
    if (res) {
      setBookInfo(res);
      pageHandleRegister(1);
    }
  };

  // Predict API 통신 예외처리
  const predictApiRequest = async () => {
    const requestBookInfo: Book = {
      bookId: bookInfo.bookId,
      title: bookInfo.title,
      author: bookInfo.author,
      publisher: bookInfo.publisher,
    };
    predictRes = await PredictRepository({ bookInfo: requestBookInfo });
    console.log(predictRes);
    if (predictRes) {
      // console.log(predictRes);
      setPredictBookInfo(predictRes);
      pageHandleRegister(2);
    } else if (predictRes === null) {
      openModal(modalName);
    } else {
      navigate('/error');
    }
  };

  // API 통신

  useEffect(() => {
    taApiRequest();
  }, []);
  useEffect(() => {
    if (isChecked) {
      predictApiRequest();
    }
  }, [isChecked]);

  const buttonInfo: BtnInfo = {
    height: 'h-[3rem]',
    width: 'w-[15rem]',
    defaultColor: 'bg-BUTTON1-500',
    selectedColor: 'bg-BUTTON1-900',
    fontColor: 'text-FONT-50 text-lg',
    children: '다시하기',
    action: () => navigate('/predict'),
  };

  // 페이지 관리
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
          <PredictResult
            predictBookInfo={predictBookInfo}
            buttonInfo={buttonInfo}
          />
        </div>
      );

    default:
      return (
        <div>
          <Loading />
          <Modal
            closeModal={() => closeModal(modalName)}
            OpenModal={modalOpen[modalName]}
            width="w-[400px]"
            height="h-60">
            <AlertContents
              content="책 정보를 찾을 수 없습니다."
              okAction={() => {
                closeModal(modalName);
                navigate('/predict');
              }}
            />
          </Modal>
        </div>
      );
  }
}

export default ResultPage;
