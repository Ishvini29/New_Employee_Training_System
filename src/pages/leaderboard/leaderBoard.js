import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; //To decode JSON web tokens
import swal from "sweetalert"; //SweetAlert library for displaying alerts
import Swal from "sweetalert2";
import Search from "../../components/search";
import rank1 from "../../images/gold.png"; // Import images for leaderboard ranks
import rank2 from "../../images/silver.png";
import rank3 from "../../images/bronze.png";

const LeaderBoard = () => {
  const [score, setScore] = useState([]);
  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState();
  let filtering = 3;

  const currentUser = jwt_decode(
    JSON?.parse(localStorage?.getItem("user")).token
  )?.userData?._id;
  const currentUserDep = jwt_decode(
    JSON?.parse(localStorage?.getItem("user")).token
  )?.userData?.department;

  useEffect(() => {
    Swal.fire(
      `Need to know!`,
      "The leaderboard is determined based on the average score of department chapters.",
      "info"
    );
    axios
      .get(process.env.REACT_APP_API_BASE+"/getCurrentUserLeaderboardData", {
        params: { currentUser, currentUserDep },
      })
      .then((res) => setScore(res.data))
      .catch((error) => {
        // Handle errors
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

  return (
    <div>
      {score?.lbData?.length > 1 ? (
        <div className="container-md bg-light my-lg-3 p-md-4">
          {/* Top gainers section */}
          <h2 className="top-gainers">Top Gainers</h2>
          <div className="row m-0 justify-content-center gy-3">
            {/* Top gainer 1 */}
            <div className="col col-12 col-md-12 col-lg-3">
              <div className="card leaderboard-card text-center">
                {/* Top gainer 1 total score in the header */}
                <div className={`card-header leaderboard-header `}>
                  <h2 className="w-100">
                    {score?.lbData?.[0]?.totalScore.toFixed(2)}
                  </h2>
                </div>
                {/* Top gainer 1 avatar */}
                <div className="leaderboard-avatar-wrapper">
                  <img
                    src={score?.lbData?.[0]?.userImage}
                    alt={score?.lbData?.[0]?.firstName}
                    className="img-fluid rounded-circle leaderboard-avatar"
                  />
                </div>
                {/* Top gainer 1 body */}
                <div className="card-body">
                  <h5 className="card-title leaderboard-title">
                    {score?.lbData?.[0]?.firstName}{" "}
                    {score?.lbData?.[0]?.lastName}
                  </h5>
                  <hr />
                  {/* Top gainer 1 employee ID and average score  */}
                  <div className="d-flex justify-content-around fw-semibold">
                    <span className="card-title leaderboard-desc">
                      {score?.lbData?.[0]?.empId}
                    </span>
                    <span className="card-title leaderboard-desc">
                      {score?.lbData?.[0]?.averageScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-6 col-lg-3">
              <div className="card leaderboard-card text-center">
                <div className={`card-header leaderboard-header`}>
                  <h2 className="w-100">
                    {score?.lbData?.[1]?.totalScore.toFixed(2)}
                  </h2>
                </div>
                <div className="leaderboard-avatar-wrapper">
                  <img
                    className="img-fluid rounded-circle leaderboard-avatar"
                    src={score?.lbData?.[1]?.userImage}
                    alt={score?.lbData?.[1]?.firstName}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title leaderboard-title">
                    {score?.lbData?.[1]?.firstName}{" "}
                    {score?.lbData?.[1]?.lastName}
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-around fw-semibold">
                    <span className="card-title leaderboard-desc">
                      {score?.lbData?.[1]?.empId}
                    </span>
                    <span className="card-title leaderboard-desc">
                      {score?.lbData?.[1]?.averageScore.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {score?.lbData?.length > 2 ? (
              <div className="col col-12 col-md-6 col-lg-3">
                <div className="card leaderboard-card text-center">
                  <div className={`card-header leaderboard-header `}>
                    <h2 className="w-100">
                      {score?.lbData?.[2]?.totalScore.toFixed(2)}
                    </h2>
                  </div>
                  <div className="leaderboard-avatar-wrapper">
                    <img
                      className="img-fluid rounded-circle leaderboard-avatar"
                      src={score?.lbData?.[2]?.userImage}
                      alt={score?.lbData?.[2]?.firstName}
                    />{" "}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title leaderboard-title">
                      {score?.lbData?.[2]?.firstName}{" "}
                      {score?.lbData?.[2]?.lastName}
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-around fw-semibold">
                      <span className="card-title leaderboard-desc">
                        {score?.lbData?.[2]?.empId}
                      </span>
                      <span className="card-title leaderboard-desc">
                        {score?.lbData?.[2]?.averageScore.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Only show the badge for the employees who are below the rank 4 */}
          <div className="d-flex justify-content-center mt-5">
            {score?.currentUserRank < 4 && (
              <img
                src={
                  score?.currentUserRank === 1
                    ? rank1
                    : score?.currentUserRank === 2
                    ? rank2
                    : score?.currentUserRank === 3
                    ? rank3
                    : ""
                }
                className=" rank-badge mt-6 ms-5"
                alt="rank above 3"
                draggable="false"
              />
            )}
            {/* if the current User is rank 1 system will not display this beat message */}
            {score?.lbData?.[0]?.averageScore !==
              score?.currentUserAvgScore && (
              <div className=" d-flex justify-content-center ">
                <div className="score-alert alert alert-info ms-5" role="alert">
                  You Need
                  <span className="text-primary fw-bold">
                    {" "}
                    {(
                      score?.lbData?.[0]?.averageScore -
                      score?.currentUserAvgScore
                    ).toFixed(2)}{" "}
                  </span>
                  score on average to beat
                  <span className="text-primary">
                    {" "}
                    {score?.lbData?.[0]?.firstName}{" "}
                    {score?.lbData?.[0]?.lastName}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* rank after 3 */}
          {score?.lbData?.length > 3 && (
            <div className="leaderboard-table-wrapper">
              <div div className="d-flex justify-content-between my-5">
                <h4 className="top-gainers">All Employees</h4>
                <div id="" className="mt-2 float-end">
                  <Search
                    handleGetSearchValue={getSearchValue}
                    width={{ width: "w-auto" }}
                  />
                </div>
              </div>
              <table className="table leaderboard-table">
                <thead>
                  <tr className="table-head">
                    <th className="leaderboard-empId leaderboard-th">ID</th>
                    <th className="leaderboard-th align-middle text-center">
                      Name
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      Total Score
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      Average Score
                    </th>
                    <th className="leaderboard-th align-middle text-center">
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {score?.lbData
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
                    ?.map(
                      (emp, index) =>
                        index >= filtering && (
                          <tr className="leaderboard-tr" key={index}>
                            <td className="leaderboard-td align-middle text-center">
                              <div className="d-flex align-items-center h-100">
                                <img
                                  className="img-fluid rounded-circle supervisor-avatar"
                                  src={emp?.userImage}
                                  alt={emp?.firstName}
                                />
                                <div className="d-flex flex-column px-3">
                                  <span className="text-start leaderboard-table-name">
                                    {emp?.empId}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="leaderboard-td align-middle text-center">
                              {emp?.firstName} {emp?.lastName}
                            </td>
                            <td className="leaderboard-td align-middle text-center">
                              {emp?.totalScore.toFixed(2)}
                            </td>
                            <td className="leaderboard-td align-middle text-center">
                              {emp?.averageScore.toFixed(2)}
                            </td>
                            <td className="leaderboard-td align-middle text-center">
                              {emp?.rank}
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
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
          <h4>
            NETS requires a minimum of 2 competitors to activate the leaderboard
            feature.
          </h4>
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
