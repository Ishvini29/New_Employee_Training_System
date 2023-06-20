import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const EditEntry = (props) => {
  const { id } = useParams();
  const [modal, setModal] = useState(null);

  const [updatedTodo, setUpdatedTodo] = useState({
    quizName: "",
    quizDesc: "",
    timeLimit: 0, // Set the default value to 0
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+`/units/${id}`)
      .then((response) => {
        const { quizName, quizDesc, timeLimit } = response.data.quiz;
        setUpdatedTodo({ quizName, quizDesc, timeLimit });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onChange = (e) => {
    setUpdatedTodo({
      ...updatedTodo,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_BASE+`/units/quizentry/update/${id}`, updatedTodo)
      .then(() => {
        setModal(null);
        swal({
          icon: "success",
          text: "Successfully updated",
        }).then(() => {
          window.location.reload(); // Refresh the page
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          icon: "warning",
          text: "Error",
        });
      });
  };

  return (
    <div>
      <p>
        <FaPencilAlt
          className="editIcon"
          type="button"
          class="rounded float-end"
          style={{ color: "blue" }}
          data-bs-toggle="modal"
          data-bs-target={`#edit-modal-${id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`edit-modal-${id}`}
        tabIndex="-1"
        aria-labelledby="edit-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-modal-label">
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdate}>
                <div className="mb-3">
                  <label htmlFor="quizName" className="form-label">
                    Quiz Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizName"
                    name="quizName"
                    value={updatedTodo.quizName}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quizDesc" className="form-label">
                    Quiz Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizDesc"
                    name="quizDesc"
                    value={updatedTodo.quizDesc}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="timeLimit" className="form-label">
                    Time Duration in minutes
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="timeLimit"
                    name="timeLimit"
                    value={updatedTodo.timeLimit}
                    onChange={onChange}
                  />
                </div>
                <div class="modal-footer">
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
