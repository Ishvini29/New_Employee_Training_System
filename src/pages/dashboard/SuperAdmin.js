import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import manageDepartment from "../../images/superAdmin/manageDep.png";
import manageChapters from "../../images/superAdmin/manageChapter.png";
import promote from "../../images/superAdmin/promote.png";
import pending from "../../images/superAdmin/pendingUser.png";
import viewChap from "../../images/superAdmin/viewChapter.png";
import manageJob from "../../images/superAdmin/manageJob.png";
import editLogs from "../../images/superAdmin/editLogs.svg";
const SuperAdmin = () => {
    const [depIsEmpty, setDepIsEmpty] = useState(false);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE + "/general/depisempty")
            .then(function (response) {
                setDepIsEmpty(response.data.status)
            });
    }, [])
    return (
        <>
            {
                depIsEmpty && <div className="alert alert-danger mt-12">
                    <b className="me-2">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        Please Create Departments and Job Titles, Until that Application will not be available for users.
                    </b>
                    <Link to={"/department"} className="btn btn-danger btn-sm me-2">Create Department</Link>
                    <Link to={"/jobtitle"} className="btn btn-danger btn-sm me-2">Create JobTitle</Link>
                </div>
            }

            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/department" className="btn btn-outline-dark">
                            <center>
                                <img src={manageDepartment} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Manage Department</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/jobtitle" className="btn btn-outline-dark">
                            <center>
                                <img src={manageJob} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Manage Job Title </h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/chapter" className="btn btn-outline-dark">
                            <center>
                                <img src={manageChapters} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Manage Chapter</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/promoteDemoteUser/superadmin" className="btn btn-outline-dark">
                            <center>
                                <img src={promote} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Promote or Demote Employees</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/pendingrequests" className="btn btn-outline-dark">
                            <center>
                                <img src={pending} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Pending User Approvals</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/viewchapter" className="btn btn-outline-dark">
                            <center>
                                <img src={viewChap} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>View Chapters</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/logs" className="btn btn-outline-dark">
                            <center>
                                <img src={editLogs} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Edit Logs</h6>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    );
}
export default SuperAdmin;