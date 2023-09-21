//auth
export interface authRequset {
  dispatch: () => void;
}

// predict
export interface BookInfoResponse {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  image: string;
}

export interface PredictBookInfoResponse {
  title: string;
  author: string;
  publisher: string;
  iamge: string;
  status: string;
  originalPrice: number;
  estimatedPrice: number;
}

export interface APIResponse {
  code: string;
  message: string;
  data: Map<string, PredictBookInfoResponse>;
}

// history

export interface Book {
  id: number;
  price: string;
  status: string | null;
  title: string;
  url: string;
}

export interface HistoriesResponse {
  code: string;
  message: string;
  data: { history: Book[] };
}
