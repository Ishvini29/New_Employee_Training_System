import React, { useState, useEffect } from "react";
import Modal from "../Shared/Modal";
import Stars from "../Shared/Stars";
import ModalBody from "./ModalBody";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Ratings = (props) => {
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    if (props?.source === "KT") {
      axios
        .get(process.env.REACT_APP_API_BASE + `/get-kt-ratings/${props?.ID}`)
        .then((response) => {
          setRatings(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .get(
          process.env.REACT_APP_API_BASE + `/get-article-ratings/${props?.ID}`
        )
        .then((response) => {
          setRatings(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="d-flex flex-row mt-5 align-items-end justify-content-end">
      <div className="d-flex flex-column my-auto hover-overlay">
        <Stars stars={ratings} color="#FFCE22" type={0} />
      </div>
      {userDocument.userRole === "Hired Employee" && !props.isRated && (
        <div className="d-flex flex-column">
          <Modal
            className="btn btn-primary"
            style={{ backgroundColor: "#1D9EEC", borderColor: "#1D9EEC" }}
            title="Rate Under:"
            mainButton="Rate"
            button="Rate"
            body={<ModalBody ID={props?.ID} source={props?.source} />}
          />
        </div>
      )}
    </div>
  );
};

export default Ratings;
