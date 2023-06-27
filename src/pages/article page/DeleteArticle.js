import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import swal from "sweetalert";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../Firebase config/firebase";
import jwt_decode from "jwt-decode";

const Delete = ({ article }) => {
  const navigate = useNavigate();
  const { chapterName } = useParams();
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  const onDelete = () => {
    // Delete the video file from Firebase Storage
    const articleRef = ref(storage, article.articleUrl);
    deleteObject(articleRef)
      .then(() => {
        // Once the video file is deleted, delete the KT session from the backend
        axios
          .delete(process.env.REACT_APP_API_BASE+`/arts/delete/${article._id}`)
          .then((res) => {
            console.log(res.data);
            swal({
              icon: "success",
              text: "Successfully deleted",
            }).then(() => {
              window.location.reload(); // Refresh the page
            });
          })
          .catch((error) => {
            console.log(error);
            swal({
              icon: "warning",
              text: "Error",
            });
          });
      })
      .catch((error) => {
        console.log("Error deleting Article:", error);
        swal({
          icon: "warning",
          text: "Error",
        });
      });
    const deleteData = {
      chapterName: chapterName,
      createdBy: article.createdBy,
      deletedBy: userDocument._id,
      articleName: article.articleName,
      articleDesc: article.articleDesc,
      old_data: {
        articleName: article.articleName,
        articleDesc: article.articleDesc,
      },
    };

    axios
      .post(process.env.REACT_APP_API_BASE+"/deletearticles/add", deleteData)
      .then(() => {
        console.log("Delete history data saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    (["Supervisor", "Content Creator", "System Admin"].includes(userDocument?.userRole))
    ?
    <div>
      <p>
        <FaTimes
          className="delIcon"
          class="rounded float-end"
          type="button"
          style={{ color: "red" }}
          data-bs-toggle="modal"
          data-bs-target={`#delete-modal-${article._id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`delete-modal-${article._id}`}
        tabIndex="-1"
        aria-labelledby="delete-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    :null
  );
};

export default Delete;
