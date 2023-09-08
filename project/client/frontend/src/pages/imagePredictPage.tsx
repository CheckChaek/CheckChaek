import { useState } from 'react';
import Card from '../components/card';
import ImageSlider from '../components/imageSlider';
import MemoizmImageUploader from '../components/imageUploader';

function PredictPage() {
  const [imageList, setImageList] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  return (
    <div className="Predict">
      <Card>
        <div className="">
          <ImageSlider
            imageList={imageList}
            setImageList={setImageList}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
          />
        </div>
        <div className="ImageUploader h-[100vh]">
          <MemoizmImageUploader
            imageList={imageList}
            setImageList={setImageList}
            setCurrentImageIndex={setCurrentImageIndex}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
          />
        </div>
      </Card>
    </div>
  );
}

export default PredictPage;
