import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import swal from "sweetalert";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

const validationSchema = Yup.object().shape({
  unitName: Yup.string().required("Unit Name is required"),
  unitDesc: Yup.string().required("Unit Introduction is required"),
});

const Edit = ({ unit }) => {
  const { chapterName } = useParams();
  const [modal, setModal] = useState(null);
  const [updatedunit, setUpdatedunit] = useState(unit);
  const [errors, setErrors] = useState({});
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  const onChange = (e) => {
    setUpdatedunit({
      ...updatedunit,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    validationSchema
      .validate(updatedunit, { abortEarly: false })
      .then(() => {
        axios
          .post(process.env.REACT_APP_API_BASE+`/units/update/${unit._id}`, updatedunit)
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

        const editData = {
          chapterName: chapterName,
          updatedby: userDocument._id,
          unitName: updatedunit.unitName,
          unitId: unit._id,
          unitDesc: updatedunit.unitDesc,
          old_data: {
            unitName: unit.unitName,
            unitDesc: unit.unitDesc,
          },
        };

        axios
          .post(process.env.REACT_APP_API_BASE+"/editunits/add", editData)
          .then(() => {
            console.log("Edit history data saved successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
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
          data-bs-target={`#edit-modal-${unit._id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`edit-modal-${unit._id}`}
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
                  <label htmlFor="unitName" className="form-label">
                    Unit Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.unitName && "is-invalid"
                    }`}
                    id="unitName"
                    name="unitName"
                    value={updatedunit.unitName}
                    onChange={onChange}
                  />
                  {errors.unitName && (
                    <div className="invalid-feedback">{errors.unitName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="unitDesc" className="form-label">
                    Unit Introduction
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.unitDesc && "is-invalid"
                    }`}
                    id="unitDesc"
                    name="unitDesc"
                    value={updatedunit.unitDesc}
                    onChange={onChange}
                  />
                  {errors.unitDesc && (
                    <div className="invalid-feedback">{errors.unitDesc}</div>
                  )}
                </div>
                <div class="modal-footer">
                  <input
                    type="submit"
                    value="Update Unit"
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

export default Edit;
