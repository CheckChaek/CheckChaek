interface ImageProps {
  imageList: File[];
  isDrag: boolean;
  currentImageIndex: number;
  // modalName: string;
  imageRegistHandler: (files: File[]) => void;
  // openModal: (key: string) => void;
  // setImageList: React.Dispatch<React.SetStateAction<File[]>>;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsDrag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ImageProps;
