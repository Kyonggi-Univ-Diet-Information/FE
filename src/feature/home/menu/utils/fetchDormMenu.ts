import { get, REQUEST } from "~/shared/api";

export const fetchDormMenu = async () => {
  try {
    const data = await get({ request: REQUEST.fetchDormMenu });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
