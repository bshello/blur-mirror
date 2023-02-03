import React, { useState, useReducer } from "react";

const reducer = (state, action) => {
  console.log("reducer", state, action);
};

function Setrange() {
  const [nickName, setNickName] = useState("");

  const [name, dispatch] = useReducer(useReducer, reducer, "");

  return (
    <div>
      <h2> 제발 </h2>
      <p> 이름 : {name} </p>
      <input
        type="text"
        className="PMIdInput"
        value={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <button onClick={() => dispatch()}>변경</button>
    </div>
  );
}

export default Setrange;
