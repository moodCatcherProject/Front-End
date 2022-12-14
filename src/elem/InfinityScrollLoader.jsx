import React from "react";
import "../shared/style/scrollLoader.css";

//무한스크롤 로딩 컴포넌트
const InfinityScrollLoader = (props) => {
  return (
    <React.Fragment>
      <div id="fountainG">
        <div id="fountainG_1" className="fountainG"></div>
        <div id="fountainG_2" className="fountainG"></div>
        <div id="fountainG_3" className="fountainG"></div>
        <div id="fountainG_4" className="fountainG"></div>
        <div id="fountainG_5" className="fountainG"></div>
        <div id="fountainG_6" className="fountainG"></div>
        <div id="fountainG_7" className="fountainG"></div>
        <div id="fountainG_8" className="fountainG"></div>
      </div>
    </React.Fragment>
  );
};

export default InfinityScrollLoader;
// export default React.memo(InfinityScrollLoader);
