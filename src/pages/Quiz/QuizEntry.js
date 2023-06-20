import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuizComponent from "./QuizComponent";
import NavBar from "../../components/NavBar";
import EditQuizEntry from "./EditQuizEntry";
import QuizPopup from "./QuizPopup";
import jwt_decode from "jwt-decode";

const QuizEntry = (props) => {
  const { id } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const userId = jwt_decode(JSON?.parse(localStorage?.getItem("user"))?.token)
    ?.userData?._id;

  const [updatedTodo, setUpdatedTodo] = useState({
    quizName: "",
    quizDesc: "",
  });
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+`/units/${id}`)
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
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="container p-4">
          <div className="card" style={{ backgroundColor: "#70B9E6" }}>
            <div className="card-body">
              <h1 style={{ font: "25px", color: "#ffffff" }}>
                NETS: UML Diagrams
              </h1>
            </div>
          </div>
        </div>
        <div className="container p-4">
          <div className="card">
            <div className="card-header">
              <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                    <li className="nav-item" style={{ fontWeight: "bold" }}>
                      <Link to="/chapterPage" className="nav-link active">
                        Units
                      </Link>
                    </li>
                    <li className="nav-item" style={{ fontWeight: "bold" }}>
                      <Link to="/article" className="nav-link">
                        Articles
                      </Link>
                    </li>
                    <li className="nav-item" style={{ fontWeight: "bold" }}>
                      <Link to="/" className="nav-link">
                        Discussion Forums
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="card-body" style={{ backgroundColor: "#DDEDF8" }}>
              <br></br>
              <br></br>

              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <h3 style={{ font: "25px", color: "#000000" }}>
                  {updatedTodo.quizName}
                </h3>
                <div>
                  <EditQuizEntry id={id} />
                </div>
              </div>

              <p>{updatedTodo.quizDesc}</p>

              <div class="d-grid gap-2 col-6 mx-auto">
                <Link to={"/quiz/" + id}>
                  <button type="button" class="btn btn-secondary form-control">
                    View Quiz
                  </button>
                </Link>
                <QuizPopup id={id}></QuizPopup>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </React.Fragment>
  );
};
export default QuizEntry;
