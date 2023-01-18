import "./test.css";

function Test() {
  return (
    <div className="header">
      1
      <div className="header_parent">
        2
        <div className="header_child1">
          3<div className="header_child2">4</div>
        </div>
      </div>
    </div>
  );
}

export default Test;
