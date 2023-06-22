import React, { useState, useEffect } from "react";
import Header from "../../Shared/Header";
import LargeModal from "../../Shared/LargeModal";
import RequestForm from "./RequestForm";
import swal from "sweetalert";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase config/firebase";
import { v4 } from "uuid";
import jwt_decode from "jwt-decode";

const RequestGuidanceTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false); // New state for tracking upload status
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE+`/get-tickets-by-requested-user-id/${userDocument._id}`
      )
      .then((response) => {
        setTickets(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  async function onFormSubmit(formData) {
    try {
      var data = {
        ...formData,
        requestedBy: userDocument._id,
      };
      console.log(data);

      if (attachment === null) {
        axios
          .post(process.env.REACT_APP_API_BASE+"/save-ticket", data)
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your post was successfully saved!",
              icon: "success",
              button: "Close",
              // onClose: window.location.reload(),
            });
            console.log("Submitted form data:", data);
          })
          .catch((error) => {
            console.log(error);
            swal({
              title: "Opzz!",
              text: "Something went wrong, Please try again!",
              icon: "warning",
            });
          });

        return;
      }
      console.log(attachment.name);
      const fileExtension = attachment.name.split(".").pop(); // Get the file extension
      const fileName = `tickets_${v4()}.${fileExtension}`; // Generate a unique filename with the correct extension

      const AttachmentRef = ref(
        storage,
        `GuidanceTickets/Attachments/${fileName}`
      );
      setUploading(true);
      uploadBytes(AttachmentRef, attachment).then((a) => {
        getDownloadURL(a.ref).then((url) => {
          console.log(url);
          data = { ...data, attachment: url };
          axios
            .post(process.env.REACT_APP_API_BASE+"/save-ticket", data)
            .then((res) => {
              console.log(res.data);
              swal({
                title: "Thank you!",
                text: "Your post was successfully saved!",
                icon: "success",
                button: "Close",
              }).then(() => {
                window.location.reload(); // Refresh the page
              });
              console.log("Submitted form data:", data);
            })
            .catch((error) => {
              console.log(error);
              swal({
                title: "Opzz!",
                text: "Something went wrong, Please try again!",
                icon: "warning",
              });
            })
            .finally(() => {
              setUploading(false); // Set the uploading state to false once the upload is complete
            });
        });
      });
    } catch (err) {
      swal({
        title: "Opzz!",
        text: "Something went wrong, Please try again!",
        icon: "warning",
      });
    }
    console.log("Submitted form data:", data);

    return false;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  }

  return (
    <div className="container">
      <div className="pt-5 px-4">
        <Header title="NETS: Guidance Tickets" />
      </div>
      <div
        style={{
          borderRadius: "11px",
          boxShadow: "black",
          marginTop: "2%",
          marginBottom: "2%",
          paddingTop: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LargeModal
          title="Guidance Request Form"
          mainButton="Request Guidance"
          body={
            <RequestForm
              uploading={uploading}
              onFormSubmit={onFormSubmit}
              setAttachment={setAttachment}
            />
          }
        />
      </div>
      <div className="mt-4">
        {tickets.map((t) => (
          <div
            className="card mt-4"
            style={{
              borderColor: "#1D9EEC",
            }}
          >
            <div className="card-body">
              <div className="row">
                <p className="col-sm-6">Request No. {t._id}</p>
                <p className="col-sm-6">
                  {" "}
                  Directed Department : {t.directedDepartmentID.depName}
                </p>
              </div>
              <div className="row">
                <p className="col-sm-6">Request Type : {t.requestType}</p>
                <p className="col-sm-6"> Request Title : {t.requestTitle}</p>
              </div>
              <div className="row">
                <p className="col-sm-6">
                  Requested on: {formatDate(t.createdTime)}
                </p>
                <p className="col-sm-6">
                  Assigned to :{" "}
                  {t.assignedTo
                    ? t.assignedTo.firstName + " " + t.assignedTo.lastName
                    : "Pending"}{" "}
                </p>
              </div>
              <div className="row">
                <p className="col-sm-6">
                  Contact number :{" "}
                  {t.assignedTo ? t.assignedTo.phoneNumber : "Pending"}
                </p>
                <p className="col-sm-6">
                  Email : {t.assignedTo ? t.assignedTo.emailAddress : "Pending"}
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
                          t.status === "requested"
                            ? "20%"
                            : t.status === "directed"
                            ? "60%"
                            : "100%",
                      }}
                      aria-valuenow={
                        t.status === "requested"
                          ? "20"
                          : t.status === "directed"
                          ? "60"
                          : "100"
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {t.status === "requested"
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

export default RequestGuidanceTickets;
