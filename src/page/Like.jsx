import React, { useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import _ from "lodash";

//컴포넌트
import LikePosts from "../components/likeComponents/LikePosts";

//이미지
const upButton = "/images/upArrow.png";

const Closet = (props) => {
  const [scrollHeightInfo, SetScrollHeightInfo] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", _scrollPosition); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _scrollPosition); // scroll event listener 해제(스크롤이벤트 클린업)
    };
  }, [scrollHeightInfo]);

  // toTop버튼
  const showTopButton = () => {
    if (scrollHeightInfo > 2000) {
      //2000px밑으로 스크롤 내려갔을때 위로가는 Top 버튼 보이기
      return (
        <TopButton
          style={{ backgroundImage: `url(${upButton})` }}
          onClick={ScrollToTop}
        >
          <img
            src={`${upButton}`}
            alt=""
            width="0"
            height="0"
            style={{ display: "none !important" }}
          />
        </TopButton>
      );
    } else {
      return null;
    }
  };

  //스크롤 위치계산시 연산 너무 많이되는 것
  //방지하기 위해 300ms 쓰로틀적용
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollTop;
    SetScrollHeightInfo(scrollHeight);
  }, 300);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <LikePosts />
          {showTopButton()}
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Closet;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: auto;
    text-align: left;
  }
`;

const Grid = styled.div`
  margin: 60px auto 57px auto;
  max-width: 428px;
  width: 100vw;
  min-height: 926px;
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 74px;
  left: 50%;
  margin-left: -20px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;
