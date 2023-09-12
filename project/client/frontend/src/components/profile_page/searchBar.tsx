import SearchIcon from '../../assets/icons/searchIcon';

function searchBar() {
  return (
    <div className="w-3/4 h-1/5 m-auto mt-20">
      <div> 내 서재 검색</div>
      <div className="flex bg-MAIN-100 rounded-2xl p-1 mt-2">
        <SearchIcon styleString="w-6 h-6 ml-2" />
        <input
          className="bg-transparent w-full"
          placeholder="기록을 검색해보세요."
        />
      </div>
    </div>
  );
}

export default searchBar;
