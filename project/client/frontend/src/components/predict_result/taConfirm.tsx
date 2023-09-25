import { Dispatch, SetStateAction, useState } from 'react';

import Card from '../common/card';
import PredictBtn from '../common/predictBtn';
import { BookInfo } from '../../interface/predictResult';

function TaConfirm(props: {
  bookInfo: BookInfo;
  // bookImage: string | undefined;
  pageHandleRegister: (num: number) => void;
  // setPageState: Dispatch<SetStateAction<number>>;
  setBookInfo: Dispatch<SetStateAction<BookInfo>>;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    bookInfo,
    // bookImage,
    pageHandleRegister,
    // setPageState,
    setBookInfo,
    setIsChecked,
  } = props;
  const book =
    bookInfo === undefined
      ? {
          title: '정보를 찾을 수 없습니다.',
          author: '정보를 찾을 수 없습니다.',
          publisher: '정보를 찾을 수 없습니다.',
          image: '찾을 수 없습니다.',
        }
      : bookInfo;

  const [bookTitle, setBookTitle] = useState(book.title);
  const [bookAuthor, setBookAuthor] = useState(book.author);
  const [bookPublisher, setBookPublisher] = useState(book.publisher);

  // const pageHandleRegister = (status: number) => {
  //   if (status >= 0 && status < 3) {
  //     setPageState(status);
  //   }
  // };

  const bookTitlehandler = (newTitle: React.ChangeEvent<HTMLInputElement>) => {
    if (newTitle.target.value) {
      setBookTitle(newTitle.target.value);
    }
  };
  const bookAuthorhandler = (
    newAuthor: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (newAuthor.target.value) {
      setBookAuthor(newAuthor.target.value);
    }
  };
  const bookPublisherhandler = (
    newPublisher: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (newPublisher.target.value) {
      setBookPublisher(newPublisher.target.value);
    }
  };

  const bookInfoHandler = () => {
    const newBookInfo = {
      bookId: bookInfo.bookId,
      title: bookTitle,
      author: bookAuthor,
      publisher: bookPublisher,
      image: bookInfo.image,
    };
    setBookInfo(newBookInfo);
  };

  const isCheckedHandler = () => {
    setIsChecked(true);
  };
  return (
    <div>
      <Card width="w-[80rem]" height="h-[40rem]">
        <div className="Result flex justify-center align-middle">
          <div className="ResultImage h-[32rem] w-[24rem] ml-20">
            <img
              src={bookInfo.image}
              alt="결과 이미지"
              className="min-h-[300px] min-w-[350px] rounded-2xl"
            />
          </div>
          <div className="ResultContents h-[32rem] w-[32rem] px-10  bg-MAIN-100 ml-10 rounded-2xl  p-10">
            <div className="w-full h-full relative ">
              {/* <div className="Contents text-2xl p-4 font-bold flex-col "> */}
              <div className="font-bold text-center text-2xl mb-5">
                📕📗 책을 확인해주세요 📗📕
              </div>
              <form className="searchInfoHandlerRegister Contents text-2xl p-4 font-bold flex-col">
                <label htmlFor="title">
                  <div className="my-2">제목</div>
                  <input
                    type="text"
                    defaultValue={`${book.title}`}
                    className="mb-4 w-full"
                    id="title"
                    onChange={bookTitlehandler}
                  />
                </label>
                <br />
                <label htmlFor="author">
                  <div className="my-2">저자</div>
                  <input
                    type="text"
                    defaultValue={`${book.author}`}
                    className="mb-4 min-w-full"
                    id="author"
                    onChange={bookAuthorhandler}
                  />
                </label>
                <br />
                <label htmlFor="publisher">
                  <div className="my-2">출판사</div>
                  <input
                    type="text"
                    defaultValue={`${book.publisher}`}
                    className="mb-4 w-full"
                    id="publisher"
                    onChange={bookPublisherhandler}
                  />
                </label>
                {/* </div> */}
                <div className="RestartBtn flex justify-center ">
                  <PredictBtn
                    height="h-[3rem] absolute bottom-3"
                    width="w-[15rem]"
                    defaultColor="bg-BUTTON1-500"
                    selectedColor="bg-BUTTON1-900"
                    fontColor="text-FONT-50 text-lg"
                    action={() => {
                      bookInfoHandler();
                      pageHandleRegister(0);
                      isCheckedHandler();
                    }}>
                    계속하기
                  </PredictBtn>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TaConfirm;
