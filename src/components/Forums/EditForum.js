import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "../Shared/Header";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const EditForum = () => {
  const navigate = useNavigate();
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
  const { register, handleSubmit, formState } = useForm(validationOpt);
  const { errors } = formState;

  const params = useParams();
  const [forum, setForum] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/get-forum-details-by-forum-id/${params.forumId}`
      )
      .then((response) => {
        setForum(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(forum);
  }, []);

  const onFormSubmit = (formData) => {
    axios
      .put(`http://localhost:1337/edit-forum/${params.forumId}`, formData)
      .then((res) => {
        console.log(res.data);
        swal({
          title: "Thank you!",
          text: "Your changes was successfully saved!",
          icon: "success",
          button: "Close",
        }).then(() => {
          navigate("/forums");
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
    console.log("Submitted form data:", formData);

    const editData = {
      chapterName: params.chapterName,
      updatedby: userDocument._id,
      forumTopic: formData.topic,
      forumDesc: formData.description,
      attachmentStatus: formData.attachmentAllowed,
      old_data: {
        topic: forum[0].topic,
        description: forum[0].description,
        attachmentAllowed: forum[0].attachmentAllowed,
      },
    };
    console.log(editData);

    axios
      .post("http://localhost:1337/editForums/add", editData)
      .then(() => {
        console.log("Edit history data saved successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    return false;
  };

  return (
    <div className="container bg-white mt-5">
      <div className="pt-5 px-4">
        <Header title="NETS: Edit Discussion Forums" />
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {forum?.map((f) => (
            <div key={f._id}>
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
                    defaultValue={f.topic}
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
                    defaultValue={f.description}
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
                    defaultChecked={f.attachmentAllowed ? true : false}
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
                    defaultChecked={f.attachmentAllowed ? false : true}
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
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary mt-5 "
              style={{
                backgroundColor: "#1D9EEC",
                borderColor: "#1D9EEC",
              }}
            >
              Save
            </button>
            <Link to="/forums">
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

export default EditForum;
