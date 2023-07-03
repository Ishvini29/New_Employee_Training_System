import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "../Shared/Header";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const CreateForum = () => {
  const navigate = useNavigate();

  const { chapterID, chapterName } = useParams();
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  const formSchema = Yup.object().shape({
    topic: Yup.string().required("* topic is required"),
    description: Yup.string().required("* description is required"),
    attachmentAllowed: Yup.string().required(
      "* please select one of these options"
    ),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(validationOpt);
  const { errors } = formState;

  const onFormSubmit = (formData) => {
    const data = {
      ...formData,
      createdBy: userDocument?._id,
      belongsToChapter: chapterID,
    };
    console.log(data);

    axios
      .post(process.env.REACT_APP_API_BASE + "/create-forum", data)
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Thank you!",
          text: "You have successfully created a new Discussion Forum Topic!",
          icon: "success",
          button: "Close",
        }).then(() => {
          navigate("/forums/" + chapterID + "/" + chapterName);
        });
        reset();
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Opzz!",
          text: "Something went wrong, Please try again!",
          icon: "warning",
        });
      });
    console.log("Submitted form data:", data);

    return false;
  };

  return (
    <div className="container my-5">
        <Header title="Create Discussion Forums" />
      <div className="p-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group mt-2">
            <label for="topic" className="font-weight-bold">
              Discussion Forum Topic:
            </label>
            <div className="col-sm-8 mt-2">
              <input
                type="text"
                className="form-control"
                style={{
                  backgroundColor: "#F8F8F8",
                  borderColor: "#1D9EEC",
                }}
                id="topic"
                name="topic"
                {...register("topic")}
              />
            </div>
            <p className="font-italic" style={{ color: "#E60000" }}>
              {errors.topic?.message}
            </p>
          </div>
          <div className="form-group mt-4">
            <label for="description" className="font-weight-bold">
              Description:
            </label>
            <div className="col-sm-8 mt-2">
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
            <p className="font-italic" style={{ color: "#E60000" }}>
              {errors.description?.message}
            </p>
          </div>
          <div className="form-group mt-4">
            <label for="attachmentAllowed" className="font-weight-bold">
              Attachments Allowed:
            </label>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                style={{
                  borderColor: "#1D9EEC",
                }}
                type="radio"
                name="attachmentAllowed"
                id="attachmentAllowed"
                value="yes"
                {...register("attachmentAllowed")}
              />
              <label className="form-check-label" for="yes">
                Yes
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                style={{
                  borderColor: "#1D9EEC",
                }}
                type="radio"
                name="attachmentAllowed"
                id="attachmentNotAllowed"
                value="no"
                {...register("attachmentAllowed")}
              />
              <label className="form-check-label" for="no">
                No
              </label>
            </div>
            <p className="font-italic" style={{ color: "#E60000" }}>
              {errors.attachmentAllowed?.message}
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
            >
              Create
            </button>
            <Link to={"/forums/" + chapterID + "/" + chapterName}>
              <button
                type="button"
                className="btn btn-primary mt-5 mx-3"
                style={{
                  backgroundColor: "#778899",
                  borderColor: "#778899",
                }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForum;
