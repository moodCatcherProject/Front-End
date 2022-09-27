import React, { Fragment } from "react";
import styled from "styled-components";
import StartForm from "../components/startComponents/StartForm";

const Start = (props) => {
  return (
    <Fragment>
      <Container>
        <Grid>
          <StartForm />
        </Grid>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 926px; */
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
  /* margin-top: 60px; */
  /* margin-bottom: 57px; */
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  //background: linear-gradient(#a396c9, #ffffff);
`;

export default Start;