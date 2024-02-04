import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css"; // Import the CSS file
import Detail from "../components/Detail";

const UserDetailsPage = ({ onUpdateUser, onDeleteUser }) => {
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

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="rows">
      <h2 className="title is-4">Details of user {user.id}</h2>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Username"
        detailTitle="username"
        detailValue={user.username}
        onUpdate={onUpdateUser}
      ></Detail>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Firstname"
        detailTitle="firstName"
        detailValue={user.firstname}
        onUpdate={onUpdateUser}
      ></Detail>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Lastname"
        detailTitle="lastName"
        detailValue={user.lastName}
        onUpdate={onUpdateUser}
      ></Detail>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Email"
        detailTitle="email"
        detailValue={user.email}
        onUpdate={onUpdateUser}
      ></Detail>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Balance"
        detailTitle="balance"
        detailValue={`$${user.balance / 100}.${user.balance % 100}`}
        onUpdate={onUpdateUser}
      ></Detail>
      <Detail
        isEditing={isEditing}
        id={user.id}
        detailLabel="Distance Travelled"
        detailTitle="distance"
        detailValue={`${user.DistanceTravelled / 100}.${user.DistanceTravelled % 100} km`}
        onUpdate={onUpdateUser}
      ></Detail>

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
      </div>
    </div>
  );
};

export default UserDetailsPage;
