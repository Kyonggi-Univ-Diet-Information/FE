import { revalidatePath, revalidateTag } from 'next/cache';

import { ENDPOINT, FOOD_COURT, KEY } from '@/shared/config';

import {
  revalidateReviewCache,
  revalidateReviewFavCache,
} from './revalidateReviewCache';

// next/cache 모킹
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
  revalidatePath: jest.fn(),
}));

describe('revalidateReviewCache', () => {
  const mockType = FOOD_COURT.KYONGSUL;
  const mockFoodId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 관련 모든 캐시 태그를 revalidate한다', () => {
    // When: revalidateReviewCache 호출
    revalidateReviewCache({ type: mockType, foodId: mockFoodId });

    // Then: 모든 관련 태그가 revalidate됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_COUNT(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_AVERAGE_RATING(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_RATING_COUNT(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(KEY.MEMBER_REVIEW(0));
    expect(revalidateTag).toHaveBeenCalledWith(KEY.TOP_MENU);
    expect(revalidateTag).toHaveBeenCalledWith(KEY.RECENT_REVIEW);

    // Then: revalidatePath가 호출됨
    expect(revalidatePath).toHaveBeenCalledWith(
      ENDPOINT.REVIEW_R.PAGED(mockType, mockFoodId),
    );
  });

  it('특정 페이지가 지정되면 해당 페이지만 revalidate한다', () => {
    // Given: 특정 페이지 번호
    const specificPage = 2;

    // When: specificPage와 함께 호출
    revalidateReviewCache({
      type: mockType,
      foodId: mockFoodId,
      specificPage,
    });

    // Then: 특정 페이지 태그가 revalidate됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_PAGED(mockType, mockFoodId, specificPage),
    );

    // Then: revalidatePath는 호출되지 않음
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('여러 음식점 타입에서 정상 작동한다', () => {
    // Given: E_SQUARE 타입
    const eSquareType = FOOD_COURT.E_SQUARE;
    const eSquareFoodId = 456;

    // When: E_SQUARE로 호출
    revalidateReviewCache({ type: eSquareType, foodId: eSquareFoodId });

    // Then: E_SQUARE 관련 태그들이 revalidate됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW(eSquareType, eSquareFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_COUNT(eSquareType, eSquareFoodId),
    );
  });

  it('revalidateTag가 정확히 7번 호출된다 (specificPage 없을 때)', () => {
    // When: revalidateReviewCache 호출
    revalidateReviewCache({ type: mockType, foodId: mockFoodId });

    // Then: revalidateTag가 7번 호출됨
    expect(revalidateTag).toHaveBeenCalledTimes(7);
    expect(revalidatePath).toHaveBeenCalledTimes(1);
  });

  it('revalidateTag가 정확히 8번 호출된다 (specificPage 있을 때)', () => {
    // When: specificPage와 함께 호출
    revalidateReviewCache({
      type: mockType,
      foodId: mockFoodId,
      specificPage: 1,
    });

    // Then: revalidateTag가 8번 호출됨 (추가 페이지 태그 포함)
    expect(revalidateTag).toHaveBeenCalledTimes(8);
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe('revalidateReviewFavCache', () => {
  const mockType = FOOD_COURT.KYONGSUL;
  const mockReviewId = 999;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('좋아요 관련 모든 캐시 태그를 revalidate한다', () => {
    // When: revalidateReviewFavCache 호출
    revalidateReviewFavCache(mockType, mockReviewId);

    // Then: 모든 관련 태그가 revalidate됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_FAVED_COUNT(mockType, mockReviewId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(KEY.REVIEW_FAVED(mockType));
    expect(revalidateTag).toHaveBeenCalledWith(KEY.MEMBER_FAV_REVIEW(0));

    // Then: revalidateTag가 정확히 3번 호출됨
    expect(revalidateTag).toHaveBeenCalledTimes(3);
  });

  it('여러 음식점 타입에서 정상 작동한다', () => {
    // Given: DORMITORY 타입
    const dormType = FOOD_COURT.DORMITORY;
    const dormReviewId = 555;

    // When: DORMITORY로 호출
    revalidateReviewFavCache(dormType, dormReviewId);

    // Then: DORMITORY 관련 태그들이 revalidate됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_FAVED_COUNT(dormType, dormReviewId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(KEY.REVIEW_FAVED(dormType));
  });

  it('다른 reviewId에서도 정상 작동한다', () => {
    // Given: 다른 reviewId
    const differentReviewId = 12345;

    // When: 다른 reviewId로 호출
    revalidateReviewFavCache(mockType, differentReviewId);

    // Then: 해당 reviewId로 태그가 생성됨
    expect(revalidateTag).toHaveBeenCalledWith(
      KEY.REVIEW_FAVED_COUNT(mockType, differentReviewId),
    );
  });

  it('revalidatePath는 호출되지 않는다', () => {
    // When: revalidateReviewFavCache 호출
    revalidateReviewFavCache(mockType, mockReviewId);

    // Then: revalidatePath는 호출되지 않음
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
