import { useAccessToken } from '../../data_source/apiInfo';

import {
  TaPredictDataSource,
  PredictApi,
} from '../../data_source/business/predictApi';
import { Book } from '../../interface/predictResult';

async function TaConfirmRepository(props: { imageList: File[] }) {
  const accessToken = useAccessToken();
  const { imageList } = props;
  if (accessToken) {
    const res = await TaPredictDataSource(accessToken, imageList);
    console.log(res);
    if (res !== undefined) {
      return res.data.bookInfo;
    }
  }
  console.log('Error : repository token is not existed');
}

async function PredictRepository(props: { bookInfo: Book }) {
  const accessToken = useAccessToken();
  const { bookInfo } = props;
  if (accessToken) {
    const response = await PredictApi(accessToken, bookInfo);
    if (response !== undefined) {
      console.log(response);
      return response.data.predictBookInfo;
    }
  }
  console.log('Error : repository token is not existed');
}

export { PredictRepository, TaConfirmRepository };
