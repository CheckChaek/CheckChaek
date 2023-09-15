// Modal class
import { useState } from 'react';

import { useModal } from '../components/common/modalClass';

function ImagePredictController() {
  const { modalOpen, openModal, closeModal } = useModal();
  const [imageList, setImageList] = useState<File[]>([]);
  const [isDrag, setIsDrag] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const modalName = 'imageLimit';

  const imageRegistHandler = (files: File[]) => {
    const tempImagelist = [...imageList, ...files];

    if (tempImagelist.length > 10) {
      // alert('10개까지만 됨');
      openModal(modalName);
    } else {
      setImageList(tempImagelist);
    }
  };
  const imageDeleteHandler = (index: number) => {
    setImageList([...imageList].filter((item, idx) => idx !== index));
  };

  const indexLeftHandler = () => {
    const isFirstSlide = currentImageIndex === 0;
    const newIndex = isFirstSlide
      ? imageList.length - 1
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };
  const indexRightHandler = () => {
    const isLastSlide = currentImageIndex === imageList.length - 1;
    const newIndex = isLastSlide ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };
  return {
    imageList,
    isDrag,
    modalOpen,
    currentImageIndex,
    indexRightHandler,
    indexLeftHandler,
    imageDeleteHandler,
    imageRegistHandler,
    openModal,
    closeModal,
    setIsDrag,
  };
}

export default ImagePredictController;
