import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import gold from "../../images/gold.png";
import silver from "../../images/silver.png";
import bronze from "../../images/bronze.png";

const OverviewReport = () => {
  const API_BASE = "http://localhost:1337";
  const localhostEmpId = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?.empId;

  const [overviewReportDetails, setOverviewReportDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Overview Report");
  const [errorHandling, setErrorHandling] = useState("");
  const [badges, setBadges] = useState({});

  const location = useLocation();
  const propsData = location?.state;
  const navigate = useNavigate();

  // handle select options
  const handleOptionChange = (event) => {
    setSelectedOption(event?.target?.value);
    //pass the states to the selected option
    navigate(event?.target?.value, {
      state: {
        empId: overviewReportDetails?.userData?.empId,
        empName: overviewReportDetails?.userData?.empName,
      },
    });
  };

  useEffect(() => {
    let empId = propsData?.empId || localhostEmpId;
    axios
      .get(API_BASE + "/overviewReport/" + empId)
      .then((res) => setOverviewReportDetails(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          setErrorHandling(error.response.data.error);
        } else {
          // Handle other errors
          setErrorHandling(error.message);
        }
      });
    axios
      .get(API_BASE + "/showbadge/" + empId)
      .then((res) => setBadges(res?.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {errorHandling === "" ? (
        <div
          className={
            badges?.gold > 0 || badges?.silver > 0 || badges?.bronze > 0
              ? "overview-grid"
              : ""
          }
        >
          <div>
            {/* header with employee name and ID */}
            <div className="chap-name-select mt-3">
              <div className="d-flex py-4 ms-5 ps-lg-5">
                <img
                  className="img-fluid rounded-circle supervisor-avatar"
                  src={overviewReportDetails?.userData?.userImage}
                  alt={overviewReportDetails?.userData?.empName}
                />
                <div className="d-flex flex-column ps-4">
                  <h3>{overviewReportDetails?.userData?.empName}</h3>
                  <h5 className="text-secondary ms-2">
                    {overviewReportDetails?.userData?.empId}
                  </h5>
                </div>
              </div>

              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="/overviewreport">Overview Report</option>
                <option value="/chapterreport">Chapter Report</option>
              </select>
            </div>

            <div className="">
              <table className="table leaderboard-table container-lg">
                <thead>
                  <tr className="table-head">
                    <th className="leaderboard-th align-middle text-center">
                      Chapter
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      # Units
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      Total Score
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      Average Score
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* chapter details */}
                  {overviewReportDetails?.overviewReportData?.map(
                    (overviewItem, index) => (
                      <tr
                        key={index}
                        className=" bg-primary bg-opacity-10 leaderboard-tr fw-semibold"
                      >
                        <td className="leaderboard-td align-middle text-center">
                          {overviewItem?.chapterName}
                        </td>
                        <td className="leaderboard-td align-middle text-center">
                          {overviewItem?.unitCount}
                        </td>

                        <td className="leaderboard-td align-middle text-center">
                          {overviewItem?.score}
                        </td>
                        <td className="leaderboard-td align-middle text-center">
                          {overviewItem?.average}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className={
              badges?.gold > 0 || badges?.silver > 0 || badges?.bronze > 0
                ? "badges text-center mt-5"
                : "d-none"
            }
          >
            <h3>Badges</h3>
            {badges?.gold > 0 && (
              <div className="py-3">
                <img
                  src={gold}
                  className="leaderboard-avatar"
                  draggable="false"
                  alt="gold badge"
                ></img>
                <h4 className="btn btn-outline-warning">{badges?.gold}</h4>
              </div>
            )}
            {badges?.silver > 0 && (
              <div className="py-3">
                <img
                  src={silver}
                  alt="silver badge"
                  className="leaderboard-avatar"
                  draggable="false"
                ></img>
                <h4 className="btn btn-outline-secondary">{badges?.silver}</h4>
              </div>
            )}
            {badges?.bronze > 0 && (
              <div className="py-3">
                <img
                  src={bronze}
                  alt="bronze badge"
                  className="leaderboard-avatar"
                  draggable="false"
                ></img>
                <h4 className="btn btn-outline-danger">{badges?.bronze}</h4>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "300px", padding: "20px" }}
        >
          <h4>{errorHandling} </h4>
        </div>
      )}
    </>
  );
};

export default OverviewReport;
