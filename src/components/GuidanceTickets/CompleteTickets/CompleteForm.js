import React from "react";
import { Link } from "react-router-dom";

const CompleteForm = (props) => {
  return (
    <div className="container bg-white">
      <form onSubmit={props.onFormSubmit}>
        <div className="row">
          <p className="col-sm-6">Request No. {props.ticket._id}</p>
          <p className="col-sm-6"> Request Type : {props.ticket.requestType}</p>
        </div>
        <div className="row">
          <p className="col-sm-12">
            Short Description : {props.ticket.description}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-12">
            {props?.ticket.attachment && (
              <>
                Attachment :{" "}
                <Link
                  to={`/guidance-ticket-view-attachment/${props?.ticket._id}`}
                >
                  View
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-12">
            Requested by :{" "}
            {props.ticket.requestedBy.firstName +
              " " +
              props.ticket.requestedBy.lastName}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-6">
            Contact Number : {props.ticket.requestedBy.phoneNumber}
          </p>
          <p className="col-sm-6">
            Email : {props.ticket.requestedBy.emailAddress}
          </p>
        </div>
        <div className="form-check form-switch my-2">
          {props.ticket.status === "completed" ? (
            <input
              className="form-check-input"
              type="checkbox"
              id="iscompleted"
              name="iscompleted"
              disabled
            />
          ) : (
            <input
              className="form-check-input"
              type="checkbox"
              id="iscompleted"
              name="iscompleted"
              onChange={() => {
                props.setTicketId(props.ticket._id);
              }}
              required
            />
          )}
          <label className="form-check-label" for="iscompleted">
            Completed
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary mt-4 mb-3 col-sm-2"
            style={{
              backgroundColor: "#1D9EEC",
              borderColor: "#1D9EEC",
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteForm;
