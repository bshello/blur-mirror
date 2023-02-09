// 카테고리 별 관심사

import "../Hash.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HashAdd from "./HashAdd";
import axios from "axios";

function HashInt({}) {
  // function Category({ category, checkData }) {
  //   return (
  //     <div className="intBack" onClick={showIntModal}>
  //       {category.name}
  //     </div>
  //   );
  // }
  // const getCategories = () => {
  //   axios({
  //     method: "GET",
  //     url: `http://192.168.31.73:8000/blur-profile/profile/dddd/getAllInterests`,
  //     data: {},
  //   })
  //     .then((res) => {
  //       console.log(res.data.interests);
  //       console.log(res.status);
  //     })
  //     .catch((err) => {
  //       alert("카테고리 없다.");
  //       console.log(err);
  //     });
  // };

  //나중에 프롭스해서 데이터 가져올 거임
  const [intdata, setIntData] = useState([]);

  //useEffect 함수를 사용하여 데이터를 가져오는 방법
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://192.168.31.73:8000/blur-profile/profile/dddd/getAllInterests"
      );
      const getCategories = await response.json();
      setIntData(getCategories);
    }
    fetchData();
  }, []);

  //체크한 데이터 띄우기 test
  const [inputValue, setInputValue] = useState([]);
  const [checkData, setcheckData] = useState([]);

  // 개별요소 색상 변경하기 위한 코드
  const handleClick = (name) => {
    setIntData(
      intdata.map((item) =>
        item.name === name ? { ...item, clicked: !item.clicked } : item
      )
    );
  };

  // 체크 데이터 추가할 거
  const addItem = (checked, name) => {
    if (checked) {
      setcheckData([...checkData, name]);
    } else {
      // 체크 해제
      setcheckData(checkData.filter((el) => el !== name));
    }
  };

  return (
    <div className="hashintdiv">
      <HashAdd checkData={checkData} />
      {/* <button onClick={getCategories}>ddd</button> */}

      <div className="cainterestdiv">
        {intdata.map((item, idx) => {
          return (
            <div className="cainterestbox" key={item.name} data-idx={idx}>
              <button
                className={`btn ${
                  item.clicked ? "changecaintBack" : "caintBack"
                }`}
                onClick={() => {
                  handleClick(item.name);
                }}
              >
                <input
                  type="checkbox"
                  key={item.name}
                  data-idx={idx}
                  value={item.name}
                  onChange={(e) => {
                    addItem(e.currentTarget.checked, item.name);
                  }}
                  checked={checkData.includes(item.name) ? true : false}
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
