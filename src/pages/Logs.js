import { Link } from "react-router-dom";

const Logs = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <Link to="/pendingrequests" className="btn btn-outline-dark">
                            <center>
                                {/* <img src={pending} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img> */}
                            </center>
                            <div className="card-body">
                                <h6>Edit Logs</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow">
                        <Link to="/pendingrequests" className="btn btn-outline-dark">
                            <center>
                                {/* <img src={pending} className="card-img-top" style={{ "width": "100px" }} alt="card" ></img> */}
                            </center>
                            <div className="card-body">
                                <h6>Delete Logs</h6>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Logs;