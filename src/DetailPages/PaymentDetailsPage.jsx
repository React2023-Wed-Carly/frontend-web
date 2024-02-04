import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css";
import Detail from "../components/Detail";
import {bigintToFloat} from "../utils";

const PaymentDetailsPage = () => {
  const payments = useSelector((state) => state.paymentsData);
  const { paymentId } = useParams();
  const payment = payments.find((payment) => payment.id === parseInt(paymentId));

  if (!payment) {
    return <div>Payment not found</div>;
  }

  return (
    <div className="rows">
      <h2 className="title is-4">Details of payment {payment.id}</h2>
      <Detail
        detailLabel="ID"
        detailValue={payment.id}
      ></Detail>
      <Detail
        detailLabel="Client"
        detailValue={payment.userId}
      ></Detail>
      <Detail
        detailLabel="Date"
        detailValue={payment.date}
      ></Detail>
      <Detail
        detailLabel="Amount"
        detailValue={`$${bigintToFloat(payment.amount)}`}
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

export default PaymentDetailsPage;
