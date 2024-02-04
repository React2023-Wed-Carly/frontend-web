import React from "react";
const Detail = ({detailValue, detailLabel}) => {

  return (
    <div className="field">
      <label className="label">{detailLabel}</label>
      <div className="control">
          <span>{detailValue}</span>
      </div>
    </div>
  );
};

export default Detail;
