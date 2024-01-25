import React from "react";
const Detail = ({id, detailValue, detailLabel, detailTitle, isEditing, onUpdate}) => {

  return (
    <div className="field">
      <label className="label">{detailLabel}</label>
      <div className="control">
        {isEditing ? (
          <input
            className="input"
            type="text"
            value={detailValue}
            onChange={(e) => {
                const updatedDetail = {};
                updatedDetail[detailTitle] = e.target.value;
                onUpdate(id, updatedDetail);
              }}
          />
        ) : (
          <span>{detailValue}</span>
        )}
      </div>
    </div>
  );
};

export default Detail;
