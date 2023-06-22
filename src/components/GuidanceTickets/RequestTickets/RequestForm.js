import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const RequestForm = (props) => {
  const formSchema = Yup.object().shape({
    directedDepartmentID: Yup.string().required(
      "* directed department is required"
    ),
    requestType: Yup.string().required("* request type is required"),
    requestTitle: Yup.string().required("* request title is required"),
    description: Yup.string().required("* description is required"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(validationOpt);
  const { errors } = formState;

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/departments/showAllDepartments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container bg-white">
      <form onSubmit={handleSubmit(props.onFormSubmit)}>
        <div className="form-group row">
          <label for="directedDepartmentID" className="col-sm-2 col-form-label">
            <small>Related Department:</small>
          </label>
          <div className="col-sm-10 mt-2">
            <select
              className="form-control"
              style={{
                backgroundColor: "#F8F8F8",
                borderColor: "#1D9EEC",
              }}
              id="directedDepartmentID"
              name="directedDepartmentID"
              {...register("directedDepartmentID")}
            >
              <option value="">
                Select the related department for the request
              </option>
              {departments.map((d) => (
                <option value={d._id}>{d.depName}</option>
              ))}
            </select>
          </div>
          <p className="text-center font-italic" style={{ color: "#E60000" }}>
            {errors.directedDepartmentID?.message}
          </p>
        </div>
        <div className="form-group row">
          <label for="requestType" className="col-sm-2 col-form-label">
            <small>Request Type:</small>
          </label>
          <div className="col-sm-10 mt-2">
            <select
              className="form-control"
              style={{
                backgroundColor: "#F8F8F8",
                borderColor: "#1D9EEC",
              }}
              id="requestType"
              name="requestType"
              {...register("requestType")}
            >
              <option value="">Select the request type</option>
              <option value="Final project assistance">
                Final project assistance
              </option>
              <option value="Assistance to solve an error">
                Assistance to solve an error
              </option>
              <option value="Additional training">Additional training</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <p className="text-center font-italic" style={{ color: "#E60000" }}>
            {errors.requestType?.message}
          </p>
        </div>
        <div className="form-group row">
          <label for="requestTitle" className="col-sm-2 col-form-label">
            <small>Request Tiltle:</small>
          </label>
          <div className="col-sm-10 mt-2">
            <input
              type="text"
              className="form-control"
              style={{
                backgroundColor: "#F8F8F8",
                borderColor: "#1D9EEC",
              }}
              id="requestTitle"
              name="requestTitle"
              {...register("requestTitle")}
            />
          </div>
          <p className="text-center font-italic" style={{ color: "#E60000" }}>
            {errors.requestTitle?.message}
          </p>
        </div>
        <div className="form-group row mt-4">
          <label for="description" className="col-sm-2 col-form-label">
            <small>Short Description:</small>
          </label>
          <div className="col-sm-10 mt-2">
            <textarea
              rows="5"
              className="form-control"
              style={{
                backgroundColor: "#F8F8F8",
                borderColor: "#1D9EEC",
              }}
              id="description"
              name="description"
              {...register("description")}
            ></textarea>
          </div>
          <p className="text-center font-italic" style={{ color: "#E60000" }}>
            {errors.description?.message}
          </p>
        </div>
        <div className="form-group row mt-4">
          <label for="attachment" className="col-sm-3 col-form-label">
            <small>Attachment:</small>
          </label>
          <div className="col-sm-9 form-group">
            <input
              type="file"
              accept=".pdf,.jpg,.png,.jpeg"
              className="form-control-file mt-2"
              id="attachment"
              name="attachment"
              onChange={(event) => {
                props.setAttachment(event.target.files[0]);
              }}
            />
            <p className="font-italic">
              allowed file types: .pdf,.jpg,.png,.jpeg
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary mt-5 "
              style={{
                backgroundColor: "#1D9EEC",
                borderColor: "#1D9EEC",
              }}
              disabled={props.uploading}
            >
              {props.uploading ? "Uploading..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
