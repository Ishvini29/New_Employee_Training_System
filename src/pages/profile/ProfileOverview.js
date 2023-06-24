import "../../App.css";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function ProfileOverview(props) {
  const userID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData._id;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API_BASE + `/users/getLoggedinUserData/${userID}`)
      .then(response => {
        console.log(response.data);
        setData(response.data[0]);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userID]);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center ">
        <h4 className="heading text-center p-3 rounded">Profile Overview</h4>
        {
          (loading)
            ?
            <center><div className="spinner-grow mt-3" role="status"></div></center>
            :
            <div className="col-md-8">
              <div
                className="card mt-5 crud shadow-lg p-3 mb-5 mt-5 bg-body rounded "
              >
                <div className="col d-flex justify-content-center mt-3">
                  <img
                    src={data.image}
                    className="rounded-circle"
                    alt="Cinque Terre"
                    style={{ height: "120px", width: "120px" }}
                  />
                </div>
                <div className="card-body">
                  <form>
                    <div className="row justify-content-center">
                      <div className="col-md-2"></div>
                      <div className="form-group col-md-3">
                        <label for="inputFirst name">Name</label>
                      </div>
                      <div className="form-group col-md-5">
                        <input
                          type="email"
                          className="form-control a2"
                          id="inputEmail4"
                          value={data.fname + " " + data.lname}
                          disabled={true}
                        />
                      </div>
                    </div>


                    <div className="row mt-2 justify-content-center">
                      <div className="col-md-2"></div>
                      <div className="form-group col-md-3">
                        <label for="inputLastName">Employee ID</label>
                      </div>
                      <div className="form-group col-md-5">
                        <input
                          type="lastname"
                          className="form-control a2"
                          id="inputLastname"
                          value={data.empId}
                          disabled={true}
                        />
                      </div>
                    </div>

                    {data?.jobTitle?.jobTitle &&
                      <div className="row mt-2 justify-content-center">
                        <div className="col-md-2"></div>
                        <div className="form-group col-md-3">
                          <label for="inputLastName">Jobtitle</label>
                        </div>
                        <div className="form-group col-md-5">
                          <input
                            type="lastname"
                            className="form-control a2"
                            id="inputLastname"
                            value={data.jobTitle.jobTitle}
                            disabled={true}
                          />
                        </div>
                      </div>
                    }

                    {
                      data?.department?.departmentName &&
                      <div className="row mt-2 justify-content-center">
                        <div className="col-md-2"></div>
                        <div className="form-group col-md-3">
                          <label for="inputEmail4">Department</label>
                        </div>
                        <div className="form-group col-md-5">
                          <input
                            type="email"
                            className="form-control a2"
                            id="inputEmail4"
                            value={data.department.departmentName}
                            disabled={true}
                          />
                        </div>
                      </div>
                    }

                    <div className="row mt-2 justify-content-center">
                      <div className="col-md-2"></div>
                      <div className="form-group col-md-3">
                        <label for="inputEmail4">User Role</label>
                      </div>
                      <div className="form-group col-md-5">
                        <input
                          type="email"
                          className="form-control a2"
                          id="inputEmail4"
                          value={data.userRole}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                      <div className="col-md-2"></div>
                      <div className="form-group col-md-3">
                        <label for="inputEmail4">Email </label>
                      </div>
                      <div className="form-group col-md-5">
                        <input
                          type="email"
                          className="form-control a2"
                          id="inputEmail4"
                          value={data.email}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 justify-content-center">
                      <div className="col-md-2"></div>
                      <div className="form-group col-md-3">
                        <label for="inputEmail4">Phone No</label>
                      </div>
                      <div className="form-group col-md-5">
                        <input
                          type="email"
                          className="form-control a2"
                          id="inputEmail4"
                          value={data.phone}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="row mt-2 ">
                      <div className="col-md-2"></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        }

      </div>
    </div >
  );
}

export default ProfileOverview;


