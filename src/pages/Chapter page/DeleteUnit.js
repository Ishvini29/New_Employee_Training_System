import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

const Delete = ({ unit }) => {
  const navigate = useNavigate();
  const { chapterName } = useParams();
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  const onDelete = () => {
    axios
      .delete(process.env.REACT_APP_API_BASE+`/units/delete/${unit._id}`)
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

    const deleteData = {
      chapterName: chapterName,
      unitId: unit._id,
      unitName: unit.unitName,
      unitDesc: unit.unitDesc,
      createdBy: unit.createdBy,
      deletedBy: userDocument._id,
    };

    axios
      .post(process.env.REACT_APP_API_BASE+"/deleteunits/add", deleteData)
      .then(() => {
        console.log("Delete history data saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/chapterPage");
  };

  return (
    <div>
      <p>
        <FaTimes
          className="delIcon"
          class="rounded float-end"
          type="button"
          style={{ color: "red" }}
          data-bs-toggle="modal"
          data-bs-target={`#delete-modal-${unit._id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`delete-modal-${unit._id}`}
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
              Are you sure you want to delete this?
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
                className="btn btn-danger"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
