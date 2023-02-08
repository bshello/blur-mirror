// 카테고리 별 관심사

import "../Hash.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCheckboxData } from "../../../../redux/reducers/checkData";
import HashAdd from "../HashComponent/HashAdd/HashAdd";

function HashInt({ showIntModal }) {
  //나중에 프롭스해서 데이터 가져올 거임
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
    { id: 8, name: "박주승" },
    { id: 9, name: "은케티아" },
    { id: 10, name: "램즈데일" },
    { id: 11, name: "살리바" },
    { id: 12, name: "마갈량이스" },
    { id: 13, name: "사카" },
    { id: 14, name: "자카" },
    { id: 15, name: "진첸코" },
    { id: 16, name: "마르치넬리" },
  ]);

  //체크한 데이터 띄우기 test
  const [inputValue, setInputValue] = useState([]);
  const [todoList, setTodoList] = useState([]);
  // 체크 박스가 체크된 상태인지 파악하기 위한 useState를 생성
  // const [isClicked, setIsClicked] = useState(false);
  // const handleClick = () => {
  //   setIsClicked(!isClicked);
  // };

  // 개별요소 색상 변경하기 위한 코드
  const handleClick = (id) => {
    setIntData(
      intdata.map((item) =>
        item.id === id ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  // 체크 데이터 추가할 거
  const addItem = (checked, id) => {
    if (checked) {
      setTodoList([...todoList, id]);
    } else {
      // 체크 해제
      setTodoList(todoList.filter((el) => el !== id));
    }
  };

  //체크박스의 onChange 이벤트 핸들러에서 action creator 함수를 호출하여 디스패치합니다.
  // const dispatch = useDispatch();
  // const [text, setText] = useState([]);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(addCheckboxData(intdata.name));
  //   setText([]);
  // };

  return (
    <div className="hashintdiv">
      <HashAdd todoList={todoList} />
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
              <button
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
                  // onClick={addItem}
                  // onChange={(event) => setInputValue(event.target.value)}
                  onChange={(e) => {
                    addItem(e.currentTarget.checked, item.name);
                  }}
                  // onChange={(e) => setText(e.target.value)}
                  checked={todoList.includes(item.name) ? true : false}
                />

                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HashInt;
