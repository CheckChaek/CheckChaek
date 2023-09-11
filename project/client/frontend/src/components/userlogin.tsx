import { useState } from 'react';
import Modal from './login_page/modal';

function UserLogin() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          로그인
        </button>
      </div>

      <Modal closeModal={closeModal} OpenModal={modalOpen} />
    </div>
  );
}

export default UserLogin;
