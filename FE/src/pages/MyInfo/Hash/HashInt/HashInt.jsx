// 카테고리 별 관심사

import "./HashInt.css";
import React, { useState } from "react";
import styled from "styled-components";
import Hash from "../Hash";
import { useSelector, useDispatch } from "react-redux";
import { addCheckboxData } from "../../../../redux/reducers/checkData";

function HashInt({ showIntModal }) {
  const [intdata, setIntData] = useState([
    // { id: 1, name: "축구", clicked: false },
    // { id: 2, name: "농구", clicked: false },
    // { id: 3, name: "아이스하키", clicked: false },
    // { id: 4, name: "스쿼시", clicked: false },
    // { id: 5, name: "아스날", clicked: false },
    // { id: 6, name: "외데고르", clicked: false },
    // { id: 7, name: "파티", clicked: false },
    // { id: 8, name: "마르치넬리", clicked: false },
    // { id: 9, name: "은케티아", clicked: false },
    // { id: 10, name: "램즈데일", clicked: false },
    // { id: 11, name: "살리바", clicked: false },
    // { id: 12, name: "마갈량이스", clicked: false },
    // { id: 13, name: "사카", clicked: false },
    // { id: 14, name: "자카", clicked: false },
    // { id: 15, name: "진첸코", clicked: false },
    // { id: 16, name: "마르치넬리", clicked: false },
    { id: 1, name: "축구" },
    { id: 2, name: "농구" },
    { id: 3, name: "아이스하키" },
    { id: 4, name: "스쿼시" },
    { id: 5, name: "아스날" },
    { id: 6, name: "외데고르" },
    { id: 7, name: "파티" },
    { id: 8, name: "마르치넬리" },
    { id: 9, name: "은케티아" },
    { id: 10, name: "램즈데일" },
    { id: 11, name: "살리바" },
    { id: 12, name: "마갈량이스" },
    { id: 13, name: "사카" },
    { id: 14, name: "자카" },
    { id: 15, name: "진첸코" },
    { id: 16, name: "마르치넬리" },
  ]);

  // for (let i = 0; i < intdata.length; i++) {
  //   console.log(intdata[i].clicked);
  // }
  // console.log(intdata);

  const handleClick = (id) => {
    setIntData(
      intdata.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  // 체크한 데이터 가져오기

  // const value = intdata.name;

  // const dispatch = useDispatch();
  // const checkedData = useSelector((state) => state.checkedData);

  const dispatch = useDispatch();
  const handleChange = (item) => {
    dispatch(addCheckboxData(item));
  };

  return (
    <div className="hashintdiv">
      <button
        className="category"
        onClick={() => {
          showIntModal();
        }}
      >
        스포츠
      </button>
      <div className="cainterestdiv">
        {intdata.map((item, idx) => {
          return (
            <div className="cainterestbox" key={item.id} data-idx={idx}>
              {/* <input
                type="checkbox"
                key={item.id}
                data-idx={idx}
                value={item.name}
                onChange={() => handleChange("item1")}
              /> */}
              <div
                className={`btn ${
                  item.clicked ? "changecaintBack" : "caintBack"
                }`}
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                <input
                  type="checkbox"
                  key={item.id}
                  data-idx={idx}
                  value={item.name}
                  onChange={() => handleChange("item1")}
                />
                {item.name}
                {/* <input
                type="checkbox"
                checked={bChecked}
                key={item.id}
                data-idx={idx}
                onChange={(e) => checkHandler(e)}
              /> */}
                {/* <div>
                  {CheckData.map((data, index) => (
                    <div key={index}>{data}</div>
                  ))}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HashInt;
