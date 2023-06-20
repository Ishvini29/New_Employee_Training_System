import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
const ConCreChaps = () => {
    const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
    const depid = userDocument.department;
    const [loading, setLoading] = useState();
    const [chapters, setChapters] = useState([]);
    const [commonChapters, setCommonChapters] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE+`/chapters/departmentChapters/${depid}`)
            .then(response => {
                setChapters(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(process.env.REACT_APP_API_BASE+`/commonchapters/showAllChapters`)
            .then(response => {
                setCommonChapters(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return (
        <div>
            <div className="container mt-3">
                {
                    (loading === true)
                        ?
                        <center><div className="spinner-grow mt-3" role="status"></div></center>
                        :
                        (loading === false)
                            ?
                            <>
                                <div className="card">
                                    <div className="card-header heading">
                                        <h5> Department Chapters</h5>
                                    </div>
                                    <div className="card-body">
                                        <div class="row">
                                            {
                                                chapters?.map((item) => {
                                                    return (
                                                        <div class="col-md-6 mt-3">
                                                            <div class="card shadow border border-2">
                                                                <div class="card-body">
                                                                    <h5 class="card-title"><i class="bi bi-journal-text me-2"></i>{item?.chapterName}</h5>
                                                                    <hr></hr>
                                                                    <Link to={"/chapterPage/" + item?._id + "/" + item?.chapterName} class=" btn btn-outline-secondary">Continue <i class="bi bi-arrow-right-circle"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <div className="card-header heading">
                                        <h5>Common Chapters</h5>
                                    </div>
                                    <div className="card-body">
                                        <div class="row">
                                            {
                                                commonChapters?.map((item) => {
                                                    return (
                                                        <div class="col-md-6 mt-3">
                                                            <div class="card shadow border border-2">
                                                                <div class="card-body">
                                                                    <h5 class="card-title"><i class="bi bi-journal-text me-2"></i>{item?.chapterName}</h5>
                                                                    <hr></hr>
                                                                    <Link to={"/chapterPage/" + item?._id + "/" + item?.chapterName} class=" btn btn-outline-secondary">Continue <i class="bi bi-arrow-right-circle"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                            : <center><div className="spinner-grow mt-3" role="status"></div></center>
                }
            </div>
            <br></br><br></br>
        </div>
    );
}
export default ConCreChaps