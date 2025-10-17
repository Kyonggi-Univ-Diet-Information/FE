import { Http } from '@/shared/api/http';
import { ENDPOINT } from '@/shared/config/endpoint';
import type { SubRestaurant, CampusMenu } from '@/types';

export const fetchCampusMenuByRestaurant = async (
  restaurantId: SubRestaurant,
): Promise<CampusMenu[]> => {
  const data = await Http.get<CampusMenu[]>({
    request: ENDPOINT.CAMPUS_MENU_BY_RESTAURANT + restaurantId,
    cache: 'force-cache',
  });

  return data;
};
