import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.kiryong.site/",
});

export const get = async ({
  request,
  headers,
  format = false,
  params,
}: {
  request: string;
  headers?: unknown;
  format?: boolean;
  params?: unknown;
}) => {
  try {
    let response;
    if (params) response = await instance.get(`${request}`, { params: params });
    else response = await instance.get(`${request}`, headers);
    if (format) return response;
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const post = async <T, S = unknown>(
  request: string,
  data: T,
  config?: S,
) => {
  try {
    const response = await instance.post(`${request}`, data, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const del = async <S = unknown>(request: string, config?: S) => {
  try {
    const response = await instance.delete(`${request}`, config);
    return response;
  } catch (error) {
    console.log(error);
  }
};
