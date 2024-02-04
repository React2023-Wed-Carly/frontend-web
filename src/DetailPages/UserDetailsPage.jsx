import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css"; // Import the CSS file
import Detail from "../components/Detail";

const UserDetailsPage = () => {
  const users = useSelector((state) => state.userData);
	const jwtToken = useSelector((state) => state.jwttoken);
  const { userId } = useParams();
  const user = users.find((user) => user.id === parseInt(userId));
  console.log(userId);
  const [isEditing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // todo
    setEditing(false);
  };

  const handleDelete = () => {
    // todo
  };

  const parseFloat = (bigInt) => {
    if (bigInt < 100)
      return `${bigInt}.0`
    else
      return `${bigInt / 100}.${bigInt % 100}`
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="rows">
      <h2 className="title is-4">Details of user {user.id}</h2>
      <Detail
        detailLabel="Username"
        detailValue={user.username}
      ></Detail>
      <Detail
        detailLabel="Firstname"
        detailValue={user.firstname}
      ></Detail>
      <Detail
        detailLabel="Lastname"
        detailValue={user.lastName}
      ></Detail>
      <Detail
        detailLabel="Email"
        detailValue={user.email}
      ></Detail>
      <Detail
        detailLabel="Balance"
        detailValue={"$" + parseFloat(user.balance)}
      ></Detail>
      <Detail
        detailLabel="Distance Travelled"
        detailValue={parseFloat(user.DistanceTravelled) + " km"}
      ></Detail>
      {/*
      <div className="field is-grouped">
        {isEditing ? (
          <>
            <div className="control">
              <button className="button is-success" onClick={handleSave}>
                Save
              </button>
            </div>
            <div className="control">
              <button className="button is-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="control">
            <button className="button is-info" onClick={handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>*/}
    </div>
  );
};

export default UserDetailsPage;
