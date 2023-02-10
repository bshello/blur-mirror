//카테고리 선택 창

import "./Hash.css";
import React, { useState, useEffect } from "react";
import HashInt from "./HashComponent/HashInt";
// import HashAdd from "./HashComponent/HashAdd/HashAdd";
import axios from "axios";

function Hash({ showHashModal, showAlertModal }) {
  // const API_URL = "blur-profile/profile/dddd";

  const getCategories = () => {
    axios({
      method: "GET",
      url: `http://192.168.31.73:8000/blur-profile/profile/dddd/getAllInterests`,
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
      })
      .catch((err) => {
        alert("카테고리 없다.");
        console.log(err);
      });
  };

  // 카테고리 이름
  function Category({ category, checkData }) {
    return (
      <div className="intBack" onClick={showIntModal}>
        {category.name}
      </div>
    );
  }

  // 관심사 모달 띄우는 거
  const [intModal, setIntModal] = useState(false);
  const showIntModal = () => {
    setIntModal((pre) => !pre);
  };
  // //검색기능
  const [data, setData] = useState([
    { id: 1, name: "축구", clicked: false },
    { id: 2, name: "농구", clicked: false },
    { id: 3, name: "아이스하키", clicked: false },
    { id: 4, name: "스쿼시", clicked: false },
    { id: 5, name: "아스날", clicked: false },
    { id: 6, name: "외데고르", clicked: false },
    { id: 7, name: "파티", clicked: false },
    { id: 8, name: "마르치넬리", clicked: false },
    { id: 9, name: "은케티아", clicked: false },
    { id: 10, name: "램즈데일", clicked: false },
    { id: 11, name: "살리바", clicked: false },
    { id: 12, name: "마갈량이스", clicked: false },
    { id: 13, name: "사카", clicked: false },
    { id: 14, name: "자카", clicked: false },
    { id: 15, name: "진첸코", clicked: false },
    { id: 16, name: "이단아", clicked: false },
    { id: 17, name: "빡대가리", clicked: false },
    { id: 18, name: "라서", clicked: false },
    { id: 19, name: "힘이", clicked: false },
    { id: 20, name: "든다", clicked: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  //  그냥 서치바 초기에 안보이게 설정해야됨
  const [searchBar, setSearchBar] = useState(false);
  const showSearchBar = () => {
    setSearchBar((pre) => !pre);
  };

  //search 바
  function HashSerch() {
    return (
      <div>
        <div className="hashSerchbar">
          {results.map((item) => (
            <div className="ilserchbar" key={item.name}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TEST 데이터 띄우기
  const [inputValue, setInputValue] = useState("");
  const [checkData, setcheckData] = useState([]);

  const addItem = () => {
    setcheckData([...checkData, inputValue]);
  };

  //////////////////////////////////////////
  return (
    <div className="Hash">
      {/* <HashInt getCategories={getCategories} /> */}
      {/* <button onClick={getCategories}>ddd</button> */}
      {intModal ? <HashInt showIntModal={setIntModal} /> : null}
      {searchBar ? <HashSerch showSearchBar={setSearchBar} /> : null}

      <div className="hashSerchDiv">
        <div className="inputdodbogi" />
        <input
          className="hashinput"
          type="text"
          value={searchTerm}
          placeholder="관심사를 찾아보세요."
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={showSearchBar}
        />

        <div className="hashVec" />
      </div>

      <HashInt />

      <button
        className="hashEdit"
        onClick={() => {
          showHashModal();
          showAlertModal();
        }}
      >
        선호 정보 수정
      </button>
    </div>
  );
}

export default Hash;
