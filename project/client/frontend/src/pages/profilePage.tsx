import Card from '../components/common/card';
import SearchBar from '../components/profile_page/searchBar';
import Library from '../components/profile_page/library';
import { useNickname } from '../data_source/apiInfo';

function ProfilePage() {
  const name = useNickname();
  return (
    <>
      <Card width="w-3/5" height="min-h-[30vh]">
        <p className="text-4xl font-bold text-center ">{name} 님 안녕하세요!</p>
        <SearchBar />
      </Card>
      <hr className="mt-5 w-3/5 mx-auto text-FONT-200" />
      <Library />
    </>
  );
}

export default ProfilePage;
