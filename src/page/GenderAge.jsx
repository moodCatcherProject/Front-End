import React, { Fragment, Suspense } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import SignupGenderAge from "../components/signupComponents/SignupGenderAge";

export default function GenderAge(props) {
  return (
    <Fragment>
      <LoginWrap>
        <Container>
          <Header />
          <SignupGenderAge />
        </Container>
      </LoginWrap>
    </Fragment>
  );
}

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
`;

const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 428px;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100 + 50px);
  margin: 0 auto;
  margin-top: 0px;
  background: linear-gradient(#a396c9, #ffffff);
`;
