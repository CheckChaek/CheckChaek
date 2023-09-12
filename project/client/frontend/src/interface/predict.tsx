interface ImageProps {
  imageList: File[];
  isDrag: boolean;
  currentImageIndex: number;
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ImageProps;
