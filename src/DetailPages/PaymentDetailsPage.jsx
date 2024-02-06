import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bulma/css/bulma.min.css";
import "./UserDetailsPage.css";
import Detail from "../components/Detail";
import {DateTime, bigintToFloat} from "../utils";

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
        detailValue={""}
      ></Detail>
      <DateTime dateTimeString={payment.date}/>
      {"\n"}
      <Detail
        detailLabel="Amount"
        detailValue={`$${bigintToFloat(payment.amount)}`}
      ></Detail>
    </div>
  );
};

export default PaymentDetailsPage;
