import React from "react";
import axios from "axios";  //Importing axios library for HTTP requests
import swal from "sweetalert"; //Importing sweetalert library for displaying alert messages
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import add from "../../images/create.png";


const Department = () => {     //Defining Department component as a functional component
  const [departments, setDepartment] = useState([]); //Declaring a state variable 'departments' as an empty array using the useState hook.
  const [loading, setLoading] = useState(false);
  function deletemsg(id) {  //Declaring a function called deletemsg that takes an id as a parameter

    swal({  //Displaying an alert message using Sweetalert library
      title: "Confirm",
      text: "Are you absolutely sure you want to permanently delete this Department and all the Jobtitles it contains?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => { //Handling user confirmation to delete the department
      if (willDelete) {  //If user confirms the deletion
        axios
          .post(process.env.REACT_APP_API_BASE + "/departments/deleteDepartment", {
            id: id,
          })
          .then((res) => {  //Handling response from the server
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
          .catch((error) => {  //Handling errors from the server
            console.log(error);
          });
      } else {  //If user cancels the deletion
        swal("Your Department is safe!", {
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {  //Declaring a side effect hook that runs only after the component mounts
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE + "/departments/showAllDepartments")
      .then(function (response) {   //Handling response from the server
        setDepartment(response.data);  //Updating the state variable 'departments' with the data received from the server
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="alert mt-3 heading">
          <h5>Departments</h5>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <Link to="/newdep" className="btn btn-outline-success form-control">
              <img src={add} className="picside5" alt="add_symbol" /> Add New Department
            </Link>
            <hr className="mt-3"></hr>
          </div>
        </div>{
          (loading)
            ?
            <center><div className="spinner-grow mt-3" role="status"></div></center>
            :
            (departments.length === 0)
              ?
              <div className="alert alert-info mt-4"> <b>No departments Found !</b> </div>
              :
              <table className="view-table">
                <thead>
                  <tr style={{ backgroundColor: "#b9e1dc" }}>
                    {/* <th scope="col">ID</th> */}
                    <th scope="col">Department Name</th>
                    <th scope="col">Edit department</th>
                    <th scope="col">Delete department</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "MintCream" }}>
                  {departments.map((item) => {  // loop through all departments and display them in a table
                    return (
                      <tr className="align-middle" key={item._id}>
                        {/* <th scope="row">{item._id}</th> */}
                        <td>{item.depName}</td>
                        <td>
                          <Link
                            to={"/editdep/" + item._id + "/" + item.depName}
                            className="btn btn-outline-primary form-control ">
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button type="submit" onClick={() => deletemsg(item._id)}
                            className="btn btn-outline-danger form-control">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>}
      </div>
    </React.Fragment>
  );
};
export default Department;


