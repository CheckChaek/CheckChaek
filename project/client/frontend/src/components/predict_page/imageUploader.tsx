import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

interface ImageProps {
  imageList: File[];
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  isDrag: boolean;
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-LOGO-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
              {!isDrag && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              )}
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
