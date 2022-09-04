import React, { Fragment, Suspense, useRef, useState } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../shared/style/myBeer.css";
import EachMusinsa from "../components/uploadCompnents/EachMusinsa";

import { __getMusinsa, __writePost } from "../redux/modules/uploadSlice";

const Search = "./images/search.png";

const Upload = (props) => {
  const dispatch = useDispatch();
  const [searchTogle, setSearchTogle] = useState(false);
  const [search, setSearch] = useState("");
  const [attachment, setAttachment] = useState("");

  const post = useSelector((state) => state.upload.post);
  const formdata = useSelector((state) => state.upload.formdata);

  // console.log(post);
  // for (let key of post.keys()) {
  //   console.log(key);
  // }
  // for (let value of post.values()) {
  //   console.log(value);
  // }
  const postImg = formdata.get("imgFile");
  // console.log(postImg);

  React.useEffect(() => {
    if (searchTogle === false) {
      const reader = new FileReader();
      const theFile = postImg;
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishiedEvent) => {
        const {
          currentTarget: { result },
        } = finishiedEvent;
        setAttachment(result);
      };
    } else {
      setAttachment("");
    }
  }, [searchTogle]);

  React.useEffect(() => {
    const reader = new FileReader();
    const theFile = postImg;
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  }, []);

  const navigate = useNavigate();

  const settings = {
    infinite: false,
    speed: 200, //옆으로넘어가는 속도
    slidesToShow: 1, //한번에 보여주는 목록 개수(div가 더 좁으면 반영이 잘안됨)
    slidesToScroll: 5, //한번에 넘기는 목록의 개수
    variableWidth: true, //div커스텀하기위한 설정
    initialSlide: 0,
  };

  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Header />
        <Container>
          <Grid>
            <JustifyAlign>
              <UploadText>내 아이템</UploadText>
              <NextButton
                onClick={() => {
                  dispatch(__writePost(formdata));
                  navigate("/");
                }}
              >
                완료
              </NextButton>
            </JustifyAlign>
            <StUploadBox>
              <StImageBox className={searchTogle}>
                <div className="ImgDiv">
                  <img
                    src={attachment}
                    alt=""
                    className={searchTogle.toString()}
                  />
                </div>
              </StImageBox>
              <SliderContainer>
                <StyledSlider {...settings}>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                  <Test>aa</Test>
                  <StMusinsaItemBox className={searchTogle}>
                    asdasdasdasd
                  </StMusinsaItemBox>
                </StyledSlider>
              </SliderContainer>
              <StSearchInput>
                <input
                  type="text"
                  onClick={() => {
                    setSearchTogle((togle) => !togle);
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      // console.log(search);
                      dispatch(__getMusinsa("나이키 신발"));
                      setSearch("");
                    }
                  }}
                ></input>
                <ButtonWrap>
                  <ImageWrap
                    style={{ backgroundImage: `url(${Search})` }}
                    onClick={(e) => {
                      if (search === "") {
                        window.alert("검색 키워드를 입력해주세요!");
                        setSearch("");
                      } else {
                        e.preventDefault();
                        dispatch(__getMusinsa(search));
                        setSearch("");
                      }
                    }}
                  />
                </ButtonWrap>
              </StSearchInput>
              {/* <List>
                {searchTogle?.map((item, idx) => (
                  <EachMusinsa page={"beerList"} key={idx} item={item} />
                ))}
              </List> */}
            </StUploadBox>
          </Grid>
        </Container>
        <NavigationBar props={props} />
      </Suspense>
    </Fragment>
  );
};

export default Upload;

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px;
  background-color: orange; */
  bottom: 110px;
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
  margin-top: 40px;
  margin-bottom: 57px;
  width: 428px;
  background: linear-gradient(#a396c9, #c8c6d0);
  /* background-color: royalblue; */
`;

const JustifyAlign = styled.div`
  display: flex;
  margin: 56px auto 0;
  width: 366px;
  justify-content: space-between;
  align-items: center;
  /* background-color: yellowgreen; */
`;

const UploadText = styled.span`
  margin: 0 73px 0 144px;
  font-size: 20px;
  font-weight: bold;
  color: #7b758b;
`;

const NextButton = styled.button`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  width: 70px;
  height: 30px;
  background-color: #7b758b;
  border-radius: 10px;
  border: none;
  box-shadow: 5px 5px 4px #877f92;
`;

const StUploadBox = styled.div`
  display: flex;
  margin: 12px auto;
  flex-direction: column;
  width: 390px;
  min-height: 700px;
  border: 3px solid #c4c2ca;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 5px 5px 4px #877f92;
`;

const StImageBox = styled.div`
  margin: 23px 20px 9px;
  width: 350px;
  height: 300px;
  border-radius: 15px;
  &.true {
    height: 0;
  }
  .ImgDiv {
    width: 100%;
    height: 300px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    img {
      flex: 1 1 auto;
    }
    img.true {
      display: none;
    }
  }
  transition: display 0.5s, height 0.5s;
`;

const SliderContainer = styled.div`
  margin: 0 6px;
  width: 350px;
  overflow: hidden;
  margin-left: 20px;
  &.true {
    display: none;
    margin: 0;
  }
  transition: 0.5s;
`;

const StyledSlider = styled(Slider)`
  color: #e6e5ea;
  font-size: 14px;
`;

const StMusinsaItemBox = styled.div`
  /* width: 150px; */
  height: 100px;
  background-color: #e6e5ea;
  border-radius: 15px;

  color: transparent;
  font-size: 20px;
  outline: none;
  padding: 0;
  text-align: center;
  cursor: pointer;
  &.true {
    height: 0;
  }
  transition: 0.5s;
`;
const Test = styled.div`
  color: transparent;
`;

const StSearchInput = styled.div`
  margin: 10px 20px;
  width: 350px;
  background: #e6e5ea;
  border-radius: 18px;
  outline: none;
  & > input {
    margin-left: 20px;
    margin-top: 3px;
    width: 250px;
    height: 47px;
    border: none;
    outline: none;
    background: #e6e5ea;
    outline: none;
    font-size: 30px;
  }
`;

const ButtonWrap = styled.div`
  display: block;
  float: right;
`;

const ImageWrap = styled.div`
  margin: 6px;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  background-size: cover;
  cursor: pointer;
`;

// const List = styled.div`
//   width: 312px;
//   margin: 0 auto;
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
// `;
