import { Link } from "react-router-dom";
import additionalChapterRequest from "../../images/Supervisor/additionalChapterRequest.svg";
import leaderBoard from "../../images/Supervisor/leaderBoard.svg";
import manageFinalProjectAssignment from "../../images/Supervisor/manageFinalProjectAssignment.svg";
import manageGuidance from "../../images/Supervisor/manageGuidance.svg";
import report from "../../images/Supervisor/report.svg";
import viewChapter from "../../images/Supervisor/viewChapter.svg";
import image2 from "../../images/contentCr/learningChap.svg"
import image4 from "../../images/contentCr/rating1.svg";
const Supervisor = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/manageFinalProjectAssignment" className="btn btn-outline-dark">
                            <center>
                                <img src={manageFinalProjectAssignment} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Manage Final Project Assignment</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/direct-guidance-ticket" className="btn btn-outline-dark">
                            <center>
                                <img src={manageGuidance} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Direct Guidance request</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/leaderboardsup" className="btn btn-outline-dark">
                            <center>
                                <img src={leaderBoard} className="card-img-top" style={{ "width": "145px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Show Leader Board</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/viewchapter" className="btn btn-outline-dark">
                            <center>
                                <img src={viewChapter} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>View All Chapters</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/enrollrequestsupervisor" className="btn btn-outline-dark">
                            <center>
                                <img src={additionalChapterRequest} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Accept Additional Chapter Request</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/chapter/department/all" className="btn btn-outline-dark">
                            <center>
                                <img src={image2} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Chapters</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/ratingsreport" className="btn btn-outline-dark">
                            <center>
                                <img
                                    src={image4}
                                    className="card-img-top"
                                    style={{ width: "100px" }}
                                    alt="card"
                                ></img>
                            </center>
                            <div className="card-body">
                                <h6>View My Ratings</h6>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-4 m-2">
                    <div className="border border-dark rounded shadow">
                        <div className="p-3">
                            <div className="card shadow">
                                <Link className="btn btn-outline-dark">
                                    <center>
                                        <img src={report} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                                    </center>
                                    <div className="card-body">
                                        <h6>View Employee Reports</h6>
                                    </div>
                                </Link>
                            </div>
                            <hr></hr>
                            <Link to="/report" className="btn btn-outline-dark form-control mt-1 shadow">View Employee Report</Link>
                            <Link to="/quizreportfront" className="btn btn-outline-dark form-control mt-2 shadow">Quiz Report of Hired Employees</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>

        </>
    );
}
export default Supervisor;
