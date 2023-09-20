import axios from 'axios';

import { BookInfo, APIResponse } from '../../interface/api';
import { BUSINESS_URI } from '../apiInfo';

const url = `${BUSINESS_URI}/imageinfo`;

export function TaPredictDataSource(token: string, imageList: File[]) {
  const formData = new FormData();
  imageList.forEach(image => {
    formData.append('imageList', image);
  });
  if (token) {
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          return res.data as APIResponse;
        }
        return res.statusText;
      })
      .catch(e => console.log(e));
  }
}

export function PredictApi(
  token: string,
  imageList: File[],
  bookInfo: BookInfo,
) {
  const formData = new FormData();
  imageList.forEach(image => {
    formData.append('imageList', image);
  });
  if (token) {
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
