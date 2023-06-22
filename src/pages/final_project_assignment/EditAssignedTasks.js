import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import { getTimeFormat } from "../../utils/functions";
import { IoIosArrowBack } from "react-icons/io"
const EditAssignedTasks = () => {
    const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
    const depid = userDocument.department;
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE+`/finalprojectassignment/getAssigned/${depid}`)
            .then(response => {
                setRequests(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    const deleteAssignedAssignment = (projectID) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want delete assigned final project assignment? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(process.env.REACT_APP_API_BASE+`/finalprojectassignment/deleteAssignedAssignment`, { projectID: projectID })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.status === true) {
                            Swal.fire("Success !", res.data.message, "success");
                        } else {
                            Swal.fire("Failed !", res.data.message, "error");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire("Failed !", "Network Error", "error");
                    });
            }
        })
    }
    return (
        <>
            <div className="container mt-3">
                {/* <ManageFinalProjectAssignmentNav /> */}
                <Link to="/manageFinalProjectAssignment" className="">
                    <IoIosArrowBack className="align-middle me-1" />
                    Back
                </Link>
                <div className="heading text-white p-3 rounded mt-2">
                    Edit assigned final project assignments
                </div>
                {
                    (loading)
                        ?
                        <center><div className="spinner-grow mt-5" role="status"></div></center>
                        :
                        (requests.length === 0)
                            ?
                            <div className="alert alert-info mt-3">No Project assignments found</div>
                            :
                            <table className=" mt-3 table table-striped">
                                <thead className="align-middle">
                                    <tr >
                                        <th scope="col">Employee Name</th>
                                        <th scope="col">Assigned By</th>
                                        <th scope="col">Requested On</th>
                                        <th scope="col">Assigned On</th>
                                        <th scope="col">Deadline</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        requests?.map((item) => {
                                            return (
                                                <tr className="align-middle">
                                                    <td >
                                                        <img
                                                            draggable={false}
                                                            className="rounded-circle me-2"
                                                            style={{ "width": "40px" }}
                                                            alt="user"
                                                            src={item?.userId?.userImage}
                                                            referrerPolicy="no-referrer"
                                                        ></img>
                                                        {item?.userId?.firstName + "  " + item?.userId?.lastName}
                                                    </td>
                                                    <td >
                                                        <img
                                                            draggable={false}
                                                            className="rounded-circle me-2"
                                                            style={{ "width": "40px" }}
                                                            alt="user"
                                                            src={item?.acceptedBy?.userImage}
                                                            referrerPolicy="no-referrer"
                                                        ></img>
                                                        {item?.acceptedBy?.firstName + "  " + item?.acceptedBy?.lastName}
                                                    </td>
                                                    <td>{new Date(item?.requestedDate).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
                                                    <td>{new Date(item?.assignedOn).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
                                                    <td>{getTimeFormat(item?.projectDeadLine).timeString + " Left"}</td>
                                                    <td>
                                                        <Link to={"/updateFinalProjectAssignment/" + item?._id} className="btn btn-outline-success">
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-outline-danger" onClick={() => { deleteAssignedAssignment(item?._id) }}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                }

            </div>
        </>
    )
}
export default EditAssignedTasks