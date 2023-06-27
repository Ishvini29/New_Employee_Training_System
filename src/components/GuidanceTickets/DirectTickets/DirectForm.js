import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const DirectForm = (props) => {
  const formSchema = Yup.object().shape({
    assignedTo: Yup.string().required("* please select one of these employees"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(validationOpt);
  const { errors } = formState;
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/getContentCreators/${props?.ticket?.directedDepartmentID}`
      )
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container bg-white">
      <form onSubmit={handleSubmit(props?.onFormSubmit)}>
        <div className="row">
          <p className="col-sm-6">Request No. {props?.ticket?._id}</p>
          <p className="col-sm-6">
            {" "}
            Request Type : {props?.ticket?.requestType}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-12">
            Request Title : {props?.ticket?.requestTitle}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-12">
            Short Description : {props?.ticket?.description}
          </p>
        </div>

        <div className="row">
          <p className="col-sm-12">
            Requested by :{" "}
            {props?.ticket?.requestedBy?.firstName +
              " " +
              props?.ticket?.requestedBy?.lastName}{" "}
          </p>
        </div>
        <div className="row">
          <p className="col-sm-12">Employees that can give guidance : </p>
        </div>
        {employees?.map((emp) => (
          <div className="form-check">
            <input
              className="form-check-input"
              style={{
                borderColor: "#1D9EEC",
              }}
              type="radio"
              name="assignedTo"
              id={emp?._id}
              value={emp?._id}
              {...register("assignedTo")}
            />
            <label className="form-check-label" for="assignedTo">
              {emp?.firstName + " " + emp?.lastName}
            </label>
          </div>
        ))}
        <p className="font-italic" style={{ color: "#E60000" }}>
          {errors.assignedTo?.message}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="btn btn-primary mt-4 mb-3"
            style={{
              backgroundColor: "#1D9EEC",
              borderColor: "#1D9EEC",
            }}
            onClick={() => props?.setTicketId(props?.ticket?._id)}
          >
            Direct
          </button>
        </div>
      </form>
    </div>
  );
};

export default DirectForm;
