import { useState } from 'react';
import Card from '../common/card';
import LeftIcon from '../../assets/icons/lefticon';
import RightIcon from '../../assets/icons/righticon';
import RightArrowIcon from '../../assets/icons/rightArrowIcon';
import { SearchResultProps } from '../../interface/profile';
import { useModal } from '../modal/modalClass';
import Modal from '../modal/modal';

function Library({
  onSearchResults,
  currentPage,
  setCurrentPage,
  onDelete,
}: SearchResultProps) {
  // 페이지네이션
  const totalItems = onSearchResults?.length || 0;
  const totalPages = Math.ceil(totalItems / 10);

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const middlePage = Math.ceil(currentPage / 5) * 5;
    const startPage = Math.max(1, middlePage - 4);
    const endPage = Math.min(totalPages, middlePage);

    for (let i = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, totalItems);

  // 더보기 기능
  const [bookname, setBookname] = useState<string[]>([]);
  const handleReadMore = (bookId: number) => {
    if (!bookname.includes(String(bookId))) {
      setBookname(prevExpanded => [...prevExpanded, String(bookId)]);
    } else {
      setBookname(prevExpanded =>
        prevExpanded.filter(id => id !== String(bookId)),
      );
    }
  };

  const { modalOpen, openModal, closeModal } = useModal();
  const modalName = 'detail';

  return (
    <Card width="w-3/5" height="min-h-[50vh]">
      <div className="m-3 text-xl font-bold">
        내 서재 ({onSearchResults?.length})
      </div>
      {onSearchResults?.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-2 ">
            {onSearchResults &&
              onSearchResults.slice(startIndex, endIndex).map(book => (
                <div className="m-3" key={book.id}>
                  <div
                    className="relative min-h-[25vh]"
                    role="button"
                    tabIndex={0}
                    onClick={() => openModal(modalName)}
                    onKeyPress={event => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        openModal(modalName);
                      }
                    }}>
                    <img
                      src={book.url}
                      alt={book.title}
                      className=" min-h-[25vh]"
                    />
                  </div>
                  <p>
                    책 제목 :{' '}
                    {book.title.length > 10 &&
                    !bookname.includes(String(book.id)) ? (
                      <>
                        {book.title.slice(0, 10)}...
                        <span
                          role="button"
                          tabIndex={0}
                          className="text-BUTTON2-300"
                          onClick={() => handleReadMore(book.id)}
                          onKeyPress={event => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              handleReadMore(book.id);
                            }
                          }}>
                          더 보기
                        </span>
                      </>
                    ) : (
                      book.title
                    )}
                  </p>

                  <p>상태 : {book.status || 'Denied'}</p>
                  <p>가격 : {book.price ? `${book.price}원` : '매입 불가'} </p>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-4">
            <button type="button" onClick={prev} disabled={currentPage === 1}>
              <LeftIcon styleString="w-6 h-6" />
            </button>
            {getPageNumbers().map(pageNumber => (
              <button
                onClick={() => setCurrentPage(pageNumber)}
                className={`mx-2 p-2  ${
                  currentPage === pageNumber
                    ? 'bg-SECONDARY-300 rounded-full w-10'
                    : ''
                }`}
                key={pageNumber}
                type="button">
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={next}
              disabled={currentPage === totalPages}>
              <RightIcon styleString="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-4/5 justify-center">
          <div className="my-auto">
            <p className="text-3xl">검색 기록이 없어요 😥</p>
            <a
              href="/predict"
              className="flex text-xl mt-3 w-max hover:text-FONT-300">
              <RightArrowIcon styleString="w-6 h-6 mr-2" /> 검색하러가기
            </a>
          </div>
        </div>
      )}
      <Modal
        closeModal={() => closeModal(modalName)}
        OpenModal={modalOpen[modalName]}
        width="w-[400px]"
        height="h-[680px] ">
        임의로 넣어봤어요
      </Modal>
    </Card>
  );
}

export default Library;
