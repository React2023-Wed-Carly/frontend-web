import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css";
import Detail from "../components/Detail";
import {bigintToFloat} from "../utils";

const BookingDetailsPage = () => {
  const bookings = useSelector((state) => state.bookingsData);
  const { bookingId } = useParams();
  const booking = bookings.find((booking) => booking.id === parseInt(bookingId));

  if (!booking) {
    return <div>Booking not found</div>;
  }

  return (
    <div className="rows">
      <h2 className="title is-4">Details of booking {booking.id}</h2>
      <Detail
        detailLabel="ID"
        detailValue={booking.id}
      ></Detail>
      <Detail
        detailLabel="Car"
        detailValue={booking.carId}
      ></Detail>
      <Detail
        detailLabel="User"
        detailValue={booking.userId}
      ></Detail>
      <Detail
        detailLabel="Booking start date"
        detailValue={booking.startDate}
      ></Detail>
      <Detail
        detailLabel="Booking end date"
        detailValue={booking.endDate}
      ></Detail>
      <Detail
        detailLabel="Location"
        detailValue={`Latitude ${booking.latitude}, Longitude: ${booking.longitude}`}
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

export default BookingDetailsPage;
