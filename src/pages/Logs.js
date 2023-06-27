import { Link } from "react-router-dom";

const Logs = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-4">
                    <div className="card shadow">
                        <Link to="/scoreEditLog" className="btn btn-outline-dark">
                            <div className="card-body">
                                <h6>Score Edit Logs</h6>
                                <p>Final Project assignment scores</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow">
                        <Link to="/deletehistory" className="btn btn-outline-dark">  
                            <div className="card-body">
                                <h6>Delete Logs</h6>
                                <p>Units, Articles, KT's, Quiz</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow">
                        <Link to="/edithistory" className="btn btn-outline-dark">  
                            <div className="card-body">
                                <h6>Edit Logs</h6>
                                <p>Units, Articles, KT's, Quiz, Discussion Forums</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Logs;