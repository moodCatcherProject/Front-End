import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import heart from "../../image/heart.png";
import heartTrue from "../../image/heartTrue.png";
import { useState, useEffect } from "react";
import { __patchMood } from "../../redux/async/like";

const BestItem = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mood, setMood] = useState(`${heart}`);
  const [likeStatus, setLikeStatus] = useState(item.likeStatus);
  const [moodNum, setMoodNum] = useState(item.likeCount);

  //새로고침시에도 무드 상태값 유지
  useEffect(() => {
    if (likeStatus === true) {
      setMood(`${heartTrue}`);
    }
    if (likeStatus === false) {
      setMood(`${heart}`);
    }
  }, [mood, likeStatus]);

  //무드 등록
  const onClickMoodBtn = () => {
    setLikeStatus(true);
    setMoodNum(moodNum + 1);
    dispatch(__patchMood(item.postId));
  };

  //무드 취소
  const onClickMoodCancelBtn = () => {
    setLikeStatus(false);
    setMoodNum(moodNum - 1);
    dispatch(__patchMood(item.postId));
  };

  return (
    <OtherClosetBox key={item.postId}>
      <ImgBox
        url={item.imgUrl}
        onClick={() => navigate(`/item_detail/${item.postId}/${item.userId}`)}
      ></ImgBox>
      <TextBox>
        <p>{item.title}</p>
        <h5>{item.content}</h5>
        <HeartBox>
          {likeStatus ? (
            <Heart url={`${heartTrue}`} onClick={onClickMoodCancelBtn}></Heart>
          ) : (
            <Heart url={`${heart}`} onClick={onClickMoodBtn}></Heart>
          )}

          <p>{moodNum}</p>
        </HeartBox>
      </TextBox>
    </OtherClosetBox>
  );
};
const OtherClosetBox = styled.div`
  width: 350px;
  height: 200px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  border: 3px solid #e6e5ea;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ImgBox = styled.div`
  margin-left: 10px;
  width: 130px;
  height: 170px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
`;
const TextBox = styled.div`
  margin-left: 10px;
  width: 200px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 800;
  color: #7b758b;
  p {
    font-size: 18px;
  }
  h5 {
    font-size: 13px;
  }
`;

const HeartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const Heart = styled.div`
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.url});
  cursor: pointer;
`;

export default BestItem;
