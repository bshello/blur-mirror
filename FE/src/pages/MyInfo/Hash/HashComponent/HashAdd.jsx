import React from "react";
import CheckData from "./Checkdata";
import HashIntCheck from "./HashIntCheck";
import "../Hash.css";

function HashAdd(props) {
  console.log("HashAdd", props.checkData);

  return (
    <div>
      <div className="hashaddiv">
        {props.checkData &&
          props.checkData.map((item) => <CheckData item={item} />)}
      </div>
    </div>
  );
}

export default HashAdd;
