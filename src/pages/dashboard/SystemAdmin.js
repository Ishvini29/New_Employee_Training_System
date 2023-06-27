import { Link } from "react-router-dom";
import image1 from "../../images/SystemAdmin/assignDefaultChapter.svg";
import image2 from "../../images/SystemAdmin/manageChapter.svg";
import image4 from "../../images/SystemAdmin/verifyUser2.svg";
import image5 from "../../images/SystemAdmin/viewChapter.svg";
import promote from "../../images/superAdmin/promote.png";
const SystemAdmin = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/depchapter" className="btn btn-outline-dark">
                            <center>
                                <img src={image2} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Manage Chapter</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/viewchapter" className="btn btn-outline-dark">
                            <center>
                                <img src={image5} className="card-img-top" style={{ "width": "150px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>View All Chapters</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/allocatechapter" className="btn btn-outline-dark">
                            <center>
                                <img src={image1} className="card-img-top" style={{ "width": "120px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Assign Default Chapters</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/verifyusersfromdepartment" className="btn btn-outline-dark">
                            <center>
                                <img src={image4} className="card-img-top" style={{ "width": "120px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Verify Users</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/promoteDemoteUser/systemadmin" className="btn btn-outline-dark">
                            <center>
                                <img src={promote} className="card-img-top" style={{ "width": "120px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Promote or Demote Department Employees</h6>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SystemAdmin;