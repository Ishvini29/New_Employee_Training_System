import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Header from "../Shared/Header";
import Comment from "../Comments/Comment";
import axios from "axios";

const ViewForum = () => {
  const params = useParams();
  const [forum, setForum] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [selectedComment, setSelectedComment] = useState(0);
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE+`/get-forum-details-by-forum-id/${params.forumId}`
      )
      .then((response) => {
        setForum(response.data);
        setStatus(response.data[0].status);
        setTopic(response.data[0].topic);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(forum);
  }, []);

  function formatDate(dateString) {
    const date = new Date(Date.parse(dateString));
    const now = new Date();
    const diffMs = now - date;

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <div className="container mt-3">
      <div className="pt-5 px-4">
        <Header title={"NETS: " + topic} />
      </div>
      <div className="text-center mt-5">
        {status === "Active" ? (
          <Link to={`/create-post/${params?.forumId}`}>
            <button type="button" className="btn btn-outline-success">
              Add Post
            </button>
          </Link>
        ) : null}
      </div>

      <div className="col-md-12">
        {forum?.map((f) => (
          <div
            className="bg-white"
            style={{
              display: "block",
              borderRadius: "11px",
              boxShadow: "black",
              marginTop: "2%",
              marginBottom: "2%",
              maxWidth: "1000px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {f?.posts.length === 0 ? (
              <h3 className="text-center my-5">No Posts yet</h3>
            ) : (
              f?.posts.map((p) => (
                <>
                  <Comment
                    id={p?._id}
                    user={p?.createdBy?.firstName + " " + p?.createdBy?.lastName}
                    role={p?.createdBy?.userRole}
                    time={formatDate(p?.createdOn)}
                    message={p?.description}
                  />
                  {p.attachment && (
                    <Link
                      to={`/view-forum/${params?.forumId}/${p?._id}`}
                      className="text-decoration-none text-secondary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        width={50}
                        height={50}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </Link>
                  )}
                  <div className="d-flex justify-content-between p-3">
                    <span
                      style={{ cursor: "pointer", color: "#1D9EEC" }}
                      onClick={() => {
                        setShowReplies(!showReplies);
                        setSelectedComment(p?._id);
                      }}
                    >
                      {showReplies ? (
                        selectedComment === p?._id ? (
                          p?.replies?.length === 0 ? null : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-caret-up-fill mx-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg>
                          )
                        ) : p?.replies?.length === 0 ? null : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-caret-down-fill mx-2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                          </svg>
                        )
                      ) : p?.replies?.length === 0 ? null : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-caret-down-fill mx-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>
                      )}
                      {p?.replies?.length === 0
                        ? "No replies yet"
                        : p?.replies?.length + " replies"}
                    </span>

                    <div className="d-flex align-items-center border-left px-3">
                      {status === "Active" ? (
                        <Link
                          to={`/add-reply/${params?.forumId}/${p?._id}`}
                          className="text-decoration-none"
                        >
                          <i className="fa fa-comment"></i>
                          <span
                            className="ml-2"
                            style={{
                              cursor: "pointer",
                              color: "#1D9EEC",
                            }}
                          >
                            Reply
                          </span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  {showReplies
                    ? selectedComment === p?._id
                      ? p?.replies.map((r) => (
                          <div className="p-2" style={{ marginLeft: "20px" }}>
                            <Comment
                              id={r?._id}
                              user={
                                r?.createdBy?.firstName +
                                " " +
                                r.createdBy.lastName
                              }
                              role={r?.createdBy?.userRole}
                              time={formatDate(r?.createdOn)}
                              message={r?.description}
                            />
                            {r?.attachment && (
                              <Link
                                to={`/view-forum/${params.forumId}/${p?._id}/${r?._id}`}
                                className="text-decoration-none text-secondary"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  width={50}
                                  height={50}
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                  />
                                </svg>
                              </Link>
                            )}
                          </div>
                        ))
                      : null
                    : null}
                </>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewForum;
