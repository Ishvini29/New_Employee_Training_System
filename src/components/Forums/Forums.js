import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Shared/Header";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Forums = () => {
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  const [forumTopics, setForumTopics] = useState([]);
  const { chapterID, chapterName } = useParams();
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE + `/get-forums-by-chapter/${chapterID}`
      )
      .then((response) => {
        setForumTopics(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const LockForum = (id) => {
    axios
      .put(process.env.REACT_APP_API_BASE + `/edit-forum/${id}`, {
        status: "Locked",
      })
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Do you want to lock this forum?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("Forum has been locked!", {
              icon: "success",
            }).then(() => {
              window.location.reload(); // Refresh the page
            });
            console.log("Submitted form data:", id);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Opzz!",
          text: "Something went wrong, Please try again!",
          icon: "warning",
        });
      });

    return false;
  };

  return (
    <div className="container my-5">
      <h4 className="heading p-3 rounded">
        {chapterName + ": Discussion Forums"}
      </h4>
      <nav className="navbar navbar-expand-lg">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-5 mb-lg-0">
            <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link
                to={"/chapterPage/" + chapterID + "/" + chapterName}
                className="nav-link active"
              >
                Units
              </Link>
            </li>
            <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link
                to={"/article/" + chapterID + "/" + chapterName}
                className="nav-link"
              >
                Articles
              </Link>
            </li>
            <li className="nav-item" style={{ fontWeight: "bold" }}>
              <Link
                to={"/forums/" + chapterID + "/" + chapterName}
                className="nav-link"
              >
                Discussion Forums
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* <Header title="NETS: Discussion Forums" /> */}
      {(userDocument.userRole === "Content Creator" ||
        userDocument.userRole === "Supervisor") && (
        <div className="text-center mt-5">
          <Link to={"/create-forum/" + chapterID + "/" + chapterName}>
            <button type="button" className="btn btn-outline-success">
              Create New Discussion Forum Topic
            </button>
          </Link>
        </div>
      )}

      <div className="mt-5">
        <div
          className="row py-4 text-center d-none d-sm-flex rounded fw-bold"
          style={{ backgroundColor: "#D3D3D3" }}
        >
          <div className="col-sm-3">Forum Topic</div>
          <div className="col-sm-3">Created by</div>
          <div className="col-sm-2">Number of posts</div>
          {(userDocument.userRole === "Content Creator" ||
            userDocument.userRole === "Supervisor") && (
            <div className="col-sm-4">Actions</div>
          )}
        </div>
        {forumTopics?.map((f) => (
          <div
            key={f?._id}
            className="row mt-3 py-4 text-center rounded"
            style={{
              backgroundColor: f?.status === "Active" ? "#ADD8E6" : "#D3D3D3",
            }}
          >
            <div className="col-sm-3">
              {" "}
              <Link
                to={`/view-forum/${f?._id}`}
                className="text-decoration-none"
                style={{ color: "black" }}
              >
                {f?.topic}{" "}
              </Link>
            </div>

            <div className="col-sm-3">
              {f?.createdBy.firstName + " " + f?.createdBy.lastName}{" "}
            </div>
            <div className="col-sm-2">{f.posts.length}</div>

            {f?.status === "Active"
              ? (userDocument.userRole === "Content Creator" ||
                  userDocument.userRole === "Supervisor") && (
                  <div
                    className="d-flex flex-row mx-auto col-sm-4"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link
                      to={`/edit-forum/${f?._id}/${chapterID}/${chapterName}`}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary mx-2"
                        style={{ borderColor: "#1D9EEC" }}
                      >
                        Edit
                      </button>
                    </Link>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => LockForum(f?._id)}
                      >
                        Lock
                      </button>
                    </div>
                  </div>
                )
              : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forums;
