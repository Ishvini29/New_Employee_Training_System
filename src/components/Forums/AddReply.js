import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Header from "../Shared/Header";
import swal from "sweetalert";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase config/firebase";
import { v4 } from "uuid";
import jwt_decode from "jwt-decode";

const AddReply = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [attachmentAllowed, setAttachmentAllowwed] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false); // New state for tracking upload status

  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE +
        `/get-forum-details-by-forum-id/${params?.forumId}`
      )
      .then((response) => {
        setAttachmentAllowwed(response.data[0].attachmentAllowed);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const formSchema = Yup.object().shape({
    description: Yup.string().required("* description is required"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(validationOpt);
  const { errors } = formState;

  async function onFormSubmit(formData) {
    try {
      var data = {
        description: formData.description,
        createdBy: userDocument._id,
      };
      console.log(data);

      if (attachment === null) {
        axios
          .post(
            process.env.REACT_APP_API_BASE +
            `/add-replies/${params?.forumId}/${params?.commentId}`,
            data
          )
          .then((res) => {
            console.log(res.data);
            swal({
              title: "Thank you!",
              text: "Your reply was successfully saved!",
              icon: "success",
              button: "Close",
            }).then(() => {
              navigate(`/view-forum/${params?.forumId}/${params.chapterID}/${params.chapterName}`);
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
        return;
      }
      console.log(attachment.name);
      const fileExtension = attachment.name.split(".").pop(); // Get the file extension
      const fileName = `replies_${v4()}.${fileExtension}`; // Generate a unique filename with the correct extension

      const AttachmentRef = ref(
        storage,
        `forums/repliesAttachments/${fileName}`
      );

      setUploading(true);

      uploadBytes(AttachmentRef, attachment).then((a) => {
        getDownloadURL(a.ref).then((url) => {
          console.log(url);
          data = { ...data, attachment: url };
          axios
            .post(
              process.env.REACT_APP_API_BASE +
              `/add-replies/${params?.forumId}/${params?.commentId}`,
              data
            )
            .then((res) => {
              console.log(res.data);
              swal({
                title: "Thank you!",
                text: "Your reply was successfully saved!",
                icon: "success",
                button: "Close",
              }).then(() => {
                navigate(`/view-forum/${params?.forumId}`);
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
            })
            .finally(() => {
              setUploading(false); // Set the uploading state to false once the upload is complete
            });
        });
      });
    } catch (err) {
      swal({
        title: "Opzz!",
        text: "Something went wrong, Please try again!",
        icon: "warning",
      });
    }
    console.log("Submitted form data:", data);
    return false;
  }

  return (
    <div className="container my-5">
      <Header title="Add Reply" />
      <div className="p-4">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group mt-2">
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
          {attachmentAllowed && (
            <div className="form-group mt-4">
              <label for="attachment" className="font-weight-bold">
                Attachment:
              </label>
              <div className="form-group">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png,.jpeg"
                  className="form-control-file mt-4"
                  id="attachment"
                  name="attachment"
                  onChange={(event) => {
                    setAttachment(event.target.files[0]);
                  }}
                />
                <p className="font-italic">
                  allowed file types: .pdf,.jpg,.png,.jpeg
                </p>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn btn-primary mt-5 "
              style={{
                backgroundColor: "#1D9EEC",
                borderColor: "#1D9EEC",
              }}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Add"}
            </button>
            <Link to={`/view-forum/${params?.forumId}/${params.chapterID}/${params.chapterName}`}>
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

export default AddReply;
