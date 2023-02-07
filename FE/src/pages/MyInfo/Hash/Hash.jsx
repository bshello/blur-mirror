//카테고리 선택 창

import "./Hash.css";
// import "../Hash/HashInt/HashInt.css";
import React, { useState, useEffect } from "react";
import HashInt from "./HashComponent/HashInt";
// import HashIntCheck from "./HashComponent/HashIntCheck";
import HashAdd from "./HashComponent/HashAdd/HashAdd";

function Hash({ showHashModal, showAlertModal }) {
  //카테고리 창인데 이걸 프롭스해서 창의 관심사로 가야할 거 같은데?
  const categories = [
    {
      id: 1,
      name: "스포츠",
      subcategories: [
        { subCategoryId: 1, name: "축구" },
        { subCategoryId: 2, name: "농구" },
        { subCategoryId: 3, name: "아이스하키" },
        { subCategoryId: 4, name: "스쿼시" },
        { subCategoryId: 5, name: "아스날" },
        { subCategoryId: 6, name: "외데고르" },
        { subCategoryId: 7, name: "파티" },
        { subCategoryId: 8, name: "마르치넬리" },
        { subCategoryId: 9, name: "은케티아" },
        { subCategoryId: 10, name: "램즈데일" },
        { subCategoryId: 11, name: "살리바" },
        { subCategoryId: 12, name: "마갈량이스" },
        { subCategoryId: 13, name: "사카" },
        { subCategoryId: 14, name: "자카" },
        { subCategoryId: 15, name: "진첸코" },
        { subCategoryId: 16, name: "마르치넬리" },
      ],
    },
    { id: 2, name: "보드게임" },
    { id: 3, name: "여행" },
    { id: 4, name: "리액트" },
    { id: 5, name: "데이터" },
    { id: 6, name: "음식" },
    { id: 7, name: "IT제품" },
    { id: 8, name: "식물" },
    { id: 9, name: "건강" },
    { id: 10, name: "금융" },
    { id: 11, name: "제테크" },
    { id: 12, name: "크리에이터" },
    { id: 13, name: "동물" },
    { id: 14, name: "콘솔게임" },
    { id: 15, name: "연예" },
    { id: 16, name: "문화생활" },
  ];

  function Category({ category, todoList }) {
    return (
      <div className="intBack" onClick={showIntModal}>
        {category.name}
      </div>
    );
  }

  const [intModal, setIntModal] = useState(false);
  const showIntModal = () => {
    setIntModal((pre) => !pre);
  };

  //  추가 데이터 저장
  const [checkList, setCheckList] = useState([]);
  const addIte = () => {
    console.log("im hererere!");
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

  // TEST
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addItem = () => {
    setTodoList([...todoList, inputValue]);
  };

  //////////////////////////////////////////
  return (
    <div className="Hash">
      {intModal ? <HashInt showIntModal={setIntModal} /> : null}
      {searchBar ? <HashSerch showSearchBar={setSearchBar} /> : null}

      {/* <HashAdd todoList={todoList} />
      <input
        value={inputValue}
        type="text"
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={addItem}>추가</button> */}

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

      <div className="interestdiv">
        {categories.map((category, idx) => {
          return (
            <div className="interestbox">
              <Category key={category.id} category={category} />
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
