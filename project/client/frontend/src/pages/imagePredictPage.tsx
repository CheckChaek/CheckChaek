import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../components/common/card';
import ImageSlider from '../components/predict_page/imageSlider';
import MemoizmImageUploader from '../components/predict_page/imageUploader';
import PredictBtn from '../components/common/predictBtn';

function PredictPage() {
  const [imageList, setImageList] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="Predict">
      <Card width="w-3/4" height="min-h-[80vh]">
        <div className="ImageSlider">
          <ImageSlider
            imageList={imageList}
            setImageList={setImageList}
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
          />
        </div>
        <div className="flex justify-center my-2">
          <PredictBtn
            width="w-[25rem]"
            height="h-[4rem]"
            defaultColor="bg-BUTTON1-500"
            selectedColor="bg-BUTTON1-900"
            fontColor="text-FONT-50 text-lg"
            action={() => navigate('/result', { state: '3' })}>
            결과 확인하기
          </PredictBtn>
        </div>
      </Card>
    </div>
  );
}

export default PredictPage;
