import React, { useState, useEffect } from "react";
import Header from "../../Shared/Header";
import LargeModal from "../../Shared/LargeModal";
import DirectForm from "./DirectForm";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DirectGuidanceTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState(0);
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/get-tickets-by-directed-department-id/${userDocument?.department}`
      )
      .then((response) => {
        setTickets(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onFormSubmit = (formData) => {
    const data = {
      ...formData,
      status: "directed",
      isAssigned: true,
      directedBy: userDocument?._id,
    };
    console.log("id", ticketId);

    axios
      .put(`http://localhost:1337/assign-ticket-by-ticket-id/${ticketId}`, data)
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Thank you!",
          text: "The ticket was successfully directed!",
          icon: "success",
          button: "Close",
        }).then(() => {
          window.location.reload(); // Refresh the page
        });
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Opzz!",
          text: "Something went wrong, Please try again!",
          icon: "warning",
        });
      });

    return false;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }

  return (
    <div className="container">
      <div className="pt-5 px-4">
        <Header title="NETS: Guidance Ticket" />
      </div>
      <div
        style={{
          display: "block",
          borderRadius: "11px",
          boxShadow: "black",
          marginBottom: "2%",
          paddingTop: "50px",
        }}
      >
        {tickets?.map((t) => (
          <div
            className="card mb-5"
            style={{
              borderColor: "#1D9EEC",
              backgroundColor:
                t?.status === "requested" ? "#DDEDF8" : "#F8F8F8",
            }}
          >
            <div className="card-body">
              <div className="row">
                <p className="col-sm-6">Request No. {t?._id}</p>
                <p className="col-sm-6"> Request Type : {t?.requestType}</p>
              </div>
              <div className="row">
                <p className="col-sm-6">
                  {t.status === "requested" ? (
                    <LargeModal
                      title="Guidance Direction Form"
                      mainButton="DIRECT"
                      body={
                        <DirectForm
                          onFormSubmit={onFormSubmit}
                          ticket={t}
                          setTicketId={setTicketId}
                        />
                      }
                    />
                  ) : (
                    "Assigned to : " +
                    t?.assignedTo?.firstName +
                    " " +
                    t?.assignedTo?.lastName
                  )}
                </p>
                <p className="col-sm-6">
                  Requested on: {formatDate(t.createdTime)}
                </p>
              </div>
              <div className="row">
                <div className="col-sm-10 mx-auto my-3">
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width:
                          t?.status === "requested"
                            ? "20%"
                            : t?.status === "directed"
                            ? "60%"
                            : "100%",
                      }}
                      aria-valuenow={
                        t?.status === "requested"
                          ? "20"
                          : t?.status === "directed"
                          ? "60"
                          : "100"
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {t?.status === "requested"
                        ? "Requested"
                        : t.status === "directed"
                        ? "Directed"
                        : "Completed"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectGuidanceTickets;
