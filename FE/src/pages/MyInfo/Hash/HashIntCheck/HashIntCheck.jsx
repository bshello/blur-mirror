// 관심사 체크하면 모이는 거
import { useSelector } from "react-redux";
import "./HashIntCheck.css";
import React, { useState, useEffect } from "react";

function HashIntCheck() {
  //   // const checkData = useSelector((state) => {
  //   //   return state.checkData.value;
  //   // });

  //   function DisplayCheckboxData() {
  //     const checkboxData = useSelector(
  //       (state) => state.checkboxData.checkboxData
  //     );

  //     return (
  //       <div>
  //         {checkboxData.map((item) => (
  //           <div key={item.id}>{item.name}</div>
  //         ))}
  //       </div>
  //     );
  //   }

  //체크한 데이터가 여기로 오면된다. 저기 배열에 담겨야됨
  const hashintcheck = [];
  return (
    <div className="hashcheckdiv">
      {hashintcheck.map((item, idx) => {
        return <div className="hashcheckbox">{hashintcheck[idx]}</div>;
      })}
    </div>
  );
}

export default HashIntCheck;
