import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Loader from "../shared/Loader";
import Header from "../elem/Header";
import EditPasswordForm from "../components/signupComponents/EditPasswordForm";

const Edit_password = () => {
  return (
    <Fragment>
      <Suspense
        fallback={
          <LoaderWrap>
            <Loader />
          </LoaderWrap>
        }
      >
        <Container>
          <Grid>
            <LoginWrap>
              <Header />
              <EditPasswordForm />
            </LoginWrap>
          </Grid>
        </Container>
      </Suspense>
    </Fragment>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const Container = styled.div`
  display: flex;
  height: 984px;
  flex-direction: column;
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
  max-width: 428px;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100 + 50px);

  margin: 0 auto;
  background-color: royalblue;
  margin-top: 60px;
  margin-bottom: 500px;
`;

const LoginWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: linear-gradient(#a396c9, #ffffff);
`;

export default Edit_password;