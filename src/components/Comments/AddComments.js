import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Avatar from "../Shared/Avatar";
import Button from "../Shared/Button";
import swal from "sweetalert";
import axios from "axios";

const AddComments = (props) => {
  const formSchema = Yup.object().shape({
    comment: Yup.string().required("* comment is required"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(validationOpt);
  const { errors } = formState;

  const onFormSubmit = (formData) => {
    console.log("data", formData);
    if (props.type === "comment") {
      const data = {
        addedBy: "641db06699bb728ad6649957",
        comment: formData.comment,
      };
      if (props.source === "KT") {
        axios
          .post(`http://localhost:1337/add-kt-comment/${props.ID}`, data)
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your comment was successfully saved!",
              icon: "success",
              button: "Close",
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
      } else {
        axios
          .post(`http://localhost:1337/add-article-comment/${props.ID}`, data)
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your comment was successfully saved!",
              icon: "success",
              button: "Close",
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
      }
    } else {
      const data = {
        addedBy: "641db06699bb728ad6649957",
        reply: formData.comment,
      };

      if (props.source === "KT") {
        axios
          .post(
            `http://localhost:1337/add-kt-comment-replies/${props.ID}/${props.selectedComment}`,
            data
          )
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your reply was successfully saved!",
              icon: "success",
              button: "Close",
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
      } else {
        axios
          .post(
            `http://localhost:1337/add-article-comment-replies/${props.ID}/${props.selectedComment}`,
            data
          )
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your reply was successfully saved!",
              icon: "success",
              button: "Close",
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
      }
    }

    return false;
  };

  return (
    <div>
      <form
        className="d-flex flex-row g-1 my-4 align-items-center justify-content-center"
        style={{ display: "flex", justifyContent: "flex-end" }}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Avatar />

        <input
          type="text"
          className="form-control mx-4"
          style={{
            backgroundColor: "#F8F8F8",
            borderColor: "#1D9EEC",
          }}
          id="comment"
          name="comment"
          placeholder="Add your Comment"
          {...register("comment")}
        />

        <Button label="Post" type="submit" />
      </form>
      <p className="text-center font-italic" style={{ color: "#E60000" }}>
        {errors.comment?.message}
      </p>
    </div>
  );
};

export default AddComments;
