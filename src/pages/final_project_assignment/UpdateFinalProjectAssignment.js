import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2"
import axios from "axios"
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { removeHTMLTags } from "../../utils/functions";

const UpdateFinalProjectAssignment = () => {
    const userData = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData?._id
    console.log(userData);
    const { id } = useParams();
    // to store data from api
    const [fetchData, setFetchData] = useState({})
    // form data
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [deadline, setDeadline] = useState();
    // file upload states
    const [showUploadFileInput, setShowUploadFileInput] = useState(false);
    const [deleteUploadedFile, setDeleteUploadedFile] = useState(false);
    const [newFile, setNewFile] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE+`/finalprojectassignment/getOneAssignmentByProjectID/${id}`)
            .then(response => {
                setFetchData(response.data[0]);
                if (response.data.status === false) {
                    Swal.fire("Error", response.data.message, "error");
                    navigate("/editAssignedProjectAssignment")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        setTitle(fetchData?.projectName)
        setDescription(fetchData?.projectDescription)
        const date = new Date(fetchData?.projectDeadLine)
        const year = date.getFullYear().toString().padStart(4, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const fullDate = `${year}-${month}-${day}T${hour}:${min}`
        console.log(fullDate)
        setDeadline(fullDate)
    }, [fetchData])

    const handleShowUpload = () => {
        if (showUploadFileInput === false) {
            setShowUploadFileInput(true);
        } else {
            setShowUploadFileInput(false);
            setNewFile([])
        }
    }

    const handleDeleteOption = () => {
        if (deleteUploadedFile === false) {
            Swal.fire("", "Attached file will be deleted when you click Submit button", "info");
            setNewFile([])
            setDeleteUploadedFile(true);
        } else {
            Swal.fire("", "Your file is safe", "info");
            setDeleteUploadedFile(false);
        }
    }

    const modules = {
        toolbar: [
            [{ font: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
            ["link", "video"],
        ],
    };

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(deadline);
        if (!fetchData?.uploadedFileBySupervisor) {
            console.log("Hello")
            if (removeHTMLTags(description).trim() === '' && newFile.length === 0) {
                Swal.fire("Error In Submitting Assignment", "Note and File both can not be empty. Add note or upload file as assignment submission.", "error");
                return;
            }
        }
        if (deleteUploadedFile === true && newFile.length === 0 && removeHTMLTags(description).trim() === '') {
            Swal.fire("Error In Submitting Assignment", "Note and File both can not be empty. You deleted added file previously. Add note or upload file as assignment submission.", "error");
            return;
        }
        if (title.trim() === "") {
            Swal.fire("Error In Submitting Assignment", "Title can not be empty.", "error");
            return;
        }
        if (deadline === undefined || deadline.trim() === "") {
            Swal.fire("Error In Submitting Assignment", "Deadline can not be empty.", "error");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("finalprojectassignmentid", id);
        formData.append("description", description);
        formData.append("deadline", deadline);
        formData.append("supervisor", userData)
        formData.append("needtoDeleteAttachment", deleteUploadedFile)
        if (showUploadFileInput) {
            formData.append("newFile", newFile[0])
        }
        try {
            axios.post(
                process.env.REACT_APP_API_BASE+"/finalprojectassignment/updateFinalProjectAssignment",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            ).then(res => {
                if (res.data.status === true) {
                    Swal.fire("", res.data.message, "success");
                    navigate("/editAssignedProjectAssignment")
                } else {
                    Swal.fire("Error", res.data.message, "error");
                }

            }).catch(err => {
                console.log(err)
            })
        } catch (err) {
            console.log(err);
        }

    }

    const date = new Date();
    const minDate = `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    const maxDate = `${date.getFullYear().toString().padStart(4, "0")}-${(date.getMonth() + 1 + 6).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`

    return (
        <React.Fragment>
            <div className="mt-4 container mb-5">

                <div className="bg-dark text-white p-3 rounded">
                    <b>Update Final Project Assignment</b>
                </div>



                <form className="mt-4" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Final Project Assignment Title"
                            id="title"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                        <label htmlFor="title">Final Project Assignment Title</label>
                    </div>

                    <ReactQuill
                        className="form-floating mb-3"
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        placeholder="Enter Final Project Assignment Description"
                    />
                    <div className="form-floating mb-3">
                        <input
                            type="datetime-local"
                            value={deadline}
                            className="form-control"
                            placeholder="Deadline"
                            min={minDate}
                            max={maxDate}
                            onChange={(e) => { setDeadline(e.target.value) }}
                            id="dl"
                        ></input>
                        <label htmlFor="dl">Select Deadline [MM/DD/YYYY]</label>
                    </div>
                    <div className="form-control mb-3">
                        <b>Uploaded File: </b>
                        {
                            (fetchData?.uploadedFileBySupervisor)
                                ?
                                <span>

                                    <a href={fetchData?.uploadedFileBySupervisor}>{fetchData?.supAttachOriginalName}</a>
                                    {"    "}
                                    <input
                                        type="checkbox"
                                        class="btn-check"
                                        id="btn-check-outlined"
                                        autocomplete="off"
                                        onChange={handleDeleteOption}
                                    />
                                    <label class="btn btn-sm btn-outline-danger" for="btn-check-outlined">Delete Uploaded File</label><br></br>
                                </span>
                                :
                                <strong> No Attachment Available </strong>
                        }

                    </div>
                    <p className="text-danger fw-bold">
                        {
                            (deleteUploadedFile === false && newFile.length !== 0)
                                ? "Your new file will be uploaded automatically. To cancel uploading new file untick the checkbox."
                                : null
                        }
                    </p>
                    <div className="form-control mb-3">
                        <input
                            type="checkbox"
                            className="me-3"
                            onChange={handleShowUpload}
                            id="dx"
                        ></input>
                        <label htmlFor="dx">
                            <strong>Check this if you want to update the uploaded file also.</strong>
                        </label>
                        {
                            showUploadFileInput &&
                            <div className="mb-3 mt-3">
                                <input
                                    className="form-control"
                                    accept=".zip, .rar"
                                    type="file"
                                    onChange={(e) => { setNewFile(e.target.files) }}
                                />
                                <font size="2">
                                    <strong>
                                        <span className="me-3"></span>
                                        * Only <i>.zip .rar .7zip </i> Files are allowed, File should be less than 50 MB
                                    </strong>
                                </font>
                            </div>
                        }

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button
                                type="submit"
                                className="form-control btn btn-outline-primary">
                                Submit
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button
                                type="reset"
                                className="form-control btn btn-outline-warning">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment >
    );
};
export default UpdateFinalProjectAssignment;