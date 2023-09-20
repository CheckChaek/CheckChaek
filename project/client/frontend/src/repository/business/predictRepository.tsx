import { useAccessToken } from '../../data_source/apiInfo';
import {
  TaPredictDataSource,
  PredictApi,
} from '../../data_source/business/predictApi';
import { BookInfo } from '../../interface/api';

function PredictRepository(props: { imageList: File[]; bookInfo: BookInfo }) {
  const accessToken = useAccessToken();
  const { imageList, bookInfo } = props;
  if (accessToken) {
    return PredictApi(accessToken, imageList, bookInfo);
  }
}

function TaConfirmRepository(props: { imageList: File[] }) {
  const accessToken = useAccessToken();
  const { imageList } = props;
  if (accessToken) {
    return TaPredictDataSource(accessToken, imageList);
  }
}

export { PredictRepository, TaConfirmRepository };
