import React from "react";
import TodoItem from "../TodoItem";
import HashIntCheck from "../HashIntCheck";
import "../../Hash.css";

function HashAdd(props) {
  console.log("HashAdd", props.todoList);

  return (
    <div>
      <div className="hashaddiv">
        {props.todoList &&
          props.todoList.map((item) => <TodoItem item={item} />)}
      </div>
    </div>
  );
}

export default HashAdd;
