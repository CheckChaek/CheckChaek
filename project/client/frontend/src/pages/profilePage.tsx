import { useState } from 'react';
import Card from '../components/common/card';
import SearchBar from '../components/profile_page/searchBar';
import Library from '../components/profile_page/library';
import { useNickname } from '../data_source/apiInfo';
import { Book } from '../interface/api';

function ProfilePage() {
  const name = useNickname();
  const [search, Setsearch] = useState<Book[]>([]);

  const handleSearch = (result: Book[]) => {
    Setsearch(result);
  };
  return (
    <>
      <Card width="w-3/5" height="min-h-[30vh]">
        <p className="text-4xl font-bold text-center ">{name} 님 안녕하세요!</p>
        <SearchBar onSearchResults={handleSearch} />
      </Card>
      <hr className="mt-5 w-3/5 mx-auto text-FONT-200" />
      <Library onSearchResults={search} />
    </>
  );
}

export default ProfilePage;
