import React, { useState } from "react";
import Stars from "../Shared/Stars";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const ModalBody = (props) => {
  const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
  const userID = userDocument._id;
  const [times, setTimes] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [formData, setFormData] = useState({
    qualityRate: "",
    clarityRate: "",
    knowledgeAndSkillRate: "",
    commRate: "",
  });
  const handleSubmit = (event) => {
    const data = {
      ...formData,
      userId: userID,
    };
    event.preventDefault();
    if (props.source === "KT") {
      axios
        .post(process.env.REACT_APP_API_BASE+`/save-kt-ratings/${props.ID}`, data)
        .then((res) => {
          console.log(res.data);
          setIsRated(true);
          swal({
            title: "Thank you!",
            text: "Your rating was successfully saved!",
            icon: "success",
            button: "Close",
          }).then(() => {
            window.location.reload(); // Refresh the page
          });
          setFormData({
            qualityRate: "",
            clarityRate: "",
            knowledgeAndSkillRate: "",
            commRate: "",
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
    } else {
      axios
        .post(process.env.REACT_APP_API_BASE+`/save-article-ratings/${props.ID}`, data)
        .then((res) => {
          console.log(res.data);
          setIsRated(true);
          swal({
            title: "Thank you!",
            text: "Your rating was successfully saved!",
            icon: "success",
            button: "Close",
          }).then(() => {
            window.location.reload(); // Refresh the page
          });
          setFormData({
            qualityRate: "",
            clarityRate: "",
            knowledgeAndSkillRate: "",
            commRate: "",
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
    }

    console.log("Submitted form data:", formData);

    return false;
  };

  const handleInputChange = (name, value) => {
    setTimes(times + 1);
    console.log(formData);
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  return (
    <>
      {isRated ? (
        <div>You have already rated this learning material</div>
      ) : (
        <div>
          <p>Quality of the learning material:</p>
          <Stars
            stars={5}
            color="#D9D9D9"
            type={1}
            handleInputChange={handleInputChange}
            name="qualityRate"
          />
          <p>Clarity of the learning material:</p>
          <Stars
            stars={5}
            color="#D9D9D9"
            type={1}
            handleInputChange={handleInputChange}
            name="clarityRate"
          />
          <p>Knowledge transferring skills of the creator:</p>
          <Stars
            stars={5}
            color="#D9D9D9"
            type={1}
            handleInputChange={handleInputChange}
            name="knowledgeAndSkillRate"
          />
          <p>Communication skills of the creator:</p>
          <Stars
            stars={5}
            color="#D9D9D9"
            type={1}
            handleInputChange={handleInputChange}
            name="commRate"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary mt-5 "
              style={{
                backgroundColor: "#1D9EEC",
                borderColor: "#1D9EEC",
              }}
              disabled={times < 4 ? true : false}
            >
              Rate
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBody;
