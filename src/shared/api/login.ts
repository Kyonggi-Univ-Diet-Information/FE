import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.kiryong.site/",
});

export const fetchKakao = async (code: string) => {
  try {
    const response = await instance.get("api/kakao-login", {
      params: { code },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Failed to get data:", error.response?.data || error.message);
  }
};
