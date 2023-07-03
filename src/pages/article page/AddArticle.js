import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase config/firebase";
import { v4 } from "uuid";
import jwt_decode from "jwt-decode";

function AddArticle(props) {
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  const [articleUpload, setArticleUpload] = useState(null);
  const [uploading, setUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    articleName: Yup.string().required("Article name is required"),
    articleDesc: Yup.string().required("Description is required"),
    articleFile: Yup.mixed()
      .required("File is required")
      .test(
        "fileFormat",
        "Only pdf files are allowed",
        (value) => value && ["application/pdf"].includes(value.type)
      ),
  });

  const [articleName, setarticleName] = useState("");
  const [articleDesc, setarticleDesc] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeArtName = (e) => {
    setarticleName(e.target.value);
  };

  const onChangeArtIntro = (e) => {
    setarticleDesc(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setUploading(true);
    try {
      await validationSchema.validate(
        {
          articleName: articleName,
          articleDesc: articleDesc,
          articleFile: articleUpload,
        },
        { abortEarly: false }
      );
      var newArticle = {
        createdBy: userDocument._id,
        articleName: articleName,
        articleDesc: articleDesc,
      };

      if (articleUpload == null) return;
      const fileExtension = articleUpload.name.split(".").pop(); // Get the file extension
      const fileName = `article_${v4()}.${fileExtension}`; // Generate a unique filename with the correct extension
      const articleRef = ref(storage, `Articles/${fileName}`);

      uploadBytes(articleRef, articleUpload).then((article) => {
        getDownloadURL(article.ref).then((url) => {
          console.log(url);
          newArticle = { ...newArticle, articleUrl: url,  belongsToChapter: props.chapterId };
          axios
            .post(process.env.REACT_APP_API_BASE + "/arts/add", newArticle)
            .then((res) => {
              setUploading(false);
              swal({
                icon: "success",
                text: "Successfully created",
              }).then(() => {
                props.setRefreshArticleList(props.refreshArticleList+1)
              });
              setarticleName("");
              setarticleDesc("");
              setErrors({});
            });
        });
      });
    } catch (err) {
      console.error(err);
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
  }

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>Article</label>
          <input
            type="text"
            className={`form-control ${errors.articleName && "is-invalid"}`}
            value={articleName}
            onChange={onChangeArtName}
          />
          {errors.articleName && (
            <div className="invalid-feedback">{errors.articleName}</div>
          )}
          <br></br>
          <label>Introduction </label>
          <input
            type="text"
            className={`form-control ${errors.articleDesc && "is-invalid"}`}
            value={articleDesc}
            onChange={onChangeArtIntro}
          />
          {errors.articleDesc && (
            <div className="invalid-feedback">{errors.articleDesc}</div>
          )}
          <br></br>
          <input
            type="file"
            accept=".pdf"
            className={`form-control ${errors.articleFile && "is-invalid"}`}
            aria-label="file example"
            onChange={(event) => {
              setArticleUpload(event.target.files[0]);
            }}
          />
          {errors.articleFile && (
            <div className="invalid-feedback">{errors.articleFile}</div>
          )}
          <p>Only pdf files are allowed.</p>
          <br></br>
          <button type="submit" className="btn btn-primary">
            {
                (uploading)
                    ?
                    <>
                        <span className='spinner-grow spinner-grow-sm me-3' role="status"></span>
                        Uploading
                    </>
                    :
                    "Save Article"
            }
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArticle;
