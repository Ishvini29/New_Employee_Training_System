import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link } from "react-router-dom";
import add from "../../images/create.png";
import filter from "../../images/filter.png";

const Jobtitle = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  function deletemsg(id) {
    swal({
      title: "Confirm",
      text: "Are you absolutely sure you want to permanently delete this Jobtitle and all the data it contains?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(process.env.REACT_APP_API_BASE + "/jobtitles/deleteJobtitle", {
            id: id,
          })
          .then((res) => {
            if (res.data.status === true) {
              swal(res.data.message, {
                icon: "success",
              });
            } else {
              swal(res.data.message, {
                icon: "warning",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Your Jobtitle is safe!", {
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE + "/jobtitles/showAllJobtitles")
      .then(function (response) {
        setDepartments(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading">
          <h5>Jobtitles</h5>
        </div>
        <div className="row">
          {loading ? (
            <center>
              <div className="spinner-grow mt-3" role="status"></div>
            </center>
          ) : departments.length === 0 ? (
            <div className="alert alert-danger mt-4">
              <b>Department Creation Required ! </b>
              <Link to={"/department"} className="btn btn-danger btn-sm me-2">Create Department</Link>
            </div>
          ) : (
            <div className="col-md-12">
              <Link to="/newjob" className="btn btn-outline-success form-control">
                <img src={add} className="picside5" /> Add New Jobtitle
              </Link>

              <div className="form-group mt-3">
                <img src={filter} className="picside5" />
                <label htmlFor="departmentSelect" style={{ color: "#32766e" }}>Select Department:</label>
                <br></br>
                <select
                  className="form-control mt-2"
                  id="departmentSelect"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">All Departments</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.depName}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="mt-3"></hr>

            </div>
          )}
        </div>
        <table className="view-table">
          <thead>
            <tr style={{ backgroundColor: "#b9e1dc" }}>
              <th scope="col">Department name</th>
              {/* <th scope="col">Jobtitle_ID</th> */}
              <th scope="col">Jobtitle name</th>
              <th scope="col">Edit jobtitle </th>
              <th scope="col">Delete jobtitle </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "MintCream" }}>
            {departments.map((department) => {
              if (
                selectedDepartment === '' ||
                selectedDepartment === department._id
              ) {
                return department.Jobtitle.map((jobtitle) => (
                  <tr className="align-middle" key={jobtitle._id}>
                    <td>{department.depName}</td>
                    {/* <td>{jobtitle._id}</td> */}
                    <td>{jobtitle.jobTitlename}</td>
                    <td>
                      <Link
                        to={`/editjob/${jobtitle._id}/${jobtitle.jobTitlename}`}
                        className="btn btn-outline-primary form-control"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => deletemsg(jobtitle._id)}
                        className="btn btn-outline-danger form-control"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ));
              }
              return null;
            })}
          </tbody>
        </table>
        <br></br><br></br>
      </div>
    </React.Fragment>
  );
};

export default Jobtitle;


