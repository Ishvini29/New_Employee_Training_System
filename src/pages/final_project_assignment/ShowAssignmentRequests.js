import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ManageFinalProjectAssignmentNav from "./ManageFinalProjectAssignmentNav";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2"
import { IoIosArrowBack } from "react-icons/io"
const ShowAssignmentRequests = () => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const departmentID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department
    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE+`/finalprojectassignment/showRequests/${departmentID}`)
            .then(response => {
                setRequests(response.data);
                setLoading(false);
                // if (response.data.length === 0) {
                //     Swal.fire("", "No Final Project Assignment requests found", "warning");
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return (
        <>
            <div className="container mt-3">
                <Link to="/manageFinalProjectAssignment" className="">
                    <IoIosArrowBack className="align-middle me-1" />
                    Back
                </Link>
                {/* <ManageFinalProjectAssignmentNav /> */}
                <div className="heading text-white p-3 rounded mt-2">
                    Final Project Assignment Requests
                </div>
                {
                    (loading)
                        ?
                        <center><div className="spinner-grow mt-3" role="status"></div></center>
                        :
                        (requests.length === 0)
                            ?
                            <div className="alert alert-info mt-3">No Assignment requests found !</div>
                            :
                            <table className=" mt-3 table table-striped">
                                <thead className="align-middle">
                                    <tr >
                                        <th scope="col">Image</th>
                                        <th scope="col">Request ID</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Requested On</th>
                                        <th scope="col">Contact</th>
                                        <th scope="col">Assign</th>
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
                                                            className="rounded-circle"
                                                            style={{ "width": "40px" }}
                                                            alt="user"
                                                            src={item?.userId?.userImage}
                                                            referrerPolicy="no-referrer"
                                                        ></img>
                                                    </td>
                                                    <td>{item?._id}</td>
                                                    <td>{item?.userId?.firstName}</td>
                                                    <td>{item?.userId?.lastName}</td>
                                                    <td>{new Date(item?.requestedDate).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
                                                    <td>
                                                        <button type="button" class="btn btn-outline-primary form-control" data-bs-toggle="modal" data-bs-target={"#exampleModal" + item?.userID?._id}>
                                                            Show Contact
                                                        </button>
                                                        <div class="modal fade" id={"exampleModal" + item?.userID?._id} tabindex="-1" aria-labelledby={"exampleModalLabel" + item?.userID?._id} aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h1 class="modal-title fs-5" id={"exampleModalLabel" + item?.userID?._id}>Contact Details</h1>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <p>Phone: {item?.userId?.phoneNumber}</p>
                                                                        <hr></hr>
                                                                        <p>Email: <a href={"mailto:" + item?.userId?.emailAddress}> {item?.userId?.emailAddress} </a></p>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary form-control" data-bs-dismiss="modal">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link to={"/assignFinalProjectAssignment/" + item?._id + "/" + item?.userId?._id} className="btn btn-outline-success">
                                                            Assign
                                                        </Link>
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
export default ShowAssignmentRequests