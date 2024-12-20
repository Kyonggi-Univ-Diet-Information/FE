import styled from '@emotion/styled';
import { MdOutlineThumbUp } from 'react-icons/md';
import { IoMdThumbsUp } from 'react-icons/io';
import { axios, getCookie, requests } from '../../shared';
import { useState, useEffect } from 'react';

export default function ReviewItem({ review }) {
  const [favCount, setFavCount] = useState(0);
  const [fav, setFav] = useState(false);

  async function fetchFavCnt() {
    const cnt = await axios.get(requests.fetchReviewFav + review.id);
    setFavCount(cnt.data);
  }

  async function fetchIsFaved() {
    try {
      const response = await axios.get(requests.fetchMemberFav, {
        headers: { Authorization: `Bearer ${getCookie('token')}` },
      });
      console.log(response);
      const favList = response.data.map((item) => item.dietFoodReviewId);
      console.log(favList);
      console.log(review.id);
      console.log(favList.includes(review.id));
      setFav(favList.includes(review.id));
    } catch (error) {}
  }

  async function toggleFavorite() {
    if (!fav) {
      await axios.post(
        requests.toggleReviewFav + review.id + '/create-favorite',
        null,
        { headers: { Authorization: `Bearer ${getCookie('token')}` } },
      );
      await Promise.all([fetchIsFaved(), fetchFavCnt()]);
    } else {
      await axios.delete(requests.toggleReviewFav + 'delete/' + review.id, {
        headers: { Authorization: `Bearer ${getCookie('token')}` },
      });
      await Promise.all([fetchIsFaved(), fetchFavCnt()]);
    }
  }

  useEffect(() => {
    if (getCookie('token')) {
      fetchIsFaved();
    }
    fetchFavCnt();
  }, []);

  function maskName(name) {
    if (name.length <= 1) {
      return name;
    }
    return name[0] + '*'.repeat(name.length - 1);
  }

  return (
    <Review>
      <ReviewInfo>
        <span>
          {maskName(review.memberName)}{' '}
          <span style={{ fontSize: '12px', fontWeight: 500 }}>
            {review.createdAt}
          </span>
        </span>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {favCount}
            </div>
            <LikeBtn
              onClick={() => toggleFavorite()}
              disabled={!getCookie('token')}
            >
              {fav ? (
                <IoMdThumbsUp size={16} />
              ) : (
                <MdOutlineThumbUp size={16} />
              )}
            </LikeBtn>
          </div>
        </div>
      </ReviewInfo>
      {review.content}
    </Review>
  );
}

const Review = styled.div`
  box-sizing: border-box;
  padding: 12px;
  margin: 0px;
  font-family: Pretendard;
  font-size: 15px;
  line-height: 1.5em;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 8px;
`;
const ReviewInfo = styled.div`
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  margin: 0px;
  padding-bottom: 4px;
  cursor: pointer;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 2px;
`;
