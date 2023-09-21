import axios from 'axios';
import { BookInterface } from '../../interface/predictResult';
import { APIResponse } from '../../interface/api';
import { BUSINESS_URI } from '../apiInfo';

const url = `${BUSINESS_URI}/imageinfo`;

export async function TaPredictDataSource(token: string, imageList: File[]) {
  const formData = new FormData();
  imageList.forEach(image => {
    formData.append('imageList', image);
  });
  if (token) {
    await axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTIwMTA2OSwidXNlcm5hbWUiOiJHT09HTEVfMTEwMDM2OTkyMzQ1MDA2NTgzMTk1In0.7JEifuE9_rOyPRXWF1B7GPCgfO1KdtOQn6JWHWi1_SK8t0mcOAcJUemFweIK-O8zrwhARMviHPxP17FIW9sQ5Q`,
        },
      })
      .then(res => {
        // if (res.status === 200) {
        //   return res.data as APIResponse;
        // }
        // return res.statusText;
        return res;
      })
      .catch(e => console.log(e));
  }
}

export async function PredictApi(token: string, bookInfo: BookInterface) {
  if (token) {
    await axios
      .post(
        url,
        {
          params: {
            bookInfo,
          },
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        // if (res.status === 200) {
        //   return res.data as APIResponse;
        // }
        // return res.statusText;
        return res;
      })
      .catch(e => console.log(e));
  }
}
