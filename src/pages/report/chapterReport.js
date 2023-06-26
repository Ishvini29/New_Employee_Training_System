import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ChapterReport = () => {
  const localhostEmpId = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  )?.userData?.empId;

  const [chapterReportDetails, setChapterReportDetails] = useState({});
  const [navActive, setNavActive] = useState(0);
  const [selectedOption, setSelectedOption] = useState("Chapter Report");
  const [loading, setLoading] = useState(false);

  //get props
  const location = useLocation();
  const propsData = location.state;
  //send props
  const navigate = useNavigate();
  // option
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(event.target.value, {
      state: {
        empId: chapterReportDetails?.userData?.empId,
        empName: chapterReportDetails?.userData?.empName,
      },
    });
  };
  const [errorHandling, setErrorHandling] = useState("");

  useEffect(() => {
    setLoading(true);
    let empId = propsData?.empId || localhostEmpId;
    axios
      .get(process.env.REACT_APP_API_BASE + "/chapterReport/" + empId)
      .then((res) => {
        setChapterReportDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error?.response && error?.response.status === 404) {
          // Handle "User not found" error
          setErrorHandling(error?.response.data.error);
        } else {
          // Handle other errors
          setErrorHandling(error?.message);
        }
      });
  }, []);
  return (
    <div className="">
      {loading ? (
        <center>
          <div className="spinner-grow mt-3" role="status"></div>
        </center>
      ) : chapterReportDetails?.chapterReportData?.length > 0 ? (
        <div>
          {errorHandling === "" ? (
            <>
              <div className="chap-name-select mt-3">
                <div className=" d-flex ps-4">
                  <img
                    className="img-fluid rounded-circle supervisor-avatar"
                    src={chapterReportDetails?.userData?.userImage}
                    alt={chapterReportDetails?.userData?.empName}
                  />
                  <div className="d-flex flex-column ps-4">
                    <h3>{chapterReportDetails?.userData?.empName}</h3>

                    <h5 className="text-secondary ms-2">
                      {chapterReportDetails?.userData?.empId}
                    </h5>
                  </div>
                </div>
                <select
                  className="form-select mt-sm-4"
                  aria-label="Default select example"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="/chapterreport">Chapter Report</option>
                  <option value="/overviewreport">OverviewReport</option>
                </select>
              </div>

              <div className=" chapter-content m-3 pt-lg-5">
                <div
                  className="nav flex-column nav-pills me-3"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {/* displaying chapter details */}
                  {chapterReportDetails?.chapterReportData?.map(
                    (chap, index) => (
                      <button
                        key={index}
                        onClick={() => setNavActive(index)}
                        className={
                          index === navActive ? "nav-link active" : "nav-link"
                        }
                        data-bs-toggle="pill"
                        data-bs-target={`#${index}`}
                        type="button"
                        role="tab"
                        aria-controls={index}
                        aria-selected={index === navActive ? "true" : "false"}
                      >
                        {chap?.chapterName}
                      </button>
                    )
                  )}
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  {chapterReportDetails?.chapterReportData?.map(
                    (chap, indexi) => (
                      <div
                        key={indexi}
                        className={
                          indexi === navActive
                            ? "tab-pane fade active show"
                            : "tab-pane fade"
                        }
                        id={indexi}
                        role="tabpane"
                        aria-labelledby={indexi}
                        tabIndex={indexi}
                      >
                        <table className="table leaderboard-table">
                          <thead>
                            <tr className="table-head">
                              <th className="leaderboard-th align-middle text-center">
                                Unit Name
                              </th>
                              <th className="leaderboard-th align-middle text-center">
                                Score
                              </th>
                              <th className="leaderboard-th align-middle text-center">
                                Grade
                              </th>
                              <th className="leaderboard-th align-middle text-center">
                                Percentage
                              </th>
                            </tr>
                          </thead>
                          {/* displaying unit information */}
                          <tbody>
                            {chap?.units?.map((unit, indexi) => (
                              <tr key={indexi} className="leaderboard-tr">
                                <td className="leaderboard-td align-middle text-center chapter-row">
                                  {unit?.unitName}
                                </td>
                                <td className="leaderboard-td align-middle text-center chapter-row">
                                  {unit?.score}
                                </td>
                                <td className="leaderboard-td align-middle text-center chapter-row">
                                  {unit?.score >= 75
                                    ? "A"
                                    : unit?.score < 75 && unit?.score >= 65
                                    ? "B"
                                    : unit?.score < 65 && unit?.score >= 55
                                    ? "C"
                                    : unit?.score < 55 && unit?.score >= 40
                                    ? "S"
                                    : "F"}
                                </td>
                                <td className="leaderboard-td align-middle text-center chapter-row">
                                  {unit?.score}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{errorHandling} </h4>
            </div>
          )}
        </div>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>No quizzes have been completed yet.</h4>
        </div>
      )}
    </div>
  );
};

export default ChapterReport;
