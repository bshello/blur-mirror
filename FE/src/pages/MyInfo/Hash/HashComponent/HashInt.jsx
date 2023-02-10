// 카테고리 별 관심사

import "../Hash.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Checkdata from "./Checkdata";

function HashInt({}) {
  // useEffect 함수를 사용하여 데이터를 가져오는 방법
  const [intdata, setIntData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://192.168.31.73:8000/blur-profile/profile/dddd/getAllInterests`,
      data: {},
    })
      .then((res) => {
        console.log(res.data.interests);
        console.log(res.status);
        setIntData(res.data.interests);
      })
      .catch((err) => {
        alert("카테고리 없다.");
        console.log(err);
      });
  }, []);

  //체크한 데이터 띄우기 test
  const [checkData, setcheckData] = useState([]);

  // 체크 상태 관리
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.value]: event.target.checked,
    });
  };

  const filteredData = intdata.filter((item) => checkedItems[item.value]);

  // 개별요소 색상 변경하기 위한 코드
  const handleClick = (interestName) => {
    if (intdata.filter((item) => item.clicked).length >= 7) return;
    setIntData(
      intdata.map((item) =>
        item.interestName === interestName
          ? { ...item, clicked: !item.clicked }
          : item
      )
    );
  };

  const [limit, setLimit] = useState(5);
  const addItem = (checked, interestName) => {
    if (checked) {
      if (checkData.length >= limit) {
        alert(`최대 ${limit}개만 선택 가능합니다.`);
        return;
      }
      setcheckData([...checkData, interestName]);
    } else {
      setcheckData(checkData.filter((el) => el !== interestName));
    }
  };

  return (
    <div className="hashintdiv">
      <div>
        <div className="hashaddiv">
          {checkData && checkData.map((item) => <Checkdata item={item} />)}
        </div>
      </div>
      {filteredData.map((item) => (
        <div key={item.value}>{item.interestName}</div>
      ))}

      <div className="cainterestdiv">
        {intdata.map((item, idx) => {
          return (
            <div
              className="cainterestbox"
              key={item.interestName}
              data-idx={idx}
            >
              <button
                className={`btn ${
                  item.clicked ? "changecaintBack" : "caintBack"
                }`}
                onClick={() => {
                  handleClick(item.interestName);
                }}
              >
                <input
                  className="custom-checkbox-style"
                  type="checkbox"
                  key={item.interestName}
                  data-idx={idx}
                  value={item.interestName}
                  onChange={(e) => {
                    addItem(e.currentTarget.checked, item.interestName);
                  }}
                />

                {item.interestName}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HashInt;
