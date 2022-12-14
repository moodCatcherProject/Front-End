import React, { useRef, useState, Fragment, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// 통신
import { __getDetail } from "../redux/async/upload";
import { regFormdata, regPost } from "../redux/modules/uploadSlice";

// 컴포넌트
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";

const Edit_post = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { imgUrl } = useParams();
  // 상세 게시물 구독
  const detailPost = useSelector((state) => state.upload.detailPost);

  // 파일, 제목, 내용
  const fileInput = useRef(null);
  const title_ref = useRef(null);
  const content_ref = useRef(null);

  // 파일 이미지 관련 상태
  const [attachment, setAttachment] = useState("");
  // 서버에 보낼 제목과 내용 상태
  const [post, setPost] = useState({
    title: detailPost.title,
    content: detailPost.content,
  });

  //제목 넣어주기
  const detailTitle = async () => {
    title_ref.current.value = await detailPost.title;
  };

  //내용 넣어주기
  const detailContent = async () => {
    content_ref.current.value = await detailPost.content;
  };

  //이미지 미리보기
  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  // input 데이터 저장하기
  const changeInput = (e) => {
    const { value, id } = e.target;
    setPost({ ...post, [id]: value });
  };

  // 서버에 이미지,제목,내용 보내는 함수
  const writePost = () => {
    if (fileInput.current.files[0] === undefined) {
      Swal.fire({
        icon: "info",
        title: "캐처님의 옷장 사진을 넣어주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (post.title === "") {
      Swal.fire({
        icon: "info",
        title: "캐처님의 옷장 제목을 넣어주세요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (fileInput.current.files[0] !== undefined && post.title !== "") {
      const formdata = new FormData();
      formdata.append("postImage", fileInput.current.files[0]);

      dispatch(regFormdata(formdata));
      dispatch(regPost(post));
      navigate(`/edit_post_select/${postId}`);
    }
  };

  // 초기 렌더링시 값들 변경
  useEffect(() => {
    dispatch(__getDetail(postId));
    detailTitle();
    detailContent();
  }, []);

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <JustifyAlign>
            <UploadText>수정하기</UploadText>
          </JustifyAlign>
          <StUploadBox>
            <StFileButton>
              <button>
                <label htmlFor="file-input">파일선택</label>
              </button>
            </StFileButton>
            <StImageBox>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                name="postImage"
                ref={fileInput}
                onChange={selectImg}
                style={{ display: "none" }}
              />
              <div className="ImgDiv">
                <img
                  src={
                    attachment
                      ? attachment
                      : `https://gwonyeong.s3.ap-northeast-2.amazonaws.com/post/${imgUrl}`
                  }
                  alt=""
                  className="default"
                />
              </div>
            </StImageBox>
            <StText>제목</StText>
            <StTitleInput>
              <input
                id="title"
                maxLength={17}
                required
                onChange={changeInput}
                ref={title_ref}
              />
            </StTitleInput>
            <StText>내용</StText>
            <StContentInput>
              <input
                id="content"
                maxLength={25}
                required
                onChange={changeInput}
                ref={content_ref}
              />
            </StContentInput>
            <StNextBtnBox>
              <NextButton onClick={writePost}>
                <p>다음</p>
              </NextButton>
            </StNextBtnBox>
          </StUploadBox>
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

export default Edit_post;

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
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
`;

const JustifyAlign = styled.div`
  display: flex;
  margin: 56px auto 0;
  width: 366px;
  justify-content: space-between;
  align-items: center;
`;

const UploadText = styled.span`
  margin: 0 30px 0 146px;
  font-size: 20px;
  font-weight: bold;
  color: #7b758b;
`;

const StUploadBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  margin: 12px auto;
  width: 370px;
  background-color: #ffffff;
`;

const StFileButton = styled.div`
  margin: 0 auto;
  & > button {
    margin: 23px auto 0;
    width: 350px;
    height: 36px;
    font-size: 14px;
    border: 2px solid white;
    border-radius: 15px;
    background-color: #e6e5ea;
    color: black;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #666666;
    }
    & > label {
      display: inline-block;
      font-family: "Noto Sans KR", sans-serif;
      width: 320px;
    }
  }
`;

const StImageBox = styled.div`
  margin: 23px auto 23px;
  width: 350px;
  height: 452px;
  border-radius: 15px;
  .ImgDiv {
    display: flex;
    width: 100%;
    height: 452px;
    border-radius: 15px;
    justify-content: center;
    overflow: hidden;
    img.default {
      /* flex: 1 1 auto; */
    }
  }
`;

const StText = styled.p`
  display: inline-block;
  font-size: 20px;
  margin: 0 0 0 24px;
  width: 350px;
  overflow: hidden;
  white-space: normal;
  color: #7b758b;
  font-weight: bold;
`;

const StTitleInput = styled.div`
  margin: 11px auto 8px;
  width: 350px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const StContentInput = styled.div`
  width: 350px;
  margin: 11px auto 18px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > input {
    width: 300px;
    height: 90px;
    border: none;
    outline: none;
    margin-left: 20px;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const StNextBtnBox = styled.div`
  margin: 0 auto;
`;

const NextButton = styled.button`
  background: #a8a6af;
  border: 0px;
  width: 350px;
  height: 50px;
  border-radius: 15px;
  color: white;
  margin-bottom: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin-top: 20px;
  cursor: default;
  p {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
  }
`;
