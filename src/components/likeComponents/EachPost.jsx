import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __patchMood } from "../../redux/async/like";
import heartFalse from "../../image/heart.png";
import heartTrue from "../../image/heartTrue.png";

const junsu = "/images/junsu.PNG";
const heart = "/images/heart.png";

const EachPost = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = props;
  const [likeStatus, setLikeStatus] = useState(item?.likeStatus);
  const [mood, setMood] = useState(`${heartFalse}`);
  const [moodNum, setMoodNum] = useState(item?.likeCount);

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (likeStatus === false) {
      setMood(`${heartFalse}`);
    }
  }, [mood, likeStatus, item]);

  //무드 버튼 누르기
  const onClickMoodBtn = (e) => {
    e.stopPropagation();
    setMoodNum(moodNum + 1);
    setLikeStatus(true);
    dispatch(__patchMood(item.postId));
  };

  //무드버튼 취소하기
  const onClickMoodCancelBtn = (e) => {
    e.stopPropagation();
    setMoodNum(moodNum - 1);
    setLikeStatus(false);
    dispatch(__patchMood(item.postId));
  };

  //리사이징 에러 났을 경우
  const onErrorHandler = (e) => {
    const url = item.imgUrl.split("w280")[0];
    const name = item.imgUrl.split("w280")[1];
    e.target.src = `${url}post${name}`;
  };

  return (
    <Fragment>
      <WritedClosetInfo
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate(`/item_detail/${item.postId}/${item.userId}`);
          window.location.reload();
        }}
      >
        <ClosetImage>
          <img src={item?.imgUrl} alt="test" onError={onErrorHandler} />
        </ClosetImage>
        <ClosetTextWrap>
          <GridHorizon>
            <CreatedText>
              <span>{item?.createdAt.slice(0, 10)}</span>
            </CreatedText>
            <TitleText>
              <span>{item?.title}</span>
            </TitleText>
            <ContentText>
              {/* <span>{item?.createdAt.slice(5)}</span> */}
              <br />
              <span>{item?.content}</span>
            </ContentText>
            <HeartText>
              {likeStatus ? (
                <img
                  src={`${heartTrue}`}
                  alt="heart"
                  onClick={(e) => onClickMoodCancelBtn(e)}
                />
              ) : (
                <img
                  src={`${heartFalse}`}
                  alt="heart"
                  onClick={(e) => onClickMoodBtn(e)}
                />
              )}
              <span>{moodNum}</span>
            </HeartText>
          </GridHorizon>
        </ClosetTextWrap>
      </WritedClosetInfo>
    </Fragment>
  );
};

export default EachPost;

const WritedClosetInfo = styled.div`
  display: flex;
  margin: 10px auto;
  width: 350px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 3px solid #e6e5ea;
  cursor: pointer;
  /* box-shadow: 5px 5px 4px #877f92; */
`;

const ClosetImage = styled.div`
  margin: 13px;
  border-radius: 10px;
  width: 80px;
  height: 90px;
  background-color: #ffffff;

  & > img {
    width: 131px;
    height: 174px;
    border-radius: 20px;
    //box-shadow: 5px 5px 4px #877f92;
  }
`;

const ClosetTextWrap = styled.div`
  margin: 66px 0 30px 50px;
  width: 145px;
  word-break: break-all;
  word-wrap: break-word;
`;

const GridHorizon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
`;
const CreatedText = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  text-align: end;
  color: #7b758b;
  position: relative;
  left: 20px;
  margin-top: -55px;
  margin-bottom: 30px;
`;

const TitleText = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 21px;
  font-weight: 700;
  line-height: 20px;
  color: #7b758b;
`;

const ContentText = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 13px;
  color: #7b758b;
`;

const HeartText = styled.div`
  display: flex;
  margin-top: 21px;
  align-items: center;
  & > span {
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #7b758b;
  }
  & > img {
    margin-right: 2px;
    width: 20px;
    height: 20px;
  }
`;
