import { FaPencilAlt } from "react-icons/fa";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import * as Yup from "yup";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Firebase config/firebase";
import { v4 } from "uuid";
import jwt_decode from "jwt-decode";

const Edit = ({ article }) => {
  const { chapterName } = useParams();
  const [updatedFile, setUpdatedFile] = useState(null);
  const [modal, setModal] = useState(null);
  const [updatedarticle, setUpdatedarticle] = useState(article);
  const [errors, setErrors] = useState({});
  const [articleUpdateStatus, setArticleUpdateStatus] = useState(false);
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;

  const validationSchema = Yup.object().shape({
    articleName: Yup.string().required("Article name is required"),
    articleDesc: Yup.string().required("Description is required"),
  });

  const onChange = (e) => {
    if (e.target.type === "file") {
      setUpdatedFile(e.target.files[0]);
    } else {
      setUpdatedarticle({
        ...updatedarticle,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    setArticleUpdateStatus(true);
    try {
      await validationSchema.validate(updatedarticle, { abortEarly: false });

      if (updatedFile) {
        // Delete the current file from Firebase Storage
        const articleRef = ref(storage, article.articleUrl);
        deleteObject(articleRef)
          .then(() => {
            // Upload the new file to Firebase Storage

            const fileExtension = updatedFile.name.split(".").pop(); // Get the file extension
            const fileName = `article_${v4()}.${fileExtension}`; // Generate a unique filename with the correct extension

            const newVideoRef = ref(storage, `Articles/${fileName}`);
            uploadBytes(newVideoRef, updatedFile)
              .then((snapshot) => {
                // Get the download URL of the new file
                getDownloadURL(snapshot.ref).then((url) => {
                  // Update the KT session with the new file's URL
                  const updatedArticle = {
                    ...updatedarticle,
                    articleUrl: url,
                  };
                  updateArticle(updatedArticle);
                });
              })
              .catch((error) => {
                setArticleUpdateStatus(false);
                console.log("Error uploading new article:", error);
                swal({
                  icon: "warning",
                  text: "Error",
                });
              });
          })
          .catch((error) => {
            setArticleUpdateStatus(false);
            console.log("Error deleting current article:", error);
            swal({
              icon: "warning",
              text: "Error",
            });
          });
      } else {
        // No file update, only update the KT session details
        updateArticle(updatedarticle);
      }
    } catch (err) {
      console.error(err);
      setArticleUpdateStatus(false);
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: "warning",
        text: "Error",
      });
    }
  };

  const updateArticle = (updatedArticle) => {
    axios
      .post(`http://localhost:1337/arts/update/${article._id}`, updatedArticle)
      .then(() => {
        setModal(null);
        setArticleUpdateStatus(false);
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
      articleId: article._id,
      updatedby: userDocument._id,
      articleName: updatedArticle.articleName,
      articleDesc: updatedArticle.articleDesc,
      old_data: {
        articleName: article.articleName,
        articleDesc: article.articleDesc,
      },
    };

    axios
      .post("http://localhost:1337/editarticles/add", editData)
      .then(() => {
        console.log("Edit history data saved successfully");
      })
      .catch((err) => {
        console.log(err);
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
          data-bs-target={`#edit-modal-${article._id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`edit-modal-${article._id}`}
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
                  <label htmlFor="articleName" className="form-label">
                    Article Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.articleName && "is-invalid"
                    }`}
                    id="articleName"
                    name="articleName"
                    value={updatedarticle.articleName}
                    onChange={onChange}
                  />
                  {errors.articleName && (
                    <div className="invalid-feedback">{errors.articleName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="articleDesc" className="form-label">
                    Article Introduction
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.articleDesc && "is-invalid"
                    }`}
                    id="articleDesc"
                    name="articleDesc"
                    value={updatedarticle.articleDesc}
                    onChange={onChange}
                  />
                  {errors.articleDesc && (
                    <div className="invalid-feedback">{errors.articleDesc}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="Attachment" className="form-label">
                    Article Attachment
                  </label>
                </div>
                <div className="mb-3">
                  <p>If you want to change the file, add the new file here.</p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="form-control"
                    aria-label="file example"
                    onChange={onChange}
                  />
                  <p>Only pdf files are allowed.</p>
                </div>
                <div class="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {articleUpdateStatus ? (
                      <>
                        <span
                          className="spinner-grow spinner-grow-sm me-3"
                          role="status"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      "Update Article"
                    )}
                  </button>
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
