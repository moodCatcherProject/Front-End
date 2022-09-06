import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const junsu = "/images/junsu.PNG";
const heart = "/images/heart.png";

const RepPost = ({ myRepPost }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* 대표게시물 조회 */}
      <Wrap>
        <StTag>My Closet</StTag>
      </Wrap>
      <WritedClosetInfo
        onClick={() => {
          navigate("/closet/1");
        }}
      >
        <ClosetImage>
          <img src={junsu} />
        </ClosetImage>
        <ClosetTextWrap>
          <GridHorizon>
            <TitleText>
              <span>내 다리 롱다리</span>
            </TitleText>
            <ContentText>
              <span>
                00/00 사진관에서 사진찍고 거울샷 찍었는데 길게 나와서 맘에든다.
              </span>
            </ContentText>
            <HeartText>
              <img src={heart} alt="heart" />
              <span>100+</span>
            </HeartText>
          </GridHorizon>
        </ClosetTextWrap>
      </WritedClosetInfo>
    </Fragment>
  );
};

const Wrap = styled.div`
  margin: 21px auto 10px;
  width: 350px;
`;

const StTag = styled.div`
  margin-bottom: 10px;
  width: 200px;
  height: 40px;
  border-radius: 17px;
  background: linear-gradient(to right, #7b758b 50%, #c8c6d0);
  text-align: center;
  line-height: 40px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Unna";
  color: white;
  box-shadow: 5px 5px 4px #877f92;
`;

const WritedClosetInfo = styled.div`
  display: flex;
  margin: 0px auto 37px;
  width: 350px;
  height: 200px;
  background-color: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 5px 5px 4px #877f92;
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
    box-shadow: 5px 5px 4px #877f92;
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

const TitleText = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #7b758b;
`;

const ContentText = styled.p`
  margin: 0;
  font-size: 10px;
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

export default RepPost;