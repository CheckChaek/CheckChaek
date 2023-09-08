import { Menu } from '@headlessui/react';

function UserLogin() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          로그인
        </Menu.Button>
      </div>
    </Menu>
  );
}

export default UserLogin;
