

import React, { useState, useEffect } from "react";
import image4 from "../../images/deptadd.svg";
import "../../App.css";
import swal from "sweetalert";
import validator from "validator";
import jwt_decode from "jwt-decode";
import axios from "axios";

const DepartmentAddChapter = () => {
    const deptID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
    const [chaptername, setChapterName] = useState("");
    const [chapId, setChapId] = useState("");
    const [departments, setDepartments] = useState([]);


    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE+"/departments/showAllDepartments")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const selectedDepartment = departments.find(department => department._id === deptID);
    const selectedDepartmentName = departments.find(department => department._id === deptID)?.depName;
    // console.log(selectedDepartmentName);
    const firstLetter = selectedDepartmentName ? selectedDepartmentName.charAt(0) : "";
    function submitChapter(e) {
        e.preventDefault();

        // Validate chapId starts with the department's first letter
        const pattern = new RegExp(`^${firstLetter}[0-9]+$`);
        if (!pattern.test(chapId)) {
            swal({
                icon: "warning",
                text: `Chapter ID must start with "${firstLetter}"and contain numbers`,
            });
            return;
        }

        // Validate chapter name starts with a capital letter
        if (!chaptername.match(/^[A-Z]/)) {
            swal({
                icon: "warning",
                text: "Chapter name must start with a capital letter.",
            });
            return;
        }

        axios
            .post(process.env.REACT_APP_API_BASE+"/chapters/addChapter", {
                chapterName: chaptername,
                chapId: chapId,
                depID: selectedDepartment,
                userID: jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData._id
            })
            .then((res) => {
                if (res.data.status === true) {
                    swal({
                        icon: "success",
                        text: res.data.message,
                    });
                    setChapId("");
                    setChapterName("");

                } else {
                    swal({
                        icon: "warning",
                        text: res.data.message,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className="container">
            <div className="alert mt-3 heading"><h5>Create Chapter</h5></div>
            <div className="columns mt-5">
                <div>
                    <img src={image4} className="picside7" draggable={false} alt="this is image" />
                </div>
                <div class="card mt-3" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
                    <div class="card-body">
                        <form name="myForm" onSubmit={submitChapter}>

                            <div className="field">
                                <label className="ml-5">Chapter ID</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="cname"
                                        className="inputdata2 my-3 ml-5"
                                        placeholder="Enter Chapter ID"
                                        value={chapId}
                                        onChange={(e) => setChapId(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="ml-5">New Chapter Name</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="cname"
                                        className="inputdata2 my-2 ml-5"
                                        placeholder="Enter Chapter Name"
                                        value={chaptername}
                                        onChange={(e) => setChapterName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <label className="ml-5 my-1">Suitable Department</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="cname"
                                    className="inputdata2 my-2 ml-5"
                                    value={selectedDepartmentName}
                                    disabled={true}
                                />
                            </div>
                            <div className="control">
                                <center>
                                    <button
                                        type="submit"
                                        className="btn btn-success mr-1 column is-half text-white col-md-3 my-3"
                                    >
                                        Create
                                    </button>
                                </center>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default DepartmentAddChapter;

