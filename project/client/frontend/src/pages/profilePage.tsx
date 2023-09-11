import Card from '../components/common/card';
import SearchBar from '../components/profile_page/searchBar';
import Library from '../components/profile_page/library';

function ProfilePage() {
  return (
    <>
      <Card width="w-3/5" height="min-h-[30vh]">
        <p className="text-4xl font-bold text-center ">허재 님 안녕하세요!</p>
        <SearchBar />
      </Card>
      <hr className="mt-8 w-3/5 mx-auto text-FONT-200" />
      <Library />
    </>
  );
}

export default ProfilePage;
