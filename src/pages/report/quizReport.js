import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../../components/search";
import axios from "axios";
import swal from "sweetalert";

const QuizReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propsData = location.state;
  const [quizReportData, setQuizReportData] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [loading, setLoading] = useState(false);

  // storing seach values
  const getSearchValue = (search, showSearch) => {
    setSearch(search);
    setShowSearch(showSearch);
  };
  useEffect(() => {
    setLoading(true);
    const unitId = propsData?.unitId;
    axios
      .get(process.env.REACT_APP_API_BASE + "/quizReport/" + unitId)
      .then((res) => {
        setQuizReportData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          swal({
            title: error.response.data.error,
            icon: "warning",
            dangerMode: true,
          });
        } else {
          // Handle other errors
          swal({
            title: error.message,
            icon: "warning",
            dangerMode: true,
          });
        }
      });
  }, []);
  const routeToReview = (userId, userName, empId, userImage) => {
    const unitId = propsData?.unitId;
    navigate("/review", {
      state: { userId, unitId, userName, empId, userImage },
    });
  };

  return loading ? (
    <center>
      <div className="spinner-grow mt-3" role="status"></div>
    </center>
  ) : (
    <>
      <div className="d-flex justify-content-between m-4">
        <h3 className="text-secondary ">{propsData?.unitName} Unit</h3>
        <div id="content-creator" className="mt-2">
          <Search
            handleGetSearchValue={getSearchValue}
            width={{ width: "w-auto" }}
          />
        </div>
      </div>
      <div className="">
        <table className=" empTable table table-striped table-hover mt-sm-5 mt-lg-5 ">
          <thead>
            <tr className="table-head table-dark">
              <th className="text-center">ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Attempted Time</th>
              <th>Submitted Time</th>
              <th>Time Taken</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {/* filter data of quiz report */}
            {quizReportData
              ?.filter((emp) => {
                if (showSearch) {
                  return emp;
                } else if (
                  emp.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return emp;
                }
              })
              ?.map((emp, index) => (
                //displaying data
                <tr
                  key={index}
                  onClick={() =>
                    routeToReview(
                      emp?.userId,
                      emp?.name,
                      emp?.empId,
                      emp?.userImage
                    )
                  }
                >
                  <td>
                    <img
                      className="img-fluid rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                      src={emp?.userImage}
                      alt={emp?.firstName}
                    />{" "}
                    {emp?.empId}
                  </td>
                  <td>{emp?.name}</td>
                  <td>{emp?.department}</td>
                  <td
                    dangerouslySetInnerHTML={{ __html: emp?.attemptedTime }}
                  ></td>
                  <td
                    dangerouslySetInnerHTML={{ __html: emp?.submittedTime }}
                  ></td>
                  <td>{emp?.timeTaken}</td>
                  <td>{emp?.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuizReport;
