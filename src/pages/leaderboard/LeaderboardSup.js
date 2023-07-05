import React from "react";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Swal from "sweetalert2";
import axios from "axios";
import Search from "../../components/search";
const LeaderboardSup = () => {
  const [score, setScore] = useState([]);
  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  let filtering = 3;

  useEffect(() => {
    setLoading(true);
    Swal.fire(
      `Need to know!`,
      "The leaderboard is determined based on the average score of department chapters.",
      "info"
    );
    axios
      .get(process.env.REACT_APP_API_BASE + "/getLeaderboardData")
      .then((res) => {
        setScore(res.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle other errors
        swal({
          title: "Error",
          text: error.message,
          icon: "warning",
          dangerMode: true,
        });
      });
  }, []);

  const getSearchValue = (search, showSearch) => {
    setSearch(search);
    setShowSearch(showSearch);
  };
  const departmentLeaderboard = (index) => {
    return (
      <>
        {score[index]?.leaderboard?.length > 1 ? (
          <>
            <div className="row m-0 justify-content-center gy-3">
              {/* Top gainer 1 */}
              <div className="col col-12 col-md-12 col-lg-3">
                <div className="card leaderboard-card text-center">
                  {/* Top gainer 1 total score in the header */}
                  <div className="card-header leaderboard-header">
                    <h2 className="w-100">
                      {score[index]?.leaderboard?.[0]?.totalScore?.toFixed(2)}
                    </h2>
                  </div>
                  {/* Top gainer 1 avatar */}
                  <div className="leaderboard-avatar-wrapper">
                    <img
                      className="img-fluid rounded-circle leaderboard-avatar"
                      src={score[index]?.leaderboard[0]?.userImage}
                      alt={score[index]?.leaderboard[0]?.firstName}
                    />
                  </div>
                  {/* Top gainer 1 body */}
                  <div className="card-body">
                    <h5 className="card-title leaderboard-title">
                      {score[index]?.leaderboard[0]?.firstName}{" "}
                      {score[index]?.leaderboard[0]?.lastName}
                    </h5>
                    <hr />
                    {/* Top gainer 1 employee ID and average score  */}
                    <div className="d-flex justify-content-around fw-semibold">
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[0]?.empId}
                      </span>
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[0]?.rank}
                      </span>
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[0]?.averageScore?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Top gainer 2 */}
              <div className="col col-12 col-md-6 col-lg-3">
                <div className="card leaderboard-card text-center">
                  <div className={`card-header leaderboard-header `}>
                    <h2 className="w-100">
                      {score?.[index]?.leaderboard[1]?.totalScore?.toFixed(2)}
                    </h2>
                  </div>
                  <div className="leaderboard-avatar-wrapper">
                    <img
                      className="img-fluid rounded-circle leaderboard-avatar"
                      src={score?.[index]?.leaderboard[1]?.userImage}
                      alt={score?.[index]?.leaderboard[1]?.firstName}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title leaderboard-title">
                      {score?.[index]?.leaderboard[1]?.firstName}{" "}
                      {score?.[index]?.leaderboard[1]?.lastName}
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-around fw-semibold">
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[1]?.empId}
                      </span>
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[1]?.rank}
                      </span>
                      <span className="card-title leaderboard-desc">
                        {score?.[index]?.leaderboard[1]?.averageScore?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Top gainer 3 */}
              {score?.[index]?.leaderboard?.length > 2 && (
                <div className="col col-12 col-md-6 col-lg-3">
                  <div className="card leaderboard-card text-center">
                    <div className={`card-header leaderboard-header `}>
                      <h2 className="w-100">
                        {score?.[index]?.leaderboard[2]?.totalScore?.toFixed(2)}
                      </h2>
                    </div>
                    <div className="leaderboard-avatar-wrapper">
                      <img
                        className="img-fluid rounded-circle leaderboard-avatar"
                        src={score?.[index]?.leaderboard[2]?.userImage}
                        alt={score?.[index]?.leaderboard[2]?.firstName}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title leaderboard-title">
                        {score?.[index]?.leaderboard[2]?.firstName}{" "}
                        {score?.[index]?.leaderboard[2]?.lastName}
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-around fw-semibold">
                        <span className="card-title leaderboard-desc">
                          {score?.[index]?.leaderboard[2]?.empId}
                        </span>
                        <span className="card-title leaderboard-desc">
                          {score?.[index]?.leaderboard[2]?.rank}
                        </span>
                        <span className="card-title leaderboard-desc">
                          {score?.[
                            index
                          ]?.leaderboard[2]?.averageScore?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* rank after 3 */}
            {score[index]?.leaderboard?.length > 3 && (
              <div className="leaderboard-table-wrapper ">
                <div className="d-flex justify-content-between my-5">
                  <h4 className="top-gainers mt-2">All Employees</h4>
                  <div className="d-flex justify-content-between ">
                    <div className="mt-2 float-end">
                      <Search
                        handleGetSearchValue={getSearchValue}
                        width={{ width: "w-auto" }}
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
                <table className="table leaderboard-table">
                  <thead>
                    <tr>
                      <th className="leaderboard-empId leaderboard-th bg-light">
                        ID
                      </th>
                      <th className="leaderboard-th align-middle text-center bg-light">
                        Name
                      </th>
                      <th className="leaderboard-th align-middle text-center bg-light">
                        Total Score
                      </th>
                      <th className="leaderboard-th align-middle text-center bg-light">
                        Average Score
                      </th>
                      <th className="leaderboard-th align-middle text-center bg-light">
                        Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {score[index]?.leaderboard
                      ?.filter((emp1) => {
                        let name = emp1?.firstName + " " + emp1?.lastName;
                        if (showSearch) {
                          // works at normal stage and click search
                          return emp1;
                        } else if (
                          name?.toLowerCase().includes(search?.toLowerCase())
                        ) {
                          // works when filtering
                          filtering = 0;
                          return emp1;
                        }
                      })
                      .map(
                        (emp, indexi) =>
                          indexi >= filtering && (
                            <tr className="leaderboard-tr " key={indexi}>
                              <td className="leaderboard-td ps-lg-5 align-middle text-center">
                                <div className="d-flex align-items-center h-100">
                                  <img
                                    className="img-fluid rounded-circle supervisor-avatar"
                                    src={emp?.userImage}
                                    alt={emp?.firstName}
                                  />
                                  <div className="d-flex flex-column px-3">
                                    <span className="text-start">
                                      {emp.empId}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="leaderboard-td align-middle text-center">
                                {emp.firstName} {emp.lastName}
                              </td>
                              <td className="leaderboard-td align-middle text-center">
                                {emp.totalScore?.toFixed(2)}
                              </td>
                              <td className="leaderboard-td align-middle text-center">
                                {emp.averageScore?.toFixed(2)}
                              </td>
                              <td className="leaderboard-td align-middle text-center">
                                {emp.rank}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <div
            className="shadow text-center bg-dark text-light"
            width="90px"
            height="90px"
            style={{ margin: "15%", padding: "20px" }}
          >
            <h4>
              NETS requires a minimum of 2 competitors to activate the
              leaderboard feature.
            </h4>
          </div>
        )}
      </>
    );
  };

  return loading ? (
    <center>
      <div className="spinner-grow mt-3" role="status"></div>
    </center>
  ) : (
    <div>
      {score?.length > 0 ? (
        <div className="container-md bg-light my-lg-3 p-md-4">
          {/* Top gainers section */}
          <div className="d-flex justify-content-between  flex-sm-row flex-column">
            {score[index]?.leaderboard?.length > 0 && (
              <h2 className="top-gainers">Top Gainers</h2>
            )}

            <select
              onChange={(e) => setIndex(e.target.value)}
              className="form-select mt-2 mx-3 leaderboard-department-select"
            >
              {score?.map((item, index) => (
                <option key={index} value={index}>
                  {item?.department}
                </option>
              ))}
            </select>
          </div>
          <div> {departmentLeaderboard(index)}</div>
        </div>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>
            NETS requires a minimum of 2 competitors to activate the leaderboard
            feature.
          </h4>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSup;
