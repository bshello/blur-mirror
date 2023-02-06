//카테고리 선택 창

import "./Hash.css";
import "../Hash/HashInt/HashInt.css";
import React, { useState, useEffect } from "react";
import HashInt from "./HashInt/HashInt";
import HashIntCheck from "../Hash/HashIntCheck/HashIntCheck";

function Hash({ showHashModal, showAlertModal }) {
  //카테고리 창인데 이걸 프롭스해서 창의 관심사로 가야할 거 같은데?
  const catedata = [
    "스포츠",
    "보드게임",
    "여행",
    "문화생활",
    "연예",
    "콘솔게임",
    "동물",
    "크리에이터",
    "제테크",
    "금융",
    "건강",
    "식물",
    "메타버스",
    "게임",
    "it 제품",
    "음식",
  ];

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

  useEffect(() => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(results);
  }, [searchTerm]);

  //search 바
  function HashSerch() {
    return (
      <div>
        <ui className="hashSerchbar">
          {results.map((item) => (
            <div className="ilserchbar" key={item.name}>
              {item.name}
            </div>
          ))}
        </ui>
      </div>
    );
  }
  //////////////////////////////////////////
  return (
    <div className="Hash">
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
        {/* <ui className="hashSerchbar">
          {results.map((item) => (
            <div className="ilserchbar" key={item.name}>
              {item.name}
            </div>
          ))}
        </ui> */}

        <div className="hashVec" />
      </div>
      <div className="hashaddiv">
        <HashIntCheck />
      </div>

      <div className="interestdiv">
        {catedata.map((item, idx) => {
          return (
            <div className="interestbox" onClick={showIntModal} key={item}>
              <div className="intBack">{catedata[idx]}</div>
            </div>
          );
        })}
      </div>

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
