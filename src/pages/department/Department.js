import React from "react";
import NavBar from "../../components/NavBar";
import axios from "axios";  //Importing axios library for HTTP requests
import swal from "sweetalert"; //Importing sweetalert library for displaying alert messages
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Department = () => {     //Defining Department component as a functional component
  const [departments, setDepartment] = useState([]); //Declaring a state variable 'departments' as an empty array using the useState hook.
  function deletemsg(id) {  //Declaring a function called deletemsg that takes an id as a parameter

    swal({  //Displaying an alert message using Sweetalert library
      title: "Confirm",
      text: "Are you absolutely sure you want to permanently delete this Department and all the data it contains?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => { //Handling user confirmation to delete the department
      if (willDelete) {  //If user confirms the deletion
        axios
          .post("http://localhost:1337/departments/deleteDepartment", {
            id: id,
            // reason: reason,
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
    axios
      .get("http://localhost:1337/departments/showAllDepartments")
      .then(function (response) {   //Handling response from the server
        setDepartment(response.data);  //Updating the state variable 'departments' with the data received from the server
      });
  }, []);

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <div className="container mt-4">
        <div className="alert mt-3 heading">
          <h5>Departments</h5>
        </div>
        <div className="row ">
          <div className="col-md-12">
            <Link to="/newdep" className="btn btn-outline-success form-control">
              + Add New Department
            </Link>
            <hr className="mt-3"></hr>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Department name</th>
              <th scope="col">Edit department</th>
              <th scope="col">Delete department</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((item) => {  // loop through all departments and display them in a table
              return (
                <tr className="align-middle" key={item._id}>
                  <th scope="row">{item._id}</th>
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
        </table>
      </div>
    </React.Fragment>
  );
};
export default Department;
