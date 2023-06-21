import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import axios from "axios"
const PendingUserApproval = () => {
    // to set unverified users from user collection
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [refresh, setRefresh] = useState(1);
    const [loading, setLoading] = useState(false);
    const [currentActiveButton, setCurrentActiveButton] = useState();
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        setPageLoading(true);
        axios.get(process.env.REACT_APP_API_BASE+'/users/getAllUnverifiedUsers')
            .then(response => {
                setUnverifiedUsers(response.data);
                setPageLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [refresh])

    // this is function takes, result (can be alllow and deny), userid, email as input
    // send user verification data to backend
    const verification = (result, userID, email) => {
        setCurrentActiveButton(userID);
        const bodyData = {
            result: result,
            userid: userID,
            email: email
        }
        var message = "";
        if (result === "allow") {
            message = "Do you want to allow this user to access ?"
        } else {
            message = "Do you want delete this user from the system permanently ?"
        }
        swal({
            title: "Confirm",
            text: message,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                setLoading(true);
                axios.post(process.env.REACT_APP_API_BASE+'/users/verifyuser', bodyData)
                    .then((res) => {
                        setLoading(false);
                        console.log(res.data);
                        swal({
                            icon: "success",
                            text: res.data.message,
                        });
                        setRefresh(refresh + 1);
                    })
                    .catch((error) => {
                        console.log(error);
                        swal({
                            icon: "warning",
                            text: "Error",
                        });
                    });
            } else {
                swal("Action Terminated.", {
                    icon: "success",
                });
            }
        });
    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="form-control mt-3 bg-dark text-white"><b>Hired Employee Requests</b></div>
                {
                    (pageLoading)
                        ?
                        <center><div className="spinner-grow mt-5" role="status"></div></center>
                        :
                        (unverifiedUsers.length === 0)
                            ?
                            <div className="alert alert-info mt-4"> <b>No Unverified Users Found !</b> </div>
                            :
                            <div className="table-responsive">
                                <table className=" text-center mt-3 table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Employee ID</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Job Title</th>
                                            <th scope="col">Department</th>
                                            <th scope="col">Requested On</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Allow</th>
                                            <th scope="col">Deny</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            unverifiedUsers.map((item) => {
                                                return (
                                                    <tr className="align-middle">
                                                        <th scope="row"><img referrerPolicy="no-referrer" draggable={false} className="rounded-circle" style={{ "width": "40px" }} alt="user" src={item?.image}></img></th>
                                                        <th>{item?.empId}</th>
                                                        <th>{item?.fname}</th>
                                                        <th>{item?.lname}</th>
                                                        <td>{item?.jobTitle?.jobTitle}</td>
                                                        <td>{item?.department?.departmentName}</td>
                                                        <td>{new Date(item?.submittedOn).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-outline-primary form-control" data-bs-toggle="modal" data-bs-target={"#exampleModal" + item?.userID}>
                                                                Show Contact
                                                            </button>
                                                            <div class="modal fade" id={"exampleModal" + item?.userID} tabindex="-1" aria-labelledby={"exampleModalLabel" + item?.userID} aria-hidden="true">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5" id={"exampleModalLabel" + item?.userID}>Contact Details</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div class="modal-body">
                                                                            <p>Phone: {item.phone}</p>
                                                                            <hr></hr>
                                                                            <p>Email: <a href={"mailto:" + item.email}> {item.email} </a></p>
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {
                                                                (currentActiveButton === item?.userID && loading)
                                                                    ?
                                                                    <button className="btn btn-outline-warning form-control" type="button" disabled>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                        Processing...
                                                                    </button>
                                                                    :
                                                                    <button onClick={() => verification("allow", item?.userID, item?.email)} type="button" className="btn btn-outline-success form-control">
                                                                        Allow
                                                                    </button>
                                                            }

                                                        </td>
                                                        <td>
                                                            {
                                                                (currentActiveButton === item?.userID && loading)
                                                                    ?
                                                                    <button className="btn btn-outline-warning form-control" type="button" disabled>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                        Processing...
                                                                    </button>
                                                                    :
                                                                    <button onClick={() => verification("deny", item?.userID, item?.email)} type="button" className="btn btn-outline-danger form-control">
                                                                        Deny
                                                                    </button>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                }

            </div>
        </React.Fragment>
    );
}
export default PendingUserApproval;