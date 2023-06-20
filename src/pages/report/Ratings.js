import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const RatingsReport = () => {
  const localhostEmpId = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?.empId;

  const location = useLocation();
  const propsData = location.state;
  // states for storing fetched data
  const [ktSessionRating, setKtSessionRating] = useState({});
  const [articleRating, setArticleRating] = useState({});

  useEffect(() => {
    let empId = propsData?.empId || localhostEmpId;
    axios
      .get(process.env.REACT_APP_API_BASE+"/ktsessionRatingsReport/" + empId)
      .then((res) => setKtSessionRating(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          return (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{error.response.data.error}</h4>
            </div>
          );
        } else {
          // Handle other errors
          return (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{error.message}</h4>
            </div>
          );
        }
      });
    axios
      .get(process.env.REACT_APP_API_BASE+"/articleRatingsReport/" + empId)
      .then((res) => setArticleRating(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          return (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{error.response.data.error}</h4>
            </div>
          );
        } else {
          // Handle other errors
          return (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{error.message}</h4>
            </div>
          );
        }
      });
  }, []);
  return (
    <>
      {Object.keys(ktSessionRating).length !== 0 ||
      Object.keys(articleRating).length !== 0 ? (
        <>
          <div className=" row mt-3 ps-5 mx-auto justify-content-between">
            <div className="col col-12 col-lg-6 d-flex ">
              <img
                className="img-fluid rounded-circle leaderboard-avatar"
                src={
                  articleRating?.userData?.userImage ||
                  ktSessionRating?.userData?.userImage
                }
                alt={
                  articleRating?.userData?.empName ||
                  ktSessionRating?.userData?.empName
                }
              />
              <div className="d-flex flex-column ps-4">
                <h2 className="text-dark">
                  {articleRating?.userData?.empName ||
                    ktSessionRating?.userData?.empName}
                </h2>
                <h5 className="text-secondary">
                  {articleRating?.userData?.empId ||
                    ktSessionRating?.userData?.empId}
                </h5>
              </div>
            </div>
          </div>
          {/* before ratingsRepRatingsReport */}
          <div className="ratingsRepRatingsReport-grid ">
            {Object.keys(ktSessionRating).length !== 0 && (
              <div className=" specific-chapter rounded d-flex flex-column align-items-center bg-light m-lg-5 my-5 shadow">
                <div className="rounded d-flex justify-content-around w-100 text-light py-4 mb-3 fw-semibold fs-4 bg-secondary">
                  <span className=" mt-1">
                    {ktSessionRating?.numOfKtSessions < 10
                      ? "0" + ktSessionRating?.numOfKtSessions
                      : ktSessionRating?.numOfKtSessions}{" "}
                    KT sessions
                  </span>
                  <span>
                    <div className="rating">
                      <div
                        className="rating-upper"
                        style={{
                          width: `${(ktSessionRating?.finalOverAllRating / 5) *
                            100}%`,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        ))}
                      </div>
                      <div className="rating-lower">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="ps-2">
                      {ktSessionRating?.finalOverAllRating}
                    </span>
                  </span>
                </div>
                {/*KT sessions    */}
                <div className="specific-chapter w-75 mb-4">
                  <div
                    id="ktSessions"
                    className="carousel carousel-dark slide "
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {[
                        ktSessionRating?.finaOverAllQuality,
                        ktSessionRating?.finalOverAllComm,
                        ktSessionRating?.finaOverAllClarity,
                        ktSessionRating?.finalOverAllKnowledgeAndSkill,
                      ].map((ratingCriteria, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#ktSessions"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {[
                        ktSessionRating?.finalOverAllQuality,
                        ktSessionRating?.finalOverAllComm,
                        ktSessionRating?.finalOverAllClarity,
                        ktSessionRating?.finalOverAllKnowledgeAndSkill,
                      ].map((ratingCriteria, index) => {
                        const selectedRatingData =
                          index === 0
                            ? ktSessionRating?.ratingData?.[0]
                            : index === 1
                            ? ktSessionRating?.ratingData?.[1]
                            : index === 2
                            ? ktSessionRating?.ratingData?.[2]
                            : index === 3
                            ? ktSessionRating?.ratingData?.[3]
                            : [];
                        return (
                          <div
                            key={index}
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                            data-bs-interval={index === 0 ? "10000" : "2000"}
                          >
                            <div className="rating-type ">
                              <h5 className="mt-3">
                                {index === 0
                                  ? "Quality Rate"
                                  : index === 1
                                  ? "Communication Rate"
                                  : index === 2
                                  ? "Clarity Rate"
                                  : "Knowledge and Skill Rate"}
                              </h5>
                              <div className="d-flex">
                                <div className=" w-50 mt-5">
                                  <div className="progress-bar-rate">
                                    <span className="fw-bold me-1">
                                      {ratingCriteria}
                                    </span>
                                    <FaStar color="orange" className="mt-1" />
                                  </div>
                                </div>
                                <div className="d-flex flex-column w-100 kt-art-progress-bar">
                                  {selectedRatingData?.map((rate, indexi) => (
                                    <div
                                      key={indexi}
                                      className="d-flex flex-row w-100 my-1"
                                    >
                                      <span>{indexi + 1} star</span>
                                      <span className="progress w-50 mx-2">
                                        <span
                                          className="progress-bar"
                                          style={{ width: `${rate}%` }}
                                          role="progressbar"
                                        ></span>
                                      </span>
                                      <span>{rate + "%"}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="carousel-control-prev "
                      type="button"
                      data-bs-target="#ktSessions"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#ktSessions"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className=" pt-4 w-100 d-flex justify-content-around fw-semibold">
                  <span> Session Name</span>
                  <span>Rating</span>
                </div>
                {ktSessionRating?.sessionData?.map((session, index) => (
                  <div
                    key={index}
                    className=" specific-chapter w-75 kt-article-data shadow"
                  >
                    <span>{session?.sessionName}</span>
                    <span>{session?.overallRating}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Articles */}
            {Object.keys(articleRating).length !== 0 && (
              <div className="specific-chapter rounded d-flex flex-column align-items-center bg-light m-lg-5 shadow">
                <div className="rounded d-flex justify-content-around w-100 text-light py-4 mb-3 fw-semibold fs-4 bg-secondary">
                  <span className=" mt-1">
                    {articleRating?.numOfArticles < 10
                      ? "0" + articleRating?.numOfArticles
                      : articleRating?.numOfArticles}{" "}
                    Articles
                  </span>
                  <span>
                    <div className="rating">
                      <div
                        className="rating-upper"
                        style={{
                          width: `${(articleRating?.finalOverAllRating / 5) *
                            100}%`,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        ))}
                      </div>
                      <div className="rating-lower">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span key={index}>
                            <FaStar />
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="ps-2">
                      {articleRating?.finalOverAllRating}
                    </span>
                  </span>
                </div>

                {/*  */}
                <div div className="specific-chapter w-75 mb-4">
                  <div
                    id="articles"
                    className="carousel carousel-dark slide "
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      {[
                        articleRating?.finaOverAllQuality,
                        articleRating?.finalOverAllComm,
                        articleRating?.finaOverAllClarity,
                        articleRating?.finalOverAllKnowledgeAndSkill,
                      ].map((ratingCriteria, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#articles"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : ""}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {[
                        articleRating?.finalOverAllQuality,
                        articleRating?.finalOverAllComm,
                        articleRating?.finalOverAllClarity,
                        articleRating?.finalOverAllKnowledgeAndSkill,
                      ].map((ratingCriteria, index) => {
                        const selectedRatingData =
                          index === 0
                            ? articleRating?.ratingData?.[0]
                            : index === 1
                            ? articleRating?.ratingData?.[1]
                            : index === 2
                            ? articleRating?.ratingData?.[2]
                            : index === 3
                            ? articleRating?.ratingData?.[3]
                            : [];
                        return (
                          <div
                            key={index}
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                            data-bs-interval={index === 0 ? "10000" : "2000"}
                          >
                            <div className="rating-type ">
                              <h5 className="mt-3">
                                {index === 0
                                  ? "Quality Rate"
                                  : index === 1
                                  ? "Communication Rate"
                                  : index === 2
                                  ? "Clarity Rate"
                                  : "Knowledge and Skill Rate"}
                              </h5>
                              <div className="d-flex">
                                <div className=" w-50 mt-5 ">
                                  <div className="d-flex ms-5 mt-3">
                                    <span className="fw-bold me-1">
                                      {ratingCriteria}
                                    </span>
                                    <FaStar color="orange" className="mt-1" />
                                  </div>
                                </div>
                                <div className="d-flex flex-column w-100">
                                  {selectedRatingData?.map((rate, indexi) => {
                                    return (
                                      <div
                                        key={indexi}
                                        className="d-flex flex-row w-100 my-1"
                                      >
                                        <span>{indexi + 1} star</span>
                                        <span className="progress w-50 mx-2">
                                          <span
                                            className="progress-bar"
                                            style={{ width: `${rate}%` }}
                                            role="progressbar"
                                          ></span>
                                        </span>
                                        <span>{rate}%</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="carousel-control-prev "
                      type="button"
                      data-bs-target="#articles"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#articles"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="pt-2 w-100 d-flex justify-content-around fw-semibold">
                  <span> Article Name</span>
                  <span>Rating</span>
                </div>
                {articleRating?.articleRatingsReportData?.map(
                  (article, index) => (
                    <div
                      key={index}
                      className="specific-chapter w-75 kt-article-data shadow"
                    >
                      <span>{article?.articleName}</span>
                      <span>{article?.overallRating}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>No KT session or article has been uploaded yet.</h4>
        </div>
      )}
    </>
  );
};

export default RatingsReport;
