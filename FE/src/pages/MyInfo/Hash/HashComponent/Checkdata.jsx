import React from "react";

function Checkdata({ item, onRemove }) {
  return (
    <div className="hashcheckdiv">
      <div className="hashcheckbox" onClick={onRemove}>
        {item}
      </div>
    </div>

    // <div className="hashcheckdiv">{props.item}</div>
  );
}

export default Checkdata;
