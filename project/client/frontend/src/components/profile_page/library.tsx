import { useState } from 'react';
import Card from '../common/card';
import TrashCan from '../../assets/icons/trashIcon';
import LeftIcon from '../../assets/icons/lefticon';
import RightIcon from '../../assets/icons/righticon';
import RightArrowIcon from '../../assets/icons/rightArrowIcon';
import { SearchResultProps } from '../../interface/profile';

function Library({ onSearchResults, onDelete }: SearchResultProps) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = onSearchResults?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [hoverStates, setHoverStates] = useState<boolean[]>([]);

  const handleMouseEnter = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = true;
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index: number) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
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

  return (
    <Card width="w-3/5" height="min-h-[50vh]">
      <div className="m-3 text-xl font-bold">
        내 서재 ({onSearchResults?.length})
      </div>
      {onSearchResults?.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-2 ">
            {onSearchResults &&
              onSearchResults.slice(startIndex, endIndex).map((book, index) => (
                <div
                  className="m-3"
                  key={book.id}
                  onMouseEnter={() => handleMouseEnter(index + startIndex)}
                  onMouseLeave={() => handleMouseLeave(index + startIndex)}>
                  <div className="relative min-h-[25vh]">
                    <img
                      src={book.url}
                      alt="asdasd"
                      className=" min-h-[25vh]"
                    />
                    {hoverStates[index + startIndex] && (
                      <TrashCan
                        styleString="min-h-[25vh] w-1/3 h-1/4 cursor-pointer"
                        action={() => {
                          onDelete(book.id);
                        }}
                      />
                    )}
                  </div>
                  <p>책 제목 : {book.title}</p>
                  <p>상태 : {book.status || '상태'}</p>
                  <p>가격 : {book.price}원</p>
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
    </Card>
  );
}

export default Library;
