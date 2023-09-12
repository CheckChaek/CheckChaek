export interface BookInfo {
  title: string;
  author: string;
  publisher: string;
  status: number;
  price: number;
  image: string;
  // minprice: number;
  // maxprice: number;
  // ogprice: number;
}

export interface Response {
  code: string;
  message: string;
  data: Map<string, BookInfo>;
}

export interface Book {
  title: string;
  image: string;
}

export interface HistoriesResponse {
  code: string;
  message: string;
  data: Map<string, Book[]>;
}
