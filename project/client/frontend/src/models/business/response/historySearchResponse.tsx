import { BookInfo, Response } from '../../../interface/api';

class HistorySearchResponse {
  code: string;

  message: string;

  data: Map<string, BookInfo>;

  constructor(response: Response) {
    this.code = response.code;
    this.message = response.message;
    this.data = response.data;
  }

  public get Code(): string {
    return this.code;
  }

  public get Message(): string {
    return this.message;
  }

  public get Data(): Map<string, BookInfo> {
    return this.data;
  }
}

export default HistorySearchResponse;
