import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import * as Yup from 'yup';

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from "../../Firebase config/firebase";
import { v4 } from 'uuid';

const AddKT = (props) => {
  const { id } = useParams();
  const chapterId = '64848a1cd792d9e0909c70e0';
  const userid = '648050d3b39dcbdf90027b5a';
  const [KTUpload, setKTUpload] = useState(null);

  const validationSchema = Yup.object().shape({
    sessionName: Yup.string().required('KT Session name is required'),
    sessionDesc: Yup.string().required('Description is required'),
    sessionFile: Yup.mixed()
      .required('File is required')
      .test('fileFormat', 'Only video files are allowed', (value) => {
        if (!value) return true;
        const allowedFormats = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
        return allowedFormats.includes(value.type);
      }),
  });

  const [sessionName, setsessionName] = useState('');
  const [sessionDesc, setsessionDesc] = useState('');
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const onChangeKtName = (e) => {
    setsessionName(e.target.value);
  };

  const onChangeKtIntro = (e) => {
    setsessionDesc(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await validationSchema.validate(
        {
          sessionName: sessionName,
          sessionDesc: sessionDesc,
          sessionFile: KTUpload,
        },
        { abortEarly: false }
      );

      console.log(`Form submitted:`);
      console.log(`KT Name: ${sessionName}`);
      console.log(`KT Introduction: ${sessionDesc}`);

      var newKT = {
        belongsToChapter: chapterId,
        belongsToUnit: id,
        createdBy: userid,
        sessionName: sessionName,
        sessionDesc: sessionDesc,
      };

      if (KTUpload == null) return;
      setSubmitStatus(true);
      const KTRef = ref(storage, `KTsessions/${KTUpload.name + v4()}`);

      uploadBytes(KTRef, KTUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          newKT = { ...newKT, sessionUrl: url };
          axios
            .post(process.env.REACT_APP_API_BASE+`/kts/add/${id}`, newKT)
            .then((res) => {
              setSubmitStatus(false);
              console.log(res.data);
              swal({
                icon: 'success',
                text: 'Successfully created',
              }).then(() => {
                // setSubmitStatus(false);
                window.location.reload(); // Refresh the page
              });
              setsessionName('');
              setsessionDesc('');
              setKTUpload(null);
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
        icon: 'warning',
        text: 'Error',
      });
    }

  }

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>KT </label>
          <input type="text" className="form-control" value={sessionName} onChange={onChangeKtName} />
          {errors.sessionName && <div className="error">{errors.sessionName}</div>}
          <br></br>
          <label>Introduction </label>
          <input type="text" className="form-control" value={sessionDesc} onChange={onChangeKtIntro} />
          {errors.sessionDesc && <div className="error">{errors.sessionDesc}</div>}
          <br></br>
          <input
            type="file"
            accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo"
            className={`form-control ${errors.sessionFile && 'is-invalid'}`}
            aria-label="file example"
            onChange={(event) => {
              setKTUpload(event.target.files[0]);
            }}
          />
          {errors.sessionFile && <div className="error">{errors.sessionFile}</div>}
          <p>Only video files are allowed.</p>
          <br></br>
          <button type="submit" className="btn btn-primary" disabled={submitStatus && true}>
            {
              (submitStatus === false)
                ?
                <span>Save KT Session</span>
                :
                <>
                  <span className='spinner-grow spinner-grow-sm me-3' role="status"></span>
                  Saving...
                </>

            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddKT;
