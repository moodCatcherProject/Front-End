import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import hanger from "../../image/hanger.png";

const EachPost = (props) => {
  const navigate = useNavigate();
  const { item } = props;

  //리사이징 에러 났을 경우
  const onErrorHandler = (e) => {
    const url = item.imgUrl.split("w280")[0];
    const name = item.imgUrl.split("w280")[1];
    if (item.imgUrl.split("/w280/")[1] !== undefined) {
      e.target.src = `${url}post${name}`;
    }
    if (item.imgUrl.split("/w280/")[1] === undefined) {
      e.target.src = hanger;
    }
  };

  return (
    <Fragment>
      <PostWrap
        onClick={() => {
          navigate(`/item_detail/${item.postId}/${item.userId}`);
          //window.location.reload();
        }}
      >
        <PostImage>
          <img
            src={item?.imgUrl}
            alt="post_image"
            onError={onErrorHandler}
          ></img>
        </PostImage>
        <PostInfoWrap>
          <JustifyAlign>
            <PostName>{item?.name_korean}</PostName>
          </JustifyAlign>
        </PostInfoWrap>
      </PostWrap>
    </Fragment>
  );
};

export default EachPost;

const PostWrap = styled.div`
  width: 158px;
  margin-bottom: -7px;
  margin-right: 16px;
  //z-index: 1px;
`;

const PostImage = styled.div`
  width: 160px;
  height: 225px;
  border-radius: 13px;
  background-color: transparent;
  background-size: cover;
  cursor: pointer;
  & > img {
    width: 172px;
    height: 225px;
    /* border-radius: 5px; */
    /* box-shadow: 5px 5px 4px #877f92; */
  }
  @media (img: img) {
    & > img {
      width: 130px;
      height: 196px;
      margin: 9px;
    }
  }
  @media (img: img) {
    & > img {
      width: 148px;
      height: 196px;
    }
  }
`;

const PostInfoWrap = styled.div`
  width: 134px;
  margin: 10px 5px 0 5px;
  & p {
    margin: 0;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const PostName = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const JustifyAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
