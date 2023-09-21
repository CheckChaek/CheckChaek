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
  data: { bookInfo: BookInfo };
}

export interface PredictResponse extends APIResponse {
  data: { predictBookInfo: PredictBookInfo };
}

// history

export interface Book {
  title: string;
  image: string;
}

export interface HistoriesResponse {
  code: string;
  message: string;
  data: Map<string, Book[]>;
}
