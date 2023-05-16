import axios from "axios";

export const post = (url: string, param: any) => {
  const URL = `http://localhost:3001${url}`;

  return axios(URL, {
    method: "post",

    headers: {
      "Content-Type": "multipart/form-data",
    },

    data: JSON.stringify(param),
  })
    .then((response) => response.data)

    .catch((error) => {
      throw error;
    });
};
