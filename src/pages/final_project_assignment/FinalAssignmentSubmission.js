import { useEffect, useState } from "react"
import axios from "axios"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { getTimeFormat, removeHTMLTags } from "../../utils/functions";
import { modules } from "../../utils/ReactQuillModules";
const FinalAssignmentSubmission = () => {
    const navigate = useNavigate();
    const userData = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData._id
    const [assignment, setAssignment] = useState();
    const [time, setTime] = useState({});
    const [note, setNote] = useState("");
    const [file, setFiles] = useState([]);
    const [isAssignmentRequested, setIsAssignmentRequested] = useState();
    const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE+`/finalprojectassignment/getOneAssignment/${userData}`)
            .then(response => {
                if (response.data[0].isProjectAssigned === true) {
                    setIsAssignmentRequested(true);
                }
                setAssignment(response.data[0]);
                setTime(getTimeFormat(response.data[0]?.projectDeadLine))
                setIsAssignmentSubmitted((response?.data[0]?.submittedDate) ? true : false);
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
                console.log("Completed")
                setLoading(false);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (removeHTMLTags(note).trim() === '' && file.length === 0) {
            Swal.fire("Error In Submitting Assignment", "Note and File both can not be empty. Add note or upload file as assignment submission.", "error");
            return;
        }
        const formData = new FormData();
        formData.append("note", note);
        formData.append("finalProjectAssignmentID", assignment?._id);
        formData.append("supervisor", assignment?.acceptedBy?._id);
        if (file.length !== 0) {
            formData.append("ufile", file[0]);
        }
        try {
            axios.post(process.env.REACT_APP_API_BASE+"/addFinalProjectSubmission", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === true) {
                        Swal.fire(res.data.message, "", "success");
                        navigate("/home")
                    } else {
                        Swal.fire("Error In Submitting Assignment", res.data.message, "error");
                    }
                }).catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
            alert("Error Occured")
        }
    }

    return (
        <div>
            {
                (loading)
                    ?
                    <center><div className="spinner-grow mt-3" role="status"></div></center>
                    :
                    <>
                        {
                            (isAssignmentRequested === false)
                                ?
                                <div className="container">
                                    <Link to="/home" className="mt-5 btn btn-light border border-dark form-control">
                                        Final Project Assignment is not Requested Yet. Move to Learn Chapter Page to Request
                                    </Link>
                                </div>
                                :
                                <div className="mt-4 container">
                                    <div className="bg-dark text-white p-3 rounded">
                                        Project Assignment
                                    </div>
                                    <div className="border rounded p-3 mt-3">
                                        <h6>Project Title: {assignment?.projectName}</h6>
                                        {
                                            (assignment?.isProjectSubmitted)
                                                ?
                                                <h6>Submitted on: {new Date(assignment?.submittedDate).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</h6>
                                                :
                                                <h6>Deadline: {new Date(assignment?.projectDeadLine).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</h6>
                                        }
                                        {
                                            (assignment?.isProjectSubmitted)
                                                ?
                                                null
                                                :
                                                <h6>
                                                    Deadline Status:
                                                    {
                                                        (time.status === false)
                                                            ?
                                                            <span style={{ "color": "red" }}>
                                                                {" Assignment overdued by " + time.timeString}
                                                            </span>
                                                            :
                                                            <span style={{ "color": "green" }}>
                                                                {" " + time.timeString + " Left"}
                                                            </span>
                                                    }
                                                </h6>
                                        }

                                        {
                                            (assignment?.supAttachFileSize)
                                                ?
                                                <h6>Attachment:{"  "}
                                                    <span>
                                                        <a href={assignment?.uploadedFileBySupervisor}>
                                                            {
                                                                assignment?.supAttachOriginalName
                                                            }
                                                        </a>
                                                        {"  (" + assignment?.supAttachFileSize + " Bytes)"}
                                                    </span>
                                                </h6>
                                                :
                                                null
                                        }
                                        <h6>
                                            Assigned By:{"   "}
                                            <button
                                                className="btn btn-light border border-dark btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target={"#openModal"}
                                            >
                                                {"  " + assignment?.acceptedBy?.firstName + "  " + assignment?.acceptedBy?.lastName}
                                            </button>
                                        </h6>
                                        {
                                            (assignment?.show === false)
                                                ? null
                                                :
                                                <h6>
                                                    Feedback:{"   "}
                                                    <Link to="/feedback" className="btn btn-outline-primary border border-dark btn-sm">
                                                        View Feedback
                                                    </Link>
                                                </h6>
                                        }
                                        <div className="modal fade" id={"openModal"} tabindex="-1" aria-labelledby={"exampleModal"} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id={"exampleModal"}>Contact Details</h1>

                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <center>
                                                            <img
                                                                draggable={false}
                                                                referrerPolicy="no-referrer"
                                                                width={150}
                                                                height={150}
                                                                alt="userImage"
                                                                src={assignment?.acceptedBy?.userImage}
                                                                className="p-3 rounded-circle">
                                                            </img>
                                                        </center>
                                                        <hr></hr>
                                                        <p>Phone: {assignment?.acceptedBy?.phoneNumber}</p>
                                                        <hr></hr>
                                                        <p>Email: <a href={"mailto:" + assignment?.acceptedBy?.emailAddress}> {assignment?.acceptedBy?.emailAddress} </a></p>
                                                        <hr></hr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border rounded p-3 mt-3">
                                        <p>
                                            <button class="btn btn-light border border-dark form-control" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                Show Project Description
                                            </button>
                                        </p>
                                        <div class="collapse" id="collapseExample">
                                            <div class="card card-body">
                                                <div dangerouslySetInnerHTML={{ __html: assignment?.projectDescription }} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        (!isAssignmentSubmitted)
                                        &&
                                        <div className="border rounded p-3 mt-3 mb-5">
                                            <div className="bg-dark text-white p-3 rounded">
                                                Submit Your Answer
                                            </div>
                                            {
                                                (time.status === false)
                                                    ?
                                                    <div className="alert alert-danger mt-3">
                                                        <strong>
                                                            Assignment Overdued. Contact{"  "}
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target={"#openModal"}
                                                            >
                                                                {assignment?.acceptedBy?.firstName + "  " + assignment?.acceptedBy?.lastName}
                                                            </button>
                                                            {"  "}
                                                            to reschedule.</strong></div>
                                                    :
                                                    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data" >
                                                        <ReactQuill
                                                            className="form-floating mb-3 mt-3"
                                                            theme="snow"
                                                            value={note}
                                                            onChange={setNote}
                                                            modules={modules}
                                                            placeholder="Enter Your Note Here..."
                                                            required
                                                        />
                                                        <div className="mb-3">
                                                            <input
                                                                className="form-control"
                                                                accept=".zip, .rar"
                                                                type="file"
                                                                onChange={(e) => { setFiles(e.target.files) }}
                                                            />
                                                            <font size="2">
                                                                <strong>
                                                                    <span className="me-3"></span>
                                                                    * Only <i>.zip .rar .7zip </i> Files are allowed, File should be less than 50 MB
                                                                </strong>
                                                            </font>
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className="form-control btn btn-outline-success">
                                                            Submit
                                                        </button>
                                                    </form>
                                            }

                                        </div>
                                    }

                                    {
                                        (assignment?.submittedDate)
                                        &&
                                        <div className="border rounded p-3 mt-3">
                                            <p>
                                                <button
                                                    class="btn btn-light border border-dark form-control"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseSubmission"
                                                    aria-expanded="false"
                                                    aria-controls="collapseSubmission"
                                                >
                                                    Show Project Submission
                                                </button>
                                            </p>
                                            <div class="collapse" id="collapseSubmission">
                                                <div class="card card-body">
                                                    <h6>Submitted Note</h6>
                                                    <div
                                                        className="border rounded p-3 mb-3"
                                                        dangerouslySetInnerHTML={{ __html: assignment?.uploadedDescriptionByEmployee }}
                                                    />
                                                    {
                                                        (assignment?.uploadedFileByEmployee)
                                                            ?
                                                            <h6>Attachment:{"  "}
                                                                <a href={assignment?.uploadedFileByEmployee}>
                                                                    {
                                                                        assignment?.empAttachOriginalName
                                                                    }
                                                                </a> {"  "}
                                                                ({assignment?.empAttachFileSize} bytes)
                                                            </h6>
                                                            :
                                                            null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                        }
                    </>
            }
        </div>
    )
}
export default FinalAssignmentSubmission
