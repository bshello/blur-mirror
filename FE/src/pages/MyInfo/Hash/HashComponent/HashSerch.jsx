import React, { useState, useEffect } from "react";
import "../Hash.css";

function HashSerch() {
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

  useEffect(() => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(results);
  }, [searchTerm]);

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

export default HashSerch;
