import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import heart from "../../image/heart.png";
import { __getLikeAllPosts } from "../../redux/async/like";
import EachPost from "./EachPost";
import styled from "styled-components";
import InfinityScrollLoader from "./InfinityScrollLoader";
import _ from "lodash";
import { deleteCookie, getCookie } from "../../shared/cookie";
import jwt from "jwt-decode"; // to get userId from loggedIn user's token

const LikePosts = () => {
  const dispatch = useDispatch();
  const [mood, setMood] = useState(`${heart}`);

  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [paging, setPaging] = useState(1); //페이지넘버

  const allLikePosts = useSelector((state) => state.like.allPosts);

  // 토큰 decode를 통해서 현재 로그인한 유저 id 가져오기
  const token = getCookie("token");
  // console.log(jwt(token));
  const { userId } = jwt(token);
  // console.log(ranksIF);

  const getLikeList = useCallback(() => {
    const getLikeData = async () => {
      await dispatch(__getLikeAllPosts({ paging: paging, userId: userId })); //api요청
      setLoading(false); //요청하고나면 loading false로
    };
    return getLikeData();
  }, [paging, allLikePosts]); //usecallback의 deps에 페이지랑 맥주목록 바뀔때마다 실행되게

  const _handleScroll = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    //스크롤계산 사용자의 현재위치 + 스크롤위에서부터 위치가 전체 높이보다 커지면 함수실행
    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      if (paging >= 13) {
        return;
      }
      setPaging(paging + 1); //다음페이지
      getLikeList(); //api요청 실행
      setLoading(true); //실행동안 loading true로 바꾸고 요청 막기
    }
  }, 500);

  useEffect(() => {
    // console.log(paging, userId, allLikePosts);

    if (paging === 1 && allLikePosts.length === 0) {
      // console.log(paging, userId);
      dispatch(__getLikeAllPosts({ paging: paging, userId: userId }));
      setPaging(paging + 1);
    } //첫렌더링시 0페이지 받아오기
    if (allLikePosts.length !== 0) {
      setPaging(allLikePosts.length);
    } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
  }, [mood]);

  useEffect(() => {
    if (loading) {
      return;
    } //로딩이 true일 경우 리턴
    window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
    };
  }, [paging, loading]);
  // console.log(ranksIF);

  return (
    <Fragment>
      {allLikePosts?.map((item, idx) => (
        <EachPost key={idx} item={item} />
      ))}

      {loading ? <InfinityScrollLoader /> : ""}
    </Fragment>
  );
};

export default LikePosts;
