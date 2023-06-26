import image1 from "../../images/2.svg";
import swal from "sweetalert";
import "../../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import validator from "validator";
import { useState } from "react";

const EditDepartment = () => {
  const { id, name } = useParams(); //Destructures the id and name parameters from the URL using the useParams() hook
  const [newDepName, setNewDepName] = useState(name); //Initializes a state variable-newDepName- initial value of name, function-setNewDepName-update the state variable.
  const [reason, setReason] = useState(""); //Initializes a state variable-reason with an empty string value,function-setReason to update the state variable.

  function submitEdit(e) { // this function is used to handle the form submission
    e.preventDefault();

    // Validate department name
    const regex = /^[A-Z][a-z\s]+$/; //contains alphabet,space
    if (!validator.matches(newDepName, regex)) {
      swal({
        icon: "warning",
        title: "Invalid",
        text: "Department name must begin with a capital letter, use lowercase for the remaining letters, and do not include numbers or symbols.",
      });
      return;
    }

    axios
      .post(process.env.REACT_APP_API_BASE + "/departments/editDepartment", { //Sends a POST request to the backend server to update the department name with the new name, reason and id.
        fromName: name,
        newName: newDepName,
        reason: reason,
        editedId: id,
      })
      .then((res) => {
        if (res.data.status === true) {
          swal({
            icon: "success",
            text: res.data.message,
          });
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
        <h5>Edit Department</h5>
      </div>
      <div className="columns mt-4">
        <div>
          <img src={image1} className="picside2" draggable={false} alt="this is image" />
        </div>
        <div class="card" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
          <div class="card-body">
            <form name="myForm" onSubmit={submitEdit}>
              <div className="field">
                <label className="ml-5 createchap">Rename Department</label>
                <div className="control">
                  <input
                    type="text"
                    value={newDepName}
                    onChange={(e) => {
                      setNewDepName(e.target.value);
                    }}
                    name="dname"
                    className="inputdata2 my-2 ml-5"
                    placeholder="Enter Department Name"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="ml-5 createchap">Reason</label>
                <div className="control">
                  <input
                    type="text"
                    name="dreason"
                    className="inputdata2 my-2 ml-5"
                    placeholder="Reason"
                    required
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="control">
                <center>
                  <button
                    type="submit"
                    className="btn btn-success mr-1 column is-half text-white col-md-3 my-3"
                  >
                    Save
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

export default EditDepartment;
