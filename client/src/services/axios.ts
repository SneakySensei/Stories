import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: `/api/v1`,
});

export const getGAuth = async (): Promise<boolean> => {
  try {
    const res: AxiosResponse = await instance.get("/auth/generate");
    window.location.href = res.data.url;
    return true;
  } catch (err) {
    errorHandler(err);
    return false;
  }
};

const errorHandler = (err: AxiosError) => {
  let errMessage: string;
  switch (err.response?.status) {
    case 400:
      errMessage = "Bad request. Kindly check your inputs.";
      break;
    case 401:
      errMessage = "Unauthorized.";
      break;
    case 403:
      errMessage = "Forbidden.";
      break;
    case 500:
      errMessage = "Internal server error.";
      break;
    default:
      errMessage = "Oops! Something went wrong.";
      break;
  }
  console.log(err);
};
