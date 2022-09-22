import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Fragment, useEffect, useState, useCallback } from "react";
import search from "../../image/search.png";
import heart from "../../image/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { __getSearch } from "../../redux/modules/searchSlice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getCookie } from "../../shared/cookie";
import _ from "lodash";
import SearchItem from "./SearchItem";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("token");
  const payload = jwt_decode(token);
  const [mood, setMood] = useState(`${heart}`);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(true);
  const [writer, setWriter] = useState(false);

  //정보 불러오기
  const recommended = useSelector((state) => state.search.recommendedPosts);
  const users = useSelector((state) => state.login.userStatus);
  const gender = users?.gender;

  //react-hook-form에서 불러오기
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  //검색하기
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    navigate(`/search/result/keyword=${data.search}?sort=${data.sort}`);
  };

  //추천게시글 불러오기
  const getRecommendedList = useCallback(() => {
    const getRecommended = async () => {
      await dispatch(__getSearch(page));
      setLoading(false);
    };
    return getRecommended();
  }, [page, recommended]);

  //스크롤 위치 계산하기
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      if (page >= 13) {
        return;
      }
      setPage(page + 1);
      getRecommendedList();
      setLoading(true);
    }
  }, 500);

  //페이지 계산해서 get 요청 보내고 page 카운트 올리기
  useEffect(() => {
    if (page === 1 && recommended.length === 0) {
      dispatch(__getSearch(page));
      setPage(page + 1);
    }
    if (recommended.length !== 0) {
      setPage(recommended.length);
    }
  }, [mood]);

  //윈도우 스크롤 위치 계산하기
  useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", _scrollPosition);
    return () => {
      window.removeEventListener("scroll", _scrollPosition);
    };
  }, [page, loading]);

  //제목으로 검색 눌렀을 때
  const onChangeTitle = () => {
    setTitle(true);
    setWriter(false);
  };

  //작성작로 검색 눌렀을 때
  const onChangeWriter = () => {
    setTitle(false);
    setWriter(true);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.search && <ErrorMsg>{errors.search.message}</ErrorMsg>}
        <SearchInput
          type="search"
          name="search"
          placeholder="제목이나 작성자로 검색해주세요"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("search", {
            required: "검색어를 입력해주세요",
            pattern: {
              value: /^[0-9|a-z|A-Z|가-힣]*$/,
              message: "검색어는 공백이나 특수문자는 포함할 수 없습니다.",
            },
          })}
        />
        <SearchImg type="submit" disabled={isSubmitting}></SearchImg>
      </form>
      <SearchBox>
        {title && !writer && (
          <>
            <CheckBox>
              <LabelTitle htmlFor={search.sort} onClick={onChangeTitle}>
                <input
                  hidden
                  id={search.sort}
                  type="radio"
                  value="title"
                  checked
                  {...register("sort")}
                />
                제목으로 검색하기
              </LabelTitle>
            </CheckBox>
            <NotCheckBox>
              <LabelWriter htmlFor={search.sort} onClick={onChangeWriter}>
                <input
                  hidden
                  id={search.sort}
                  type="radio"
                  value="writer"
                  {...register("sort")}
                />
                작성자로 검색하기
              </LabelWriter>
            </NotCheckBox>
          </>
        )}

        {!title && writer && (
          <>
            <NotCheckBox>
              <LabelTitle htmlFor={search.sort} onClick={onChangeTitle}>
                <input
                  hidden
                  id={search.sort}
                  type="radio"
                  value="title"
                  checked
                  {...register("sort")}
                />
                제목으로 검색하기
              </LabelTitle>
            </NotCheckBox>
            <CheckBox>
              <LabelWriter htmlFor={search.sort} onClick={onChangeWriter}>
                <input
                  hidden
                  id={search.sort}
                  type="radio"
                  value="writer"
                  {...register("sort")}
                />
                작성자로 검색하기
              </LabelWriter>
            </CheckBox>
          </>
        )}
      </SearchBox>
      <ClosetBox>
        <h1>Other Closet</h1>
      </ClosetBox>
      {recommended?.map((item) => (
        <SearchItem key={item.postId} item={item} />
      ))}
    </Fragment>
  );
};
const ErrorMsg = styled.p`
  color: #c60000;
  font-size: 10px;
  margin-left: 30px;
  margin-bottom: -20px;
`;
const SearchBox = styled.div`
  width: 348px;
  margin: 0 auto;
  border-top: 3px solid #fff;
  padding-top: 7px;
  position: relative;
  top: -60px;
  display: flex;
  align-items: left;
  justify-content: baseline;
  flex-direction: row;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  color: #2d273f;

  .check {
    background-color: transparent;
    border: none;
  }
`;
const LabelTitle = styled.label`
  color: #2d273f;
`;
const LabelWriter = styled.label`
  display: block;
  color: #2d273f;
`;
const CheckBox = styled.div`
  width: 110px;
  height: 15px;
  padding: 5px;
  border-bottom: 2px solid #fff;
`;
const NotCheckBox = styled.div`
  width: 110px;
  height: 15px;
  padding: 5px;
`;

const SearchInput = styled.input`
  background-color: rgba(0, 0, 0, 0);
  width: 350px;
  height: 50px;
  border: none;
  border-radius: 10px;
  margin: 10px 40px;
  :focus {
    outline: none;
  }
`;

const ClosetBox = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  margin-top: -50px;
  font-family: "Unna";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  margin-left: 40px;
`;

const SearchImg = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  background-position: center;
  background-size: cover;
  background-image: url(${search});
  position: relative;
  left: 345px;
  top: -58px;
  cursor: pointer;
`;
export default SearchForm;
