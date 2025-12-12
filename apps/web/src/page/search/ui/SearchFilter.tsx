import { RotateCw, SortDescIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';

import {
  FOOD_COURT,
  FOOD_COURT_NAME,
  type FoodCourt,
} from '@/shared/config/endpoint';
import { Select } from '@/shared/ui';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/SelectComponent';

import {
  FOOD_TYPE,
  FOOD_TYPE_NAME,
  FoodType,
  SORTING_TYPE,
  SORTING_TYPE_NAME,
  SortingType,
} from '../model/search';

interface SearchFilterProps {
  foodType: FoodType;
  restaurantType: FoodCourt;
  sort: SortingType;
}

export default memo(function SearchFilter({
  foodType,
  restaurantType,
  sort,
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get('q') || '';

  const onReset = () => {
    router.push(`/search?q=${q}`);
  };

  const onSelect = (
    type?: FoodType,
    restaurantType?: FoodCourt,
    sort?: SortingType,
  ) => {
    const params = new URLSearchParams();
    if (type) params.set('foodType', type);
    if (restaurantType) params.set('restaurantType', restaurantType);
    if (sort) params.set('sort', sort);
    router.push(`/search?q=${q}&${params.toString()}`);
  };

  function FilterFoodType() {
    return (
      <Select
        value={foodType}
        onValueChange={value =>
          onSelect(value as FoodType, restaurantType, sort)
        }
      >
        <SelectTrigger className='w-fit rounded-xl'>
          <SelectValue
            placeholder={foodType === FOOD_TYPE.DEFAULT ? '전체' : foodType}
          />
        </SelectTrigger>
        <SelectContent align='start'>
          <SelectGroup>
            {Object.values(FOOD_TYPE)
              .filter(type => type !== FOOD_TYPE.DEFAULT)
              .map(type => (
                <SelectItem key={type} value={type}>
                  {FOOD_TYPE_NAME[type]}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  function FilterRestaurantType() {
    return (
      <Select
        value={restaurantType}
        onValueChange={value => onSelect(foodType, value as FoodCourt, sort)}
      >
        <SelectTrigger className='w-fit rounded-xl'>
          <SelectValue placeholder={restaurantType} />
        </SelectTrigger>
        <SelectContent align='start'>
          <SelectGroup>
            {Object.values(FOOD_COURT)
              .filter(type => type !== FOOD_COURT.DORMITORY)
              .map(type => (
                <SelectItem key={type} value={type}>
                  {FOOD_COURT_NAME[type]}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  function FilterSortingType() {
    return (
      <Select
        value={sort}
        onValueChange={value =>
          onSelect(foodType, restaurantType, value as SortingType)
        }
      >
        <SelectTrigger
          className='flex h-full w-fit cursor-pointer items-center justify-center rounded-xl border-none px-0 hover:bg-gray-100 focus:outline-none active:bg-gray-200'
          icon={false}
        >
          <SortDescIcon size={16} />
          <span>{SORTING_TYPE_NAME[sort]}</span>
        </SelectTrigger>
        <SelectContent align='start'>
          <SelectGroup>
            {Object.values(SORTING_TYPE).map(type => (
              <SelectItem key={type} value={type}>
                {SORTING_TYPE_NAME[type]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-1 items-center justify-start'>
        <FilterSortingType />
      </div>
      <FilterFoodType />
      <FilterRestaurantType />
      <button
        className='h-full cursor-pointer focus:outline-none'
        onClick={() => onReset()}
      >
        <RotateCw size={16} />
      </button>
    </div>
  );
});
