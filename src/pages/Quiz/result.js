import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

const Result = () => {
  const currentUser = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?._id;
  const department = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?.department;

  const location = useLocation();
  const propsData = location.state;
  const unitId = propsData?.unitId;
  const [result, setResult] = useState({});
  const [percentage, setPercentage] = useState(0); //circular process percentage

  useEffect(() => {
    // Fetch result
    axios
      .get(process.env.REACT_APP_API_BASE+"/result/" + currentUser + "/" + unitId)
      .then((res) => setResult(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          swal({
            title: "Error",
            text: error.response.data.error,
            icon: "warning",
            dangerMode: true,
          });
        } else {
          // Handle other errors
          swal({
            title: "Error",
            text: error.message,
            icon: "warning",
            dangerMode: true,
          });
        }
      });
    // store badge for the current user if he will be below rank 4
    axios
      .post(process.env.REACT_APP_API_BASE+"/storeBadge", { currentUser, unitId, department })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // circular progress
    setTimeout(() => {
      if (percentage < result?.score) {
        setPercentage(percentage + 1);
      }
    }, 1);
  });
  const resultPercentage =
    (result?.numOfCorrectAns / result?.totalNumOfQuestions) * 100;

  return (
    <div
      className={`${
        resultPercentage > 75
          ? "result-greater-than-75 d-flex flex-column align-items-center text-center"
          : resultPercentage > 50
          ? " result-greater-than-50 d-flex flex-column align-items-center text-center"
          : resultPercentage > 30
          ? " result-greater-than-30 d-flex flex-column align-items-center text-center"
          : " result d-flex flex-column align-items-center text-center"
      }`}
    >
      <div className="shadow">
        <div className="result-body">
          <h2 className="result-header">{result?.unitName} quiz </h2>
          <div className="d-flex justify-content-center mt-4 fw-semibold">
            <div style={{ width: 150 }}>
              <CircularProgressbar
                value={percentage}
                text={`${result?.score}%`}
                styles={buildStyles({
                  pathColor: "#0B5ED7",
                  textColor: "#6C757D",
                })}
              />
            </div>
          </div>

          <div className="score-header pt-3">
            <div className="mt-2">
              <h4>You have done the quiz</h4>
            </div>
            {resultPercentage > 75 ? (
              <h2 style={{ color: "#ad58dd" }}>
                Fantastic!
                <h4 className="py-2" style={{ color: "#cf52f2" }}>
                  You're really working hard..
                </h4>
              </h2>
            ) : resultPercentage > 50 ? (
              <h2 style={{ color: "#c614c9" }}>
                Congratulations!
                <h4 className="py-2" style={{ color: "#cc5ee5" }}>
                  Nice Going..
                </h4>
              </h2>
            ) : resultPercentage * 100 > 30 ? (
              <h2 style={{ color: "#d313b3" }}>
                Much better!
                <h4 className="py-2" style={{ color: "#f762dc" }}>
                  Keep Trying..
                </h4>
              </h2>
            ) : (
              <h2 style={{ color: "#db1168" }}>
                Good attempt!
                <h4 className="py-2" style={{ color: "#ea4f92" }}>
                  Better luck next time..
                </h4>
              </h2>
            )}
          </div>
          <div className="">
            <h5 className="text-muted">Score</h5>
            <h3 className="muted-text">
              {result?.numOfCorrectAns}/{result?.totalNumOfQuestions}
            </h3>
          </div>

          <div className="mt-0">
            <h5 className="text-muted">Time taken</h5>
            <h3 className="muted-text">{result?.timeTaken}</h3>
          </div>

          <button className="btn btn-primary mt-4">
            <Link
              to="/review"
              state={{ unitId: unitId, userId: currentUser }}
              className="text-white text-decoration-none"
            >
              Show Answers
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
