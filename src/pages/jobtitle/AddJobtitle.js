import React, { useState, useEffect } from "react";
import image4 from "../../images/jobtitle.svg";
import "../../App.css";
import swal from "sweetalert";
import validator from "validator";
import axios from "axios";

const AddJobtitle = () => {
  const [jobTitlename, setJobName] = useState("");
  const [departments, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/departments/showAllDepartments")
      .then(function (response) {
        setDepartment(response.data);
      });
  }, []);
  function submitJobtitle(e) {
    e.preventDefault();
    console.log(selectedDepartment);

    // Validate jobtitle name
    const regex = /^[A-Z][a-z\s-]+$/;  //contains alphabet,space,-
    if (!validator.matches(jobTitlename, regex)) {
      swal({
        icon: "warning",
        title: "Invalid",
        text: "Jobtitle name must start with a capital letter and contain only alphabet letters",
      });
      return;
    }

    if (!selectedDepartment) {
      swal({
        icon: "warning",
        text: "Please select the suitable department",
      });
      return;
    }

    axios
      .post(process.env.REACT_APP_API_BASE + "/jobtitles/addJobtitle", {
        jobtitleName: jobTitlename,
        depID: selectedDepartment,
      })
      .then((res) => {
        if (res.data.status === true) {
          swal({
            icon: "success",
            text: res.data.message,
          });
          setJobName("");
        } else {
          swal({
            icon: "warning",
            text: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <div className="alert mt-3 heading">
        <h5>Create Jobtitle</h5>
      </div>
      <div className="columns mt-4">
        <div>
          <img src={image4} className="picside6" draggable={false} alt="this is image" />
        </div>
        <div class="card" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
          <div class="card-body">
            <form name="myForm" onSubmit={submitJobtitle}>

              <div className="field">
                <label className="ml-5 createchap">Jobtitle Name</label>
                <div className="control">
                  <input
                    type="text"
                    name="cname"
                    className="inputdata2 my-2 ml-5"
                    placeholder="Enter New Jobtitle Name"
                    value={jobTitlename}
                    onChange={(e) => setJobName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label className="ml-5 my-2 createchap">Suitable Department</label>
              <div className="col-md-14">
                <select style={{ "backgroundColor": "#fafafa" }}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                  }}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option disabled selected>Department</option>
                  {departments.map((item) => {
                    return <option value={item._id}>{item.depName}</option>;
                  })}
                </select>
              </div>
              <br></br>

              <div className="control">
                <center><button
                  type="submit"
                  className="btn btn-success mr-1 column is-half text-white col-md-3 my-3"
                >
                  Create
                </button></center>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobtitle;



