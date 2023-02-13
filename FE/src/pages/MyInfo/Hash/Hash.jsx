import "./Hash.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Checkdata from "../Hash/HashComponent/Checkdata";
import saveToken from "../../../redux/reducers/saveToken";
import { useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";

function Hash({ showHashModal, showAlertModal }) {
  // const API_URL = "blur-profile/profile/dddd";

  // const getCategories = () => {
  //   axios({
  //     method: "GET",
  //     url: `http://192.168.31.73:8000/blur-profile/profile/dddd/getAllInterests`,
  //     data: {},
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log(res.status);
  //     })
  //     .catch((err) => {
  //       alert("카테고리 없다.");
  //       console.log(err);
  //     });
  // };

  // useEffect 함수를 사용하여 데이터를 가져오는 방법
  // const id = useSelector((state) => {
  //   return state.strr.id;
  // });
  const id = "123123";

  const [intdata, setIntData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://192.168.31.73:8000/blur-profile/profile/${id}/getInterest`,
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

  // 관심사 업데이트
  const token = useSelector((state) => {
    return state.strr.token;
  });

  // console.log(typeof checkData);
  // console.log(checkData[0]);

  const API_URL = `http://192.168.31.73:8000/blur-profile/profile`;
  console.log(`${API_URL}/${id}/updateInterest`);

  const intSave = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${API_URL}/${id}/updateInterest`,
      data: {
        interests: [checkData],
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);

        console.log("성공><");
      })
      .catch((err) => {
        alert("기존 데이터 없다.");
        console.log(err);
      });
  };

  const [checkData, setcheckData] = useState([]); //체크한 데이터 띄우기
  const [limit] = useState(5);
  // 검색기능
  const [searchBar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = intdata.filter((item) =>
    item.interestName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRemove = (item) => {
    setcheckData((prev) => prev.filter((intdata) => intdata !== item));
  };

  const handleClick = (interestName) => {
    if (checkData.length >= limit) {
      alert(
        `최대 ${limit}개만 선택 가능합니다. 취소하려면 위에 선택된 관심사를 클릭해 제거해주세요`
      );
      return;
    }
    const found = checkData.find((data) => data === interestName);
    if (found) {
      handleRemove(interestName);
    } else {
      setcheckData((prev) => [...prev, interestName]);
    }
  };

  // console.log(checkData);

  const HashSerch = ({ results, handleClick }) => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClick();
      }
    };

    const ref = useRef();

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });

    return <div ref={ref}></div>;
  };

  return (
    <div className="Hash">
      {searchBar ? <HashSerch showSearchBar={setSearchBar} /> : null}

      <div>
        <div className="hashSerchDiv">
          <div className="inputdodbogi" />
          <input
            className="hashinput"
            type="text"
            placeholder="Search interests"
            value={searchQuery}
            onChange={handleSearch}
            style={{ outline: "none" }}
          />
          {searchQuery !== "" && (
            <HashSerch handleClick={() => setSearchQuery("")} />
          )}
          <div className="hashVec" />
        </div>
        <div className="hashintdiv">
          <div className="searchintbox">
            <div className="searchdiv">
              {searchQuery.length > 0 &&
                filteredData.map((item, idx) => {
                  const selected = checkData.includes(item);
                  return (
                    <div className="searchbox" key={item} data-idx={idx}>
                      <button
                        className={`btn ${
                          selected ? "changesearchback" : "searchback"
                        }`}
                      >
                        <input
                          className="custom-checkbox-style"
                          type="checkbox"
                          key={item}
                          data-idx={idx}
                          value={item}
                          checked={selected}
                          onChange={(e) => {
                            handleClick(item);
                          }}
                        />
                        {item.interestName}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div className="hashaddiv">
              {checkData &&
                checkData.map((item, idx) => (
                  <Checkdata item={item} onRemove={() => handleRemove(item)} />
                ))}
            </div>
          </div>
          <div className="cainterestdiv">
            {intdata.map((item, idx) => {
              const selected = checkData.includes(item.interestName);
              return (
                <div
                  className="cainterestbox"
                  key={item.interestName}
                  data-idx={idx}
                >
                  <button
                    className={`btn ${
                      selected ? "changecaintBack" : "caintBack"
                    }`}
                  >
                    <input
                      className="custom-checkbox-style"
                      type="checkbox"
                      key={item}
                      data-idx={idx}
                      value={item}
                      checked={selected}
                      onChange={(e) => {
                        handleClick(item);
                      }}
                    />
                    {item.interestName}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        className="hashEdit"
        onClick={() => {
          showHashModal();
          showAlertModal();
          intSave();
        }}
      >
        선호 정보 수정
      </button>
    </div>
  );
}

export default Hash;
