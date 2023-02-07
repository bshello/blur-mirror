import React from "react";

function TodoItem(props) {
  const [hashIntCheck, setHashIntCheck] = [];
  return (
    <div className="hashcheckdiv">
      <div className="hashcheckbox">{props.item}</div>
    </div>

    // <div className="hashcheckdiv">{props.item}</div>
  );
}

export default TodoItem;
