import { useAccessToken } from '../../data_source/apiInfo';

import {
  TaPredictDataSource,
  PredictApi,
} from '../../data_source/business/predictApi';
import { BookInterface } from '../../interface/predictResult';

function PredictRepository(props: { bookInfo: BookInterface }) {
  // const accessToken = useAccessToken();
  const { bookInfo } = props;
  // if (accessToken) {
  PredictApi('accessToken', bookInfo)
    .then(res => {
      return res;
    })
    .catch(e => console.log(e));
  // }
  console.log('Error : repository token is not existed');
}

function TaConfirmRepository(props: { imageList: File[] }) {
  // const accessToken = useAccessToken();
  const { imageList } = props;
  // if (accessToken) {
  TaPredictDataSource('accessToken', imageList)
    .then(res => {
      return res;
    })
    .catch(e => console.log(e));
  // }
  console.log('Error : repository token is not existed');
}

export { PredictRepository, TaConfirmRepository };
