import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import MyPageForm from "../components/mypageComponents/MyPageForm";

const Mypage = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <MyPageForm />
        </Grid>
      </Container>
      <NavigationBar props={props} />
    </Fragment>
  );
};

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
`;

export default Mypage;
