import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __addRecomment } from "../../redux/async/comment";
import DetailReCommentList from "./DetailReCommentList";

const send = "/images/Send.png";

const DetailRecomments = ({ commentData, btnState, postId }) => {
  const userStatus = useSelector((state) => state.signup.userStatus);

  const dispatch = useDispatch();
  const recommentText = useRef("");
  const commentList = useSelector((state) => state.comment.comments);

  const preview_URL =
    "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png";

  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL:
      "https://cdn.discordapp.com/attachments/1014169130045292625/1014194232250077264/Artboard_1.png",
  });

  useEffect(() => {
    if (commentData.imgUrl !== undefined) {
      setProfile({ image_file: `${commentData.imgUrl}` });
    }
  }, []);

  // 대댓글 작성하기
  const addRecomment = () => {
    dispatch(
      __addRecomment({
        comment: recommentText.current.value,
        commentId: commentData.commentId,
      }) // , postId: postId
    );
    recommentText.current.value = "";
  };
  return (
    <BackgroundDiv>
      <Wrapdiv>
        <h3>댓글</h3>
        <CommentDataBox>
          <CommentImg
            // url={
            //   userStatus.imgUrl === undefined ||
            //   userStatus.imgUrl.slice(-4) === "null"
            //     ? preview_URL
            //     : userStatus?.imgUrl
            // }
            style={{
              backgroundImage: `url(${
                commentData.imgUrl === undefined ||
                commentData.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : commentData?.imgUrl
              })`,
            }}
          >
            <img
              src={`${
                commentData.imgUrl === undefined ||
                commentData.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : commentData?.imgUrl
              }`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </CommentImg>
          <WrapCommentData>
            <textarea value={commentData.content}></textarea>
          </WrapCommentData>
        </CommentDataBox>
        <CommentBox>
          <CommentImg
            // url={
            //   userStatus.imgUrl === undefined ||
            //   userStatus.imgUrl.slice(-4) === "null"
            //     ? preview_URL
            //     : userStatus?.imgUrl
            // }
            style={{
              backgroundImage: `url(${
                userStatus.imgUrl === undefined ||
                userStatus.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : userStatus?.imgUrl
              })`,
            }}
          >
            <img
              src={`${
                userStatus.imgUrl === undefined ||
                userStatus.imgUrl.slice(-4) === "null"
                  ? preview_URL
                  : userStatus?.imgUrl
              }`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </CommentImg>
          <WrapComment>
            <textarea
              placeholder="댓글을 작성해주세요."
              ref={recommentText}
              maxLength={50}
            />
          </WrapComment>
          <AddCommentButton
            onClick={addRecomment}
            style={{ backgroundImage: `url(${send})` }}
          >
            <img
              src={`${send}`}
              alt=""
              width="0"
              height="0"
              style={{ display: "none !important" }}
            />
          </AddCommentButton>
        </CommentBox>
        {/* <Line /> */}
        <ReCommentListBox>
          {commentData.recommentId?.map((item, idx) => (
            <DetailReCommentList key={idx} item={item} postId={postId} />
          ))}
        </ReCommentListBox>

        <WrapBtn>
          {/* <button onClick={changeComment}>수정하기</button> */}
          <button
            onClick={() => {
              btnState(false);
            }}
          >
            닫기
          </button>
        </WrapBtn>
      </Wrapdiv>
    </BackgroundDiv>
  );
};

export default DetailRecomments;

const BackgroundDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;
`;

const Wrapdiv = styled.div`
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 330px;
  height: 500px;
  padding: 20px 15px;
  background-color: #eeeeee;
  opacity: 1;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 2px;
`;

const WrapTextarea = styled.div`
  width: 100%;
  border-radius: 20px;
`;
const CommentChangeTextBox = styled.textarea`
  border: none;
  resize: none;
  width: 90%;
  height: 130px;
  margin: 10px;
  outline: none;
  overflow-y: auto;
  font-size: 16px;
  border-radius: 10px;
`;
const WrapBtn = styled.div`
  display: flex;
  width: 330px;
  gap: 20px;
  & > button {
    /* margin-top: 5px; */
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    width: 80px;
    margin: 0 auto;
    height: 30px;
    background-color: #7b758b;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 4px #877f92;
  }
`;

const CommentBox = styled.div`
  display: flex;
  border-top: 2px solid #a396c9;
  border-bottom: 2px solid #a396c9;
`;

const CommentDataBox = styled.div`
  display: flex;
  /* background-color: orange; */
`;

const CommentImg = styled.div`
  margin: 10px 6px 8px 0px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  /* background-image: url(${(props) => props.url}); */
  box-shadow: 5px 5px 4px #877f92;
`;

const WrapCommentData = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: 0 20px; */
  /* margin-top: 7px; */
  /* background-color: orange; */
  /* border: 1px solid black; */
  border-radius: 10px;
  textarea {
    margin-top: 20px;
    width: 240px;
    resize: none;
    height: 70px;
    background-color: royalblue;
    /* padding-top: 7px; */
    /* margin-top: 20px; */
    margin-left: 3px;
    border: none;
    outline: none;
    overflow: hidden;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
    /* border: 1px solid black; */
    border-radius: 5px;
    background-color: transparent;
  }
`;

// const WrapComment = styled.div`
//   display: flex;
//   justify-content: space-between;
//   /* padding: 0 20px; */
//   margin-top: 7px;
//   /* background-color: orange; */
//   /* border: 1px solid black; */
//   border-radius: 10px;
// `;

// const Textarea = styled.textarea`
//   width: 190px;
//   height: 25px;
//   padding-top: 7px;
//   margin-left: 3px;
//   outline: none;
//   font-size: 16px;
//   font-family: "Noto Sans KR", sans-serif;
//   border: 1px solid var(--grey);
//   border-radius: 10px;
//   background-color: transparent;
//   ::placeholder {
//   }
//   resize: none;
//   :focus {
//     border: 2px solid var(--greyD);
//   }
// `;

const WrapComment = styled.div`
  width: 254px;
  margin: 10px 5px 10px;
  background: #e6e5ea;
  border-radius: 15px;
  outline: none;
  & > textarea {
    width: 225px;
    height: 45px;
    border: none;
    outline: none;
    resize: none;
    box-sizing: border-box;
    padding: 6px 0 0 0;
    margin-left: 10px;
    font-family: "Noto Sans KR", sans-serif;
    background: #e6e5ea;
    font-size: 20px;
  }
`;

const AddCommentButton = styled.div`
  margin-top: 17px;
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url(${send}); */
  /* background-color: #7b758b; */
  border-radius: 10px;
  border: none;
  /* box-shadow: 5px 5px 4px #877f92; */
`;

// const Line = styled.div`
//   margin: 0px auto 16px;
//   width: 370px;
//   border-bottom: 2px solid white;
// `;

const ReCommentListBox = styled.div`
  overflow-y: scroll;
  height: 300px;
  margin-bottom: 10px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
