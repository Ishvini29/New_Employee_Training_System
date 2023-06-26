import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditQuizEntry from "./EditQuizEntry";
import QuizPopup from "./QuizPopup";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
const QuizEntry = (props) => {
  const { id, chapName, unitName, chapId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [quizContent, setQuizContent] = useState("");
  const userData = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData;
  const userId = userData?._id;

  const [updatedTodo, setUpdatedTodo] = useState({
    quizName: "",
    quizDesc: "",
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + `/units/${id}`)
      .then((response) => {
        const { quizName, quizDesc } = response.data.quiz;
        setUpdatedTodo({ quizName, quizDesc });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:1337/checkSubmitted/" + id + "/" + userId)
      .then((res) => setSubmitted(res.data))
      .catch((err) => console.log(err));

  }, [id]);
  const routeToResult = () => {
    navigate("/result", { state: { unitId: id } });
  };
  // const openQuiz = (id, chapId) => {
  //   swal({
  //     title: "Are you sure you want to attempt the quiz?",
  //     buttons: ["No", "Yes"],
  //     dangerMode: true,
  //   }).then((confirmed) => {
  //     if (confirmed) {
  //       setQuizContent(<QuizPopup id={id} chapId={chapId} ></QuizPopup>)
  //     }
  //   });
  // }

  return (
    <React.Fragment>
    
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="container my-5">
          <h4 className="heading rounded p-3">
            {chapName + ": " + unitName + ": Quiz"}
          </h4>
        </div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
              <br></br>
              <br></br>
              {
                userData.userRole === "Hired Employee" ? null : (
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                      <EditQuizEntry id={id} />
                    </div>
                  </div>
                )
              }
              <center>
                <h3 style={{ font: "25px", color: "#000000" }}>
                  {updatedTodo.quizName}
                </h3>
                <p>{updatedTodo.quizDesc}</p>
              </center>



              <div class="d-grid gap-2 col-6 mx-auto">
                {userData.userRole === "Hired Employee" ? null : (
                  <Link to={"/quiz/" + id + "/" + chapName + "/" + unitName}>
                    <button
                      type="button"
                      class="btn btn-secondary form-control"
                    >
                      View Quiz
                    </button>
                  </Link>
                )}

                {userData.userRole !== "Hired Employee" ? null :
                  <QuizPopup id={id} chapId={chapId}></QuizPopup>
                }
                <div>
                  {quizContent}
                </div>
                {/* <QuizComponent id={id} /> */}
                {submitted && (
                  <button
                    className="btn btn-primary"
                    onClick={() => routeToResult()}
                  >
                    View Result
                  </button>
                )}
              </div>

              <br></br>
              <br></br>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default QuizEntry;
