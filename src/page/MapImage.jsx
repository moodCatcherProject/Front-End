/*global kakao*/
import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../elem/Header";
import NavigationBar from "../elem/NavigationBar";
import { useNavigate } from "react-router-dom";
import "../shared/style/MapImageStyle.css";
import { getCookie, deleteCookie } from "../shared/cookie";
import { useDispatch, useSelector } from "react-redux";
import HeartButton from "../elem/MapButton";

import { __patchMap, __getUsersMap, __patchOnoff } from "../redux/async/kakao";

const MapImage = (props) => {
  let map;
  var arr = [];
  const dispatch = useDispatch();
  //카카오객체 불러오기
  const kakao = window.kakao;
  //맵 컨테이너 Ref로 받아오기
  const mapContainer = useRef(null);
  const [mapState, setMapState] = useState(true);

  const checkPatch = useSelector((state) => state.kakao.checkPatch);
  const checkUsersMap = useSelector((state) => state.kakao.checkUsersMap);
  const checkExist = useSelector((state) => state.kakao.checkExist);
  const aroundUser = useSelector((state) => state.kakao.aroundUser);
  const latitude = useSelector((state) => state.kakao.myLatitude);
  const longitude = useSelector((state) => state.kakao.myLongitude);
  const isExistsMap = useSelector((state) => state.kakao.isExistsMap);
  const [toggle, setToggle] = useState(false); //map Exists 상태

  //like_array에 userId있으면 true 없으면 false
  //   useEffect(() => {
  //     if(item.like_array.includes(userId)){
  //         setToggle(true);
  //     }else{
  //         setToggle(false);
  //     }
  // }, [item, userId]);

  console.log(isExistsMap);
  useEffect(() => {
    setMapState(true);
  }, [isExistsMap]);

  useEffect(() => {
    if (isExistsMap) setToggle(true);
    else setToggle(false);
  }, []);

  useEffect(() => {
    // 카카오 맵 실행

    if (kakao?.maps !== undefined) {
      setMapState(true);
    }
    placeView();
  }, [mapState]);

  useEffect(() => {
    dispatch(__getUsersMap());
  }, [checkPatch]);

  useEffect(() => {
    kakaoMap(latitude, longitude, aroundUser);
  }, [checkUsersMap]);

  const placeView = async () => {
    await findLocation();
  };

  //사용자의 현위치 허용/차단 여부 반영
  const findLocation = (place) => {
    // 현위치로 맵 위치 변경
    if (navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch(__patchMap({ latitude, longitude }));
      });
    } else {
      // 현위치를 못 불러올 때 default 위치 적용
      const latitude = 37.4995482;
      const longitude = 127.0291611;

      dispatch(__patchMap({ latitude, longitude }));
    }
  };

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  const kakaoMap = (latitude, longitude, dataArray) => {
    const mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    map = new kakao.maps.Map(mapContainer.current, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];
      var content =
        '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        `            ${data.nickname}` +
        `            <div class="close" onclick="closeOverlay(${i})" title="닫기"></div>` +
        "        </div>" +
        `        <div class="body" onclick="location.href='https://moodcatch.link/mypage/${data.userId}'">` +
        '            <div class="img">' +
        `                <img src="${data.imgUrl}" width="73" height="73" >` +
        "           </div>" +
        '            <div class="desc">' +
        `                <div class="ellipsis">${data.age}</div>` +
        `                <div class="ellipsis">${data.gender}</div>` +
        `                <div class="jibun ellipsis">point : ${data.moodPoint}</div>` +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
      // 지도에 마커를 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(data.latitude, data.longitude),
      });
      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
      arr.push(overlay);
      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, "click", function () {
        arr[i].setMap(map);
      });
      // 이동할 위도 경도 위치를 생성합니다
      var moveLatLon = new kakao.maps.LatLng(latitude, longitude);

      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
    }
  };

  window.closeOverlay = (idx) => {
    arr[idx].setMap(null);
  };

  const clickLike = () => {
    //좋아요 토글 함수

    // if (isExistsMap === false) {
    // if (window.confirm(`지도기능을 키시겠어요?`)) {
    dispatch(__patchOnoff());
    setToggle((togle) => !togle);
    window.location.reload();
    return;
    // }
    // } else {
    //   dispatch(__patchOnoff());
    //   setToggle((togle) => !togle);
    //   window.location.reload();
    // }
  };

  return (
    <Fragment>
      <Container>
        <Grid>
          <Header />
          <HeartButton
            _onClick={(e) => {
              clickLike();
              e.preventDefault();
              e.stopPropagation();
            }}
            is_like={toggle}
          />
          <div
            id="map"
            ref={mapContainer}
            style={{
              width: "428px",
              height: "calc(var(--vh, 1vh) * 100 + 50px)",
            }}
          ></div>
        </Grid>
      </Container>
      <NavigationBar props={props} />
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
  margin-top: 60px;
  margin-bottom: 57px;
  max-width: 428px;
  width: 100vw;
  //height: calc(var(--vh, 1vh) * 100 + 50px);
  background: linear-gradient(#a396c9, #ffffff);
  /* background: #a396c9; */
`;

const LoaderWrap = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  margin-left: -100px;
`;

export default React.memo(MapImage);
