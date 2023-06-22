import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import swal from 'sweetalert'
import axios from "axios"
import jwt_decode from "jwt-decode";

const PromoteDemoteSystemAdmin = () => {
    const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
    const depid = userDocument.department;
    const [users, setUsers] = useState([]);

    const [selectedRole, setSelectedRole] = useState("");
    const [loadAgain, setLoadAgain] = useState(1);

    useEffect(() => {
        // /userRoles/groupbyuserrole
        axios.get(process.env.REACT_APP_API_BASE+`/users/showAllUsers/systemadmin/${depid}`, {
            headers: {
                'token': JSON.parse(localStorage.getItem("user")).token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [loadAgain])


    const doUpdate = (userID, newUserRole, name, currentUserRole) => {
        swal({
            title: "Confirm",
            text: `Do you want to change the ${name}'s user role from ${currentUserRole} to ${newUserRole} ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const newRole = { userID: userID, newRole: newUserRole };
                axios.post(process.env.REACT_APP_API_BASE+'/userRoles/changeUserRole', newRole)
                    .then((res) => {
                        if (res.data.status) {
                            swal({
                                icon: "success",
                                text: res.data.message
                            });
                            setLoadAgain(loadAgain + 1);
                        } else {
                            swal({
                                icon: "warning",
                                text: res.data.message
                            });
                        }
                        // setSelectedRole('');
                    })
                    .catch((error) => {
                        console.log(error);
                        swal({
                            icon: "warning",
                            text: "Network",
                        });
                    });
            } else {
                swal("Action Terminated. User is safe.", {
                    icon: "success",
                });
            }
        });
    }

    // const selectedDepartmentName = departments.find(department => department._id === deptID)?.depName;
    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="shadow p-3 heading rounded-3 mb-3"><h4>Promote or Demote User</h4></div>
                <select className="form-control" onChange={(e) => setSelectedRole(e.target.value)}>
                    <option selected disabled> Select User Role to View</option>
                    <option value={"Hired Employee"} >Hired Employee</option>
                    <option value={"Content Creator"} >Content Creator</option>
                    <option value={"Supervisor"} >Supervisor</option>
                </select>
                {
                    (selectedRole === "")
                        ?
                        <div className="mt-5 shadow alert alert-danger">Please select a user role</div>
                        :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Current User Role</th>
                                    <th scope="col">Select New Role</th>
                                    {/* <th scope="col">Save</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((item) => {
                                        return (
                                            (item.userRole === selectedRole)
                                                ?
                                                <>
                                                    <tr className="align-middle ">
                                                        <th scope="row"><img draggable={false} referrerPolicy="no-referrer" className="shadow rounded-circle" style={{ "width": "40px" }} alt="user" src={item.userImage}></img></th>
                                                        <td>{item?.firstName}</td>
                                                        <td>{item?.lastName}</td>
                                                        <td>{item?.department?.depName}</td>
                                                        <td>{item?.userRole}</td>
                                                        <td>
                                                            <select className="form-control" onChange={(e) => doUpdate(item?._id, e.target.value, item?.firstName, item?.userRole)}>
                                                                <option selected value="" disabled>Select User Role</option>
                                                                {(selectedRole === "Hired Employee") ? null : <option value={"Hired Employee"} >Hired Employee</option>}
                                                                {(selectedRole === "Content Creator") ? null : <option value={"Content Creator"} >Content Creator</option>}
                                                                {(selectedRole === "Supervisor") ? null : <option value={"Supervisor"} >Supervisor</option>}
                                                                {(selectedRole === "System Admin") ? null : <option value={"System Admin"} >System Admin</option>}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </>
                                                : null
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                }

            </div>

        </React.Fragment>
    );
}
export default PromoteDemoteSystemAdmin;