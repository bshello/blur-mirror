// 관심사 체크하면 모이는 거
import { useSelector } from "react-redux";
import "../Hash.css";
import React, { useState, useEffect } from "react";

function HashIntCheck(props) {
  const [hashIntCheck, setHashIntCheck] = [];
  return (
    <div className="hashcheckdiv">
      {hashIntCheck.map((item, idx) => {
        return <div className="hashcheckbox">{hashIntCheck[idx]}</div>;
      })}
    </div>
  );
}

export default HashIntCheck;
