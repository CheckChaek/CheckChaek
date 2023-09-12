import { BookInfo, Response } from '../../../interface/api';

class HistoryDetailResponse {
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
    return this.Message;
  }

  public get Data(): Map<string, BookInfo> {
    return this.data;
  }
}

export default HistoryDetailResponse;
