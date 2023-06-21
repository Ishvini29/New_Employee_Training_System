import React from "react";
import swal from "sweetalert";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../images/create.png";

const Jobtitle = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

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
          .post(process.env.REACT_APP_API_BASE+"/jobtitles/deleteJobtitle", {
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
      .get(process.env.REACT_APP_API_BASE+"/jobtitles/showAllJobtitles")
      .then(function (response) {
        setDepartments(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading"><h5>Jobtitles</h5></div>
        <div className="row ">{
          (loading)
            ?
            <center><div className="spinner-grow mt-3" role="status"></div></center>
            :
            (departments.length === 0) ? <div className="alert alert-danger mt-4"> <b>Department Creation Required !</b> </div> :
              <div className="col-md-12">
                < Link to="/newjob" className="btn btn-outline-success form-control">
                  <img src={add} className="picside5" /> Add New Jobtitle
                </Link>
                <hr className="mt-3"></hr>
              </div>}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Department name</th>
              <th scope="col">Jobtitle_ID</th>
              <th scope="col">Jobtitle name</th>
              <th scope="col">Edit jobtitle </th>
              <th scope="col">Delete jobtitle </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => {
              return department.Jobtitle.map((jobtitle, j) => {
                return (
                  <tr className="align-middle" key={jobtitle._id}>
                    {j === 0 ? <td>{department.depName}</td> : <td></td>}
                    <td>{jobtitle._id}</td>
                    <td>{jobtitle.jobTitlename}</td>
                    <td>
                      <Link
                        to={"/editjob/" + jobtitle._id + "/" + jobtitle.jobTitlename}
                        className="btn btn-outline-primary form-control"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button type="submit" onClick={() => deletemsg(jobtitle._id)}
                        className="btn btn-outline-danger form-control"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment >
  );
};
export default Jobtitle;


