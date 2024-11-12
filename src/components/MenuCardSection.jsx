import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { IoMdThumbsUp } from 'react-icons/io'
import { MdOutlineThumbUp } from 'react-icons/md'
import {
  MdFreeBreakfast,
  MdLunchDining,
  MdDinnerDining,
  MdOutlineMenuBook,
} from 'react-icons/md'
import styled from '@emotion/styled'
import dormMenus from '../datas/dormMenus.json'
import reviews from '../datas/reviews.json'

const MenuCardContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const MenuCard = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 60vh;
  border: none;
  border-radius: 30px;
  background-color: #fff;
  padding: 20px;

  @media (max-width: 480px) {
    align-items: start;
    border-radius: 15px;
    border: none;
    width: 85vw;
    height: 400px;
  }
  @media (max-width: 390px) {
    height: 370px;
  }
`

const MenuDiv = styled.div`
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  padding-right: 20px;

  @media (max-width: 480px) {
    padding: 0;
    text-align: start;
    margin: 0;
  }
`

const MenuSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 60vh;
  border: none;
  border-radius: 15px;
  background-color: #fff;
  margin-right: 20px;

  @media (max-width: 480px) {
    background-color: transparent;
    border: none;
    width: 80vw;
    height: 32px;
    display: flex;
    flex-direction: row;
    margin: 0;
    margin-bottom: 10px;
  }
`

const MenuSelectorBtn = styled.button`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: none;
  background-color: ${(props) => (props.isSelected ? '#00abaa' : '#fff')};
  color: ${(props) => (props.isSelected ? '#fff' : '#ccc')};
  cursor: pointer;
  height: 140px;
  width: 80px;
  font-size: 16px;
  font-family: Pretendard;
  transition:
    background-color 0.3s ease,
    background-position 0.3s ease;

  @media (max-width: 480px) {
    width: 16vw;
    height: 32px;
    font-size: 15px;
    border-radius: 15px;
    margin-right: ${(props) => props.marginright}px;
  }
`

const Menu = styled.p`
  font-family: Pretendard;
  font-size: 25px;
  font-weight: 500;
  margin: 0px;
  padding-top: 12px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? '#00abaa' : '#000')};

  &:hover {
    color: #00abaa;
  }

  @media (max-width: 480px) {
    padding-top: 8px;
    font-size: 15px;
  }
`

const menuItems = dormMenus.DormMenus
const menuReviews = reviews.DormMenuReviews

const ReviewScrollView = styled.div`
  overflow: scroll;
  height: 44vh;
`

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
`
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
`

const MenuReviewDiv = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 20px;
  flex-direction: column;

  width: 50vw;
  height: 100%;
  background-color: #f4f4f4;
  border-radius: 15px;
  font-family: Pretendard;
  font-size: 20px;
  @media (max-width: 480px) {
    display: none;
  }
`

const Title = styled.p`
  font-size: 25px;
  margin: 0;
  margin-bottom: 20px;
`

const LikeBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 4px;
`

const Unselected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  line-height: 3em;
`

const Icons = styled.p`
  @media (max-width: 480px) {
    display: none;
  }
`

const MenuReview = ({ selectedMenu, menuReviews }) => {
  if (!selectedMenu)
    return (
      <Unselected>
        <MdOutlineMenuBook size={35} />
        메뉴를 선택하고 리뷰를 확인하세요!
      </Unselected>
    )
  if (!menuReviews) return <div></div>

  const selectedReview = menuReviews.find((item) => item.id === selectedMenu)

  if (!selectedReview) return <div>리뷰를 찾을 수 없습니다.</div>

  return (
    <div>
      {menuReviews && (
        <>
          <Title>
            <b>{selectedMenu}</b>, 어떨까?
          </Title>
          <ReviewScrollView>
            {selectedReview.reviews.map((review) => (
              <Review key={review.id}>
                <ReviewInfo>
                  <span>
                    {review.memberName}{' '}
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>
                      2024-11-08
                    </span>
                  </span>
                  <span>
                    <span>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <FaStar size={12} key={index} />
                      ))}
                    </span>
                    <LikeBtn>
                      <MdOutlineThumbUp />
                      {/* <IoMdThumbsUp /> */}
                    </LikeBtn>
                  </span>
                </ReviewInfo>
                {review.content}
              </Review>
            ))}
          </ReviewScrollView>
        </>
      )}
    </div>
  )
}

export default function MenuCardSection() {
  const [clicked, setClicked] = useState(0)
  const [selectedMenu, setSelectedMenu] = useState(null)

  return (
    <MenuCardContainer>
      <MenuSelector>
        {Array.from({ length: 3 }).map((_, index) => {
          const labels = ['아침', '점심', '저녁']
          const icons = [
            <MdFreeBreakfast size={20} />,
            <MdLunchDining size={20} />,
            <MdDinnerDining size={20} />,
          ]
          return (
            <MenuSelectorBtn
              key={index}
              onClick={() => {
                setClicked(index)
                setSelectedMenu(null)
              }}
              isSelected={clicked === index}
              marginright={index === 2 ? 0 : 10}
            >
              <Icons> {icons[index]}</Icons>
              {labels[index]}
            </MenuSelectorBtn>
          )
        })}
      </MenuSelector>
      <MenuCard>
        <MenuDiv>
          {menuItems[clicked].menus.map((menu, index) => (
            <Menu
              key={index}
              isSelected={selectedMenu === menu}
              onClick={() => {
                setSelectedMenu(menu)
              }}
            >
              {menu}
            </Menu>
          ))}
        </MenuDiv>
        <MenuReviewDiv>
          <MenuReview selectedMenu={selectedMenu} menuReviews={menuReviews} />
        </MenuReviewDiv>
      </MenuCard>
    </MenuCardContainer>
  )
}
