export interface BookInterface {
  title: string;
  author: string;
  publisher: string;
}

export interface PredictBookInterface {
  title: string;
  author: string;
  publisher: string;
  status: string;
  originalPrice: number;
  estimatedPrice: number;
  image: string;
}
