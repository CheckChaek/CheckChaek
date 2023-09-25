import { BookInfo, PredictBookInfo } from './predictResult';

export interface AuthRequset {
  dispatch: () => void;
}

// predict

export interface APIResponse {
  code: string;
  message: string;
}

export interface TaResponse extends APIResponse {
  data: { bookInfo: BookInfo } | null;
}

export interface PredictResponse extends APIResponse {
  data: { predictBookInfo: PredictBookInfo } | null;
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
