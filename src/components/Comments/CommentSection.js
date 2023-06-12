import React, { useState, useEffect } from "react";
import Ratings from "../Ratings/Ratings";
import AddComments from "./AddComments";
import Comment from "./Comment";
import axios from "axios";

const CommentSection = () => {
  const [showComments, setShowComments] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [addReplies, setAddReplies] = useState(false);
  const [selectedComment, setSelectedComment] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/get-kt-comments-by-kt-id/641d6c69bd434511a89d27dd`
      )
      .then((response) => {
        setComments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    } else {
      return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    }
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-12">
          <div
            className="bg-white"
            style={{
              display: "block",
              borderRadius: "11px",
              boxShadow: "black",
              marginTop: "5%",
              marginBottom: "5%",
              maxWidth: "1000px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "50px",
            }}
          >
            <Ratings />
            <AddComments type="comment" />
            <div className="d-flex justify-content-between p-3">
              <span style={{ color: "#7D7575" }}>
                {comments.length} comments
              </span>
              <div className="d-flex align-items-center border-left px-3">
                <i className="fa fa-comment"></i>
                <span
                  className="ml-2"
                  style={{
                    cursor: "pointer",
                    color: "#1D9EEC",
                  }}
                  onClick={() => {
                    setAddReplies(false);
                    setShowReplies(false);
                    setShowComments(!showComments);
                  }}
                >
                  {showComments ? (
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
                  ) : (
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
                  {showComments ? "Hide Comments" : "Show Comments"}
                </span>
              </div>
            </div>
            {showComments
              ? comments.map((c) => (
                  <>
                    <Comment
                      id={c._id}
                      user={c.addedBy.firstName + " " + c.addedBy.lastName}
                      role={"Employee"}
                      time={formatDate(c.commentedOn)}
                      message={c.comment}
                    />
                    {addReplies ? (
                      selectedComment === c._id ? (
                        <div className="mb-5">
                          <AddComments
                            type="reply"
                            selectedComment={selectedComment}
                          />
                        </div>
                      ) : null
                    ) : null}

                    <div className="d-flex justify-content-between p-3">
                      <span
                        style={{ cursor: "pointer", color: "#1D9EEC" }}
                        onClick={() => {
                          setAddReplies(false);
                          setShowReplies(!showReplies);
                          setSelectedComment(c._id);
                        }}
                      >
                        {showReplies ? (
                          selectedComment === c._id ? (
                            c.replies.length === 0 ? null : (
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
                          ) : c.replies.length === 0 ? null : (
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
                        ) : c.replies.length === 0 ? null : (
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
                        {c.replies.length === 0
                          ? "No replies yet"
                          : c.replies.length + " replies"}
                      </span>
                      <div className="d-flex align-items-center border-left px-3">
                        <i className="fa fa-comment"></i>
                        <span
                          className="ml-2"
                          style={{
                            cursor: "pointer",
                            color: addReplies
                              ? selectedComment === c._id
                                ? "#DC3545"
                                : "#1D9EEC"
                              : "#1D9EEC",
                          }}
                          onClick={() => {
                            setShowReplies(false);
                            setAddReplies(!addReplies);
                            setSelectedComment(c._id);
                          }}
                        >
                          {addReplies
                            ? selectedComment === c._id
                              ? "Close"
                              : "Reply"
                            : "Reply"}
                        </span>
                      </div>
                    </div>
                    {showReplies
                      ? selectedComment === c._id
                        ? c.replies.map((r) => (
                            <div className="p-2" style={{ marginLeft: "20px" }}>
                              <Comment
                                id={r._id}
                                user={
                                  r.addedBy.firstName + " " + r.addedBy.lastName
                                }
                                role={"Employee"}
                                time={formatDate(r.repliedOn)}
                                message={r.reply}
                              />
                            </div>
                          ))
                        : null
                      : null}
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
