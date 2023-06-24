import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

export default function AddUnit(props) {
  const userDocument = jwt_decode(
    JSON.parse(localStorage.getItem("user")).token
  ).userData;
  const chapterId = props.chapterID;
  const userRole = userDocument?.userRole;
  const userid = userDocument._id;
  console.log("from addunit " + chapterId + "/" + userid);

  const [unitName, setunitName] = useState("");
  const [unitDesc, setunitDesc] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    unitName: Yup.string().required("Unit name is required"),
    unitDesc: Yup.string().required("Unit introduction is required"),
  });

  const onChangeunitname = (e) => {
    setunitName(e.target.value);
  };

  const onChangeunitintro = (e) => {
    setunitDesc(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(
        { unitName: unitName, unitDesc: unitDesc },
        { abortEarly: false }
      );

      const newUnit = {
        belongsToChapter: chapterId,
        createdBy: userid,
        unitName: unitName,
        unitDesc: unitDesc,
      };

      const res = await axios.post(
        process.env.REACT_APP_API_BASE + "/units/add",
        newUnit
      );
      console.log(res.data);
      swal({
        icon: "success",
        text: "Successfully created",
      }).then(() => {
        setunitName("");
        setunitDesc("");
        setErrors({});
        props.sendData(props.toDoRefresh + 1);
      });
    } catch (err) {
      console.error(err);
      const validationErrors = {};

      err.inner?.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: "warning",
        text: "Error",
      });
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="unitName">Unit </label>
          <input
            type="text"
            id="unitName"
            className="form-control"
            value={unitName}
            onChange={onChangeunitname}
          />
          {errors.unitName && <div className="error">{errors.unitName}</div>}
          <br></br>
          <label htmlFor="unitDesc">Introduction </label>
          <input
            type="text"
            id="unitDesc"
            className="form-control"
            value={unitDesc}
            onChange={onChangeunitintro}
          />
          {errors.unitDesc && <div className="error">{errors.unitDesc}</div>}
          <br></br>
          <input type="submit" value="Save Unit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
