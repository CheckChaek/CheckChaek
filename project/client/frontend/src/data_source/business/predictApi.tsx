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
            bookInfo,
          },
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
  }
}
