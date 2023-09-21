import { useState, useEffect } from 'react';
import Card from '../common/card';
import TrashCan from '../../assets/icons/trashIcon';
import LeftIcon from '../../assets/icons/lefticon';
import RightIcon from '../../assets/icons/righticon';
import RightArrowIcon from '../../assets/icons/rightArrowIcon';
import { HistoryAllApi } from '../../data_source/business/historyApi';

function Library() {
  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const [elementStates, setElementStates] = useState<boolean[]>(
    Array.from({ length: 11 }, () => false),
  );
  const totalItems = elementStates.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleMouseEnter = (index: number) => {
    const newStates = [...elementStates];
    newStates[index] = true;
    setElementStates(newStates);
  };

  const handleMouseLeave = (index: number) => {
    const newStates = [...elementStates];
    newStates[index] = false;
    setElementStates(newStates);
  };

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  useEffect(() => {
    HistoryAllApi();
  }, []);

  return (
    <Card width="w-3/5" height="min-h-[50vh]">
      <div className="m-3 text-xl font-bold">
        내 서재 ({elementStates.length})
      </div>
      {elementStates.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-2">
            {elementStates
              .slice(startIndex, endIndex)
              .map((isMouseOver, index) => (
                <div
                  className="m-3"
                  key={Math.random()}
                  onMouseEnter={() => handleMouseEnter(index + startIndex)}
                  onMouseLeave={() => handleMouseLeave(index + startIndex)}>
                  <div className="bg-MAIN-100 min-h-[25vh]">
                    {isMouseOver && (
                      <TrashCan styleString="w-1/3 h-1/4 cursor-pointer" />
                    )}
                  </div>
                  <p>책 제목 : 책책</p>
                  <p>상태 : 상태</p>
                  <p>가격 : 9999원</p>
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
              href="/search"
              className="flex text-xl mt-3 w-max hover:text-FONT-300">
              <RightArrowIcon styleString="w-6 h-6 mr-2" /> 검색하러가기
            </a>
          </div>
        </div>
      )}
    </Card>
  );
}

export default Library;
