import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { swal } from "sweetalert";
import Search from "../../components/search";
import jwt_decode from "jwt-decode";

const ProjScore = () => {
  const [gradeData, setGradeData] = useState([]);
  const [showFeedback, setShowFeedback] = useState();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const supervisorId = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?._id;

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE + "/getProjScore/" + supervisorId)
      .then((res) => {
        setGradeData(res.data);
        setLoading(false);
      })
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
            text: error?.message,
            icon: "warning",
            dangerMode: true,
          });
        }
      });
  }, []);

  const getSearchValue = (search, showSearch) => {
    setSearch(search);
    setShowSearch(showSearch);
  };

  return (
    <>
      {loading ? (
        <center>
          <div className="spinner-grow mt-3" role="status"></div>
        </center>
      ) : gradeData?.length > 0 ? (
        <>
          <div className="d-flex justify-content-between m-4">
            <h3 className="text-secondary ">Project Assignment Grades</h3>
            <div id="content-creator" className="mt-2">
              <Search
                handleGetSearchValue={getSearchValue}
                width={{ width: "w-auto" }}
              />
            </div>
          </div>

          <div className="leaderboard-table-wrapper px-lg-3">
            <table className="table table-responsive leaderboard-table">
              <thead>
                <tr>
                  <th className="leaderboard-th score-table-header">
                    Project Name
                  </th>
                  <th className="leaderboard-th score-table-header">
                    Submitted by
                  </th>
                  <th className="leaderboard-th score-table-header">Grade</th>
                  <th className="leaderboard-th score-table-header">
                    Visible status
                  </th>
                  <th className="leaderboard-th score-table-header">
                    Submitted Time
                  </th>
                  <th className="leaderboard-th score-table-header">
                    Graded by
                  </th>
                  <th className="leaderboard-th score-table-header">
                    Graded Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradeData
                  ?.filter((emp) => {
                    // Filtering the editlog data based on the search query
                    if (showSearch) {
                      return emp;
                    } else if (
                      emp.submittedName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return emp;
                    }
                  })
                  ?.map((data, index) => {
                    return (
                      <>
                        <tr
                          key={index}
                          className="leaderboard-tr"
                          onClick={() => {
                            setShowFeedback(index);
                            setShow(!show);
                          }}
                        >
                          <td className="leaderboard-td score-table-body vertical-align">
                            {data?.projectName}
                          </td>
                          <td className="leaderboard-td score-table-body vertical-align">
                            <span className="ms-4">
                              <img
                                className="img-fluid rounded-circle "
                                style={{ width: "50px", height: "50px" }}
                                src={data?.employeeUserImage}
                                alt={data?.submittedName}
                              />
                              <br></br>
                              <span className="ms-3">{data?.submittedId}</span>
                            </span>
                            <br></br>
                            {data?.submittedName}
                          </td>
                          <td className="leaderboard-td score-table-body vertical-align">
                            {data?.grade}
                          </td>
                          <td className="pt-4 text-center score-table-body vertical-align">
                            {data?.show ? (
                              <MdOutlineCheckCircle color="green" size={25} />
                            ) : (
                              <MdOutlineCancel color="red" size={25} />
                            )}
                          </td>
                          <td className="leaderboard-td score-table-body vertical-align">
                            {data?.submittedTime}
                          </td>
                          <td className="leaderboard-td score-table-body vertical-align">
                            <span className="ms-4">
                              <img
                                className="img-fluid rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                                src={data?.supervisorUserImage}
                                alt={data?.gradedName}
                              />
                              <br></br>
                              <span className="ms-3">{data?.gradedId}</span>
                            </span>
                            <br></br>
                            {data?.gradedName}
                          </td>
                          <td className="leaderboard-td score-table-body vertical-align">
                            {data?.gradedTime}
                          </td>
                        </tr>
                        {showFeedback === index && show && (
                          <tr>
                            <td
                              className=" score-table-feedback-td leaderboard-td fw-semibold p-4"
                              colSpan="7"
                            >
                              <h4>Feedback</h4>
                              {data?.feedback}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>No evaluated submissions found. </h4>
        </div>
      )}
    </>
  );
};
export default ProjScore;
