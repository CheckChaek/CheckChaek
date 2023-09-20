import axios from 'axios';

import { Response } from '../../interface/api';
import { BUSINESS_URI } from '../apiInfo';

function PredictApi(imageList: File[]) {
  const url = `${BUSINESS_URI}/imageInfo`;
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios
      .post(
        url,
        {
          params: {
            imageList,
          },
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          return res.data as Response;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
  }
}

export default PredictApi;
