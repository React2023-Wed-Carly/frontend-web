import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css"; // Import the CSS file
import Detail from "../components/Detail";
import {bigintToFloat} from "../utils";

const UserDetailsPage = () => {
  const users = useSelector((state) => state.userData);
  const { userId } = useParams();
  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="rows">
      <h2 className="title is-4">Details of user {user.username}</h2>
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
        detailValue={"$" + bigintToFloat(user.balance)}
      ></Detail>
      <Detail
        detailLabel="Distance Travelled"
        detailValue={bigintToFloat(user.DistanceTravelled) + " km"}
      ></Detail>
    </div>
  );
};

export default UserDetailsPage;
