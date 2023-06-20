import React, { useState } from "react";
import image4 from "../../images/dept.svg";
import "../../App.css";
import swal from "sweetalert";
import validator from "validator";
import axios from "axios";

const AddDepartment = () => {
  const [depName, setDepName] = useState("");

  function submitDepartment(e) {
    e.preventDefault();

    // Validate department name
    const regex = /^[A-Z][a-z\s]+$/; //contains alphabet,space
    if (!validator.matches(depName, regex)) {
      swal({
        icon: "warning",
        title: "Invalid",
        text: "Department name must start with a capital letter and contain only alphabet letters.",
      });
      return;
    }

    axios
      .post("http://localhost:1337/departments/addDepartment", {
        departmentName: depName,
      })
      .then((res) => {
        if (res.data.status === true) {
          swal({
            icon: "success",
            text: res.data.message,
          });
          setDepName("");
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
        <h5>Create Department</h5>
      </div>
      <div className="columns mt-4">
        <div>
          <img src={image4} className="picside4" draggable={false} alt="this is image" />
        </div>
        <div class="card" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
          <div class="card-body">
            <form name="myForm" onSubmit={submitDepartment}>
              <div className="field">
                <label className="ml-5">Department Name</label>
                <div className="control">
                  <input
                    type="text"
                    name="cname"
                    className="inputdata2 my-3 ml-5"
                    placeholder="Enter New Department Name"
                    value={depName}
                    onChange={(e) => setDepName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="control">
                <center>
                  <button
                    type="submit"
                    className="btn btn-success mr-1 column is-half text-white col-md-3 my-3"
                  >
                    Create
                  </button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;







