import { Link } from "react-router-dom";
import image2 from "../../images/contentCr/learningChap.svg"
import image3 from "../../images/contentCr/manageGuidance.svg"
import image4 from "../../images/contentCr/rating1.svg"

const ContentCreator = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/complete-guidance-ticket" className="btn btn-outline-dark">
                            <center>
                                <img src={image3} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>Complete Guidance request</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card shadow">
                        <Link to="/ratingsreport" className="btn btn-outline-dark">
                            <center>
                                <img src={image4} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img>
                            </center>
                            <div className="card-body">
                                <h6>View My Ratings and Review</h6>
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
            </div>
        </div>
    );
}
export default ContentCreator;