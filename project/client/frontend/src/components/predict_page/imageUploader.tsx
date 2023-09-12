import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

// interface
// import ImageProps from '../../interface/predict';

// icons
import PhotoIcon from '../../assets/icons/photoIcon';
import CloseIcon from '../../assets/icons/closeIcon';

interface ImageProps {
  imageList: File[];
  isDrag: boolean;
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
}

const fileTypes = ['JPG', 'PNG', 'GIF'];
function ImageUploader({
  imageList,
  setImageList,
  setCurrentImageIndex,
  isDrag,
  setIsDrag,
}: ImageProps) {
  //   image 추가 시 핸들링 함수
  const imageRegistHandler = (files: File[]) => {
    const tempImagelist = [...imageList, ...files];

    if (tempImagelist.length > 10) {
      alert('10개까지만 됨');
    } else {
      setImageList(tempImagelist);
    }
  };
  const imageDeleteHandler = (index: number) => {
    setImageList([...imageList].filter((item, idx) => idx !== index));
  };
  return (
    // 렌더링 파트
    <ul className="w-100 h-100 grid grid-cols-5 mt-8 place-content-center ">
      {imageList.map((image, index) => (
        <button
          type="submit"
          onClick={() => {
            setCurrentImageIndex(index);
          }}>
          <li
            key={Math.random()}
            className="w-32 h-32 m-auto mt-6 group relative">
            <div className="absolute  hidden group-hover:block right-0">
              <button type="button" onClick={() => imageDeleteHandler(index)}>
                <CloseIcon styleString="w-6 h-6 text-LOGO-600" />
              </button>
            </div>
            <img
              alt="갤러리 이미지"
              src={URL.createObjectURL(image)}
              className="h-full rounded-2xl bg-contain m-auto"
            />
          </li>
        </button>
      ))}
      {imageList.length < 10 && (
        <div className="m-auto p-10">
          <FileUploader
            handleChange={imageRegistHandler}
            name="file"
            types={fileTypes}
            multiple
            onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}>
            <button
              type="button"
              className="w-32 h-32 items-center rounded-lg bg-opacity-60 outline-dashed outline-4 outline-BACKGROUND-300 bg-BACKGROUND-100">
              {!isDrag && <PhotoIcon styleString="w-12 h-12 mx-auto" />}
            </button>
          </FileUploader>
        </div>
      )}
    </ul>
  );
}

// export default ImageUploader;
const MemoizmImageUploader = React.memo(ImageUploader);

export default MemoizmImageUploader;
