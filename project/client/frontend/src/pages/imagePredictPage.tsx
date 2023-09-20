import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../components/modal/modal';
import { useModal } from '../components/modal/modalClass';
import Card from '../components/common/card';
import ImageSlider from '../components/predict_page/imageSlider';
import MemoizmImageUploader from '../components/predict_page/imageUploader';
import PredictBtn from '../components/common/predictBtn';
import AlertContents from '../components/modal/alertContents';
import Guide from '../components/modal/guide';

function PredictPage() {
  const { modalOpen, openModal, closeModal } = useModal();
  const [imageList, setImageList] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const modalName = 'imageLimit';
  const guideRef = useRef(true);
  const guidemodalName = 'guide';
  const handleGuide = useCallback(() => {
    if (guideRef.current) {
      openModal(guidemodalName);
      guideRef.current = false;
    }
  }, [openModal]);

  useEffect(() => {
    handleGuide();
  }, [handleGuide]);

  const navigate = useNavigate();

  const imageRegistHandler = (files: File[]) => {
    const tempImagelist = [...imageList, ...files];

    if (tempImagelist.length > 10) {
      openModal(modalName);
    } else {
      setImageList(tempImagelist);
    }
  };

  return (
    <div className="Predict">
      <Card width="w-3/4" height="min-h-[80vh]">
        <div className="ImageSlider">
          <ImageSlider
            imageRegistHandler={imageRegistHandler}
            imageList={imageList}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
          />
        </div>
        <div className="ImageUploader">
          <MemoizmImageUploader
            imageList={imageList}
            setImageList={setImageList}
            setCurrentImageIndex={setCurrentImageIndex}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
            imageRegistHandler={imageRegistHandler}
          />
        </div>
        <div className="flex justify-center my-2">
          <PredictBtn
            width="w-[25rem]"
            height="h-[4rem]"
            defaultColor="bg-BUTTON1-500"
            selectedColor="bg-BUTTON1-900"
            fontColor="text-FONT-50 text-lg"
            action={() => navigate('/result', { state: imageList })}>
            결과 확인하기
          </PredictBtn>
        </div>
      </Card>
      <Modal
        closeModal={() => closeModal(modalName)}
        OpenModal={modalOpen[modalName]}
        width="w-[400px]"
        height="h-60">
        <AlertContents
          content="이미지는 10개까지 입니다."
          okAction={() => closeModal(modalName)}
        />
      </Modal>

      <Modal
        closeModal={() => closeModal(guidemodalName)}
        OpenModal={modalOpen[guidemodalName]}
        width="w-[41%]"
        height="h-[100%]">
        <Guide okAction={() => closeModal(guidemodalName)} />
      </Modal>
    </div>
  );
}

export default PredictPage;
