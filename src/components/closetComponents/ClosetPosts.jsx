import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import InfinityScrollLoader from "../../elem/InfinityScrollLoader";
import _ from "lodash";

//통신
import { __getMyCloset } from "../../redux/async/upload";
import {
  InfinityCloset,
  deleteMyCloset,
} from "../../redux/modules/uploadSlice";

//컴포넌트
import CardForm from "../../elem/CardForm";

//이미지
import hanger from "../../image/옷걸이.png";

const ClosetPosts = () => {
  const dispatch = useDispatch();
  const ranksIFList = useSelector(InfinityCloset); //redux store값 받아오는부분
  const last = useSelector((state) => state.upload.postLast); //마지막 페이지 판단
  const ranksIF = [...new Set(ranksIFList.map(JSON.stringify))].map(JSON.parse); //전체 리스트 중복제거
  const [loading, setLoading] = useState(false); //데이터 받아오는동안 로딩 true로 하고 api요청 그동안 한번만되게
  const [paging, setPaging] = useState(1); //페이지넘버

  const { userId } = useParams(); //주소창의 유저 아이디 받아오기

  useEffect(() => {
    if (paging === 1 && ranksIF.length === 0) {
      dispatch(__getMyCloset({ userId: userId, paging: paging }));
      setPaging(paging + 1);
    } //첫렌더링시 0페이지 받아오기
    if (ranksIF.length !== 0) {
      setPaging(ranksIF.length / 4 + 1);
    } //다른컴포넌트 갔다 올때 렌더링시 페이지넘버 계산
  }, [userId]);

  useEffect(() => {
    if (loading) {
      return;
    } //로딩이 true일 경우 리턴
    window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
    return () => {
      window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
    };
  }, [paging, loading]);

  useEffect(() => {
    return () => {
      dispatch(deleteMyCloset());
    };
  }, []);

  const getInfinityList = useCallback(() => {
    async function getData() {
      await dispatch(__getMyCloset({ userId: userId, paging: paging })); //api요청
      setLoading(false); //요청하고나면 loading false로
    }
    return getData();
  }, [paging, ranksIF, userId]); //usecallback의 deps에 페이지랑 맥주목록 바뀔때마다 실행되게

  const _handleScroll = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    //스크롤계산 사용자의 현재위치 + 스크롤위에서부터 위치가 전체 높이보다 커지면 함수실행
    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      if (last) {
        return;
      }
      setPaging(paging + 1); //다음페이지
      getInfinityList(); //api요청 실행
      setLoading(true); //실행동안 loading true로 바꾸고 요청 막기
    }
  }, 500);

  return (
    <Fragment>
      {ranksIF?.length === 0 && (
        <>
          <EmptyLike src={`${hanger}`} alt="empty_closet" />
          <EmptyText>
            <p>옷장이 비어있습니다</p>
          </EmptyText>
        </>
      )}
      {ranksIF?.map((item, idx) => (
        <CardForm key={idx} item={item} />
      ))}

      {loading ? <InfinityScrollLoader /> : ""}
    </Fragment>
  );
};
const EmptyLike = styled.img`
  display: flex;
  margin: 230px auto auto auto;
  width: 250px;
  height: 150px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-style: Bold;
  font-weight: 700;
  font-size: 17px;
`;
const EmptyText = styled.div`
  margin: -50px auto 0 auto;
  width: 150px;
`;
export default ClosetPosts;
