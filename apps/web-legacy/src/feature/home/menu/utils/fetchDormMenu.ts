import { get, REQUEST } from "~/shared/api";
import { WeeklyMenu } from "~/widgets/home/types";

interface FetchDormMenuRes {
  result: WeeklyMenu;
}

export const fetchDormMenu = async () => {
  const response = await get<FetchDormMenuRes>({
    request: REQUEST.fetchDormMenu,
  });
  return response.data;
};
