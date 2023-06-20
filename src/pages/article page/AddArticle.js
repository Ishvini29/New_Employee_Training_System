import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../Firebase config/firebase";
import { v4 } from 'uuid';
import jwt_decode from "jwt-decode";
function AddArticle(props) {
  const chapterId = props.chapterId;
  const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
  const userid = userDocument._id;
  const [articleUpload, setArticleUpload] = useState(null);
  const [articleUploadStatus, setArticleUploadStatus] = useState(false);

  const validationSchema = Yup.object().shape({
    articleName: Yup.string().required('Article name is required'),
    articleDesc: Yup.string().required('Description is required'),
    articleFile: Yup.mixed()
      .required('File is required')
      .test(
        'fileFormat',
        'Only pdf and word files are allowed',
        (value) =>
          value &&
          ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
            value.type
          )
      ),
  });

  const [articleName, setarticleName] = useState('');
  const [articleDesc, setarticleDesc] = useState('');
  const [errors, setErrors] = useState({});

  const onChangeArtName = (e) => {
    setarticleName(e.target.value);
  };

  const onChangeArtIntro = (e) => {
    setarticleDesc(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setArticleUploadStatus(true);
    try {
      await validationSchema.validate(
        { articleName: articleName, articleDesc: articleDesc, articleFile: articleUpload },
        { abortEarly: false }
      );

      console.log(`Form submitted:`);
      console.log(`Article Name: ${articleName}`);
      console.log(`Article Introduction: ${articleDesc}`);

      var newArticle = {
        belongsToChapter: chapterId,
        createdBy: userid,
        articleName: articleName,
        articleDesc: articleDesc,
      };

      if (articleUpload == null) return;
      const articleRef = ref(storage, `Articles/${articleUpload.name + v4()}`);

      uploadBytes(articleRef, articleUpload).then((article) => {
        getDownloadURL(article.ref).then((url) => {
          console.log(url);
          newArticle = { ...newArticle, articleUrl: url };
          axios.post(process.env.REACT_APP_API_BASE+'/arts/add', newArticle).then((res) => {
            console.log(res.data);
            setArticleUploadStatus(false);
            swal({
              icon: 'success',
              text: 'Successfully created',
            }).then(() => {
              window.location.reload(); // Refresh the page
            });
            setarticleName('');
            setarticleDesc('');
            setErrors({});
          });
        });
      });
    } catch (err) {
      setArticleUploadStatus(false);
      console.error(err);
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: 'warning',
        text: 'Error',
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
            className={`form-control ${errors.articleName && 'is-invalid'}`}
            value={articleName}
            onChange={onChangeArtName}
          />
          {errors.articleName && <div className="invalid-feedback">{errors.articleName}</div>}
          <br></br>
          <label>Introduction </label>
          <input
            type="text"
            className={`form-control ${errors.articleDesc && 'is-invalid'}`}
            value={articleDesc}
            onChange={onChangeArtIntro}
          />
          {errors.articleDesc && <div className="invalid-feedback">{errors.articleDesc}</div>}
          <br></br>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className={`form-control ${errors.articleFile && 'is-invalid'}`}
            aria-label="file example"
            onChange={(event) => {
              setArticleUpload(event.target.files[0]);
            }}
          />
          {errors.articleFile && <div className="invalid-feedback">{errors.articleFile}</div>}
          <p>Only pdf and word files are allowed.</p>
          <br></br>
          <button type="submit" className="btn btn-primary" disabled={articleUploadStatus && true}>
            {
              (articleUploadStatus)
                ?
                <>
                  <span className='spinner-grow spinner-grow-sm me-3' role="status"></span>
                  Saving...
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
