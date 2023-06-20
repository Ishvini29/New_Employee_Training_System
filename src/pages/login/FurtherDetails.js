import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../App.css";
const FurtherDetails = (props) => {

    // To store department data, it contains, department data and job titles data
    const [availableDepartments, setAvailableDepartments] = useState([]);

    const schema = yup.object().shape({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        employeeID: yup.string().required('Employee ID is required'),
        gender: yup
            .string()
            .oneOf(['Male', 'Female', 'No'], 'Invalid gender')
            .required('Gender is required'),
        dateOfBirth: yup.date("Invalid Date").required('Date of Birth is required').typeError('Date of Birth must be a valid date'),
        phoneNumber: yup.string().matches(/^\d{10}$/, 'Phone Number must be a 10-digit number without spaces or dashes').required('Phone Number is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        department: (availableDepartments.length !== 0) ? yup.string().required('Department is required') : yup.string(),
        jobTitle: (availableDepartments.length !== 0) ? yup.string().required('Job Title is required') : yup.string(),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

    const [department, setDepartment] = useState();
    const [userImage] = useState(props.userData.picture);

    // State to store, whether department is available or not
    // if department is available it will be set to true
    const [isDepAvailable, setIsDepAvailable] = useState(false);

    // if user collection is empty true else false will be assigned
    const [noUser, setNoUser] = useState(false);

    // to set calender's maximum and minimum date 
    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear - 15}-12-31`; // Set maximum date to last day of current year
    const minDate = `${currentYear - 80}-01-01`; // Set minimum date to first day of previous year

    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    // here use effect to used to fetch department and user availability data in first render
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_BASE+"/departments/showAllDepartments")
            .then(function (response) {
                setAvailableDepartments(response.data);
                console.log(response.data);
                if (response.data.length === 0) {
                    setIsDepAvailable(false);
                } else {
                    setIsDepAvailable(true);
                }
            });
        axios
            .get(process.env.REACT_APP_API_BASE+"/users/isUserCollectionEmpty")
            .then(function (response) {
                setNoUser(response.data.status);
                setLoading(false);
            });
    }, [])

    // function to hande form submission
    const submitFurtherDetails = (data) => {
        setSubmitLoading(true);
        const postData = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            dob: data.dateOfBirth,
            phone: data.phoneNumber,
            email: data.email,
            department: data.department,
            jobTitle: data.jobTitle,
            userImage: userImage,
            employeeID: data.employeeID
        }
        axios.post(process.env.REACT_APP_API_BASE+'/authentication/addFurtherDetails', postData)
            .then((res) => {
                // if further data saved successfully
                if (res.data.status === "success") {
                    Swal.fire({
                        title: 'Further Details Added Successfully !',
                        text: res.data.message,
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Continue'
                    }).then((result) => {
                        window.location.reload();
                    })
                    // if user trying to or, accidently access the page after submit the further details
                    // to prevent duplicate entry in database, email is set to unique in database schema
                } else if (res.data.status === "duplicate") {
                    swal("Warning", res.data.message, "warning")
                }
                setSubmitLoading(false);
            }).catch((error) => {
                swal("Error", "Error saving data to the database", "error");
            });
    }

    return (
        <React.Fragment>
            {
                (loading)
                    ?
                    <center><div className="spinner-grow" role="status"></div></center>
                    :
                    // ((availableDepartments.length === 0 && availableJobTitles.length === 0) && !(noUser))
                    ((isDepAvailable === false) && (noUser === false))
                        ?
                        // if super admin, signed in and didnt create the department and job title, this will be displayed
                        <div className="container mt-5">
                            <div className="alert alert-danger"><b>Sorry, Setup in Progress. Try again Later !</b></div>
                        </div>
                        :
                        <div className="container mt-3">

                            {
                                // (availableDepartments.length === 0 && availableJobTitles.length === 0) &&
                                // (availableDepartments.length === 0) &&
                                // it is the state of " is user collection empty" end point
                                // if empty, true else false
                                // if variable is true, this attention alert will be shown
                                (noUser) &&
                                <div className="alert alert-warning">
                                    <b><i className="bi bi-info-circle-fill"></i> Attention:</b> You are the very first user of
                                    this application, which means
                                    <b> you have been automatically assigned the role of Super Admin</b>. Any updates
                                    you make to your personal details will affect your account accordingly.
                                    Please proceed with caution !
                                </div>
                            }
                            <div className="card shadow shadow-lg" >
                                <div className="card-header bg-dark ">
                                    <center>
                                        <img draggable={false} referrerPolicy="no-referrer" alt="userImage" src={props.userData.picture} className=" p-3 rounded-circle"></img>
                                    </center>
                                </div>
                                <form onSubmit={handleSubmit(submitFurtherDetails)}>
                                    <div className="card-body mt-3">
                                        <div className="row m-2">
                                            {/* First Name */}
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={props.userData.given_name}
                                                        {...register("firstName")}
                                                    >
                                                    </input>
                                                    <label htmlFor="fname">First Name</label>
                                                </div>
                                                <p className="errorMessageAddFurtherDetails">{errors.firstName?.message}</p>
                                            </div>
                                            {/* Last Name */}
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        defaultValue={props.userData.family_name}
                                                        {...register("lastName")}
                                                    >
                                                    </input>
                                                    <label htmlFor="lastname">Last Name</label>
                                                </div>
                                                <p className="errorMessageAddFurtherDetails">{errors.lastname?.message}</p>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            {/* Gender */}
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                {...register("employeeID")}
                                                            >
                                                            </input>
                                                            <label htmlFor="fname">Employee ID</label>
                                                        </div>
                                                        <p className="errorMessageAddFurtherDetails">{errors.employeeID?.message}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3">
                                                            <select id="gender" className="form-control" {...register("gender")}>
                                                                <option selected value="" disabled>Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="No">Prefer not to say</option>
                                                            </select>
                                                            <label htmlFor="gender">Select your gender</label>
                                                        </div>
                                                        <p className="errorMessageAddFurtherDetails">{errors.gender?.message}</p>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Date of Birth */}
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        max={maxDate}
                                                        min={minDate}
                                                        {...register("dateOfBirth")}
                                                    >
                                                    </input>
                                                    <label htmlFor="dob">Select your Date of Birth</label>
                                                </div>
                                                <p className="errorMessageAddFurtherDetails">{errors.dateOfBirth?.message}</p>

                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            {/* Phone Number */}
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        {...register("phoneNumber")}
                                                    >
                                                    </input>
                                                    <label htmlFor="phone">Phone Number</label>
                                                </div>
                                                <p className="errorMessageAddFurtherDetails">{errors.phoneNumber?.message}</p>
                                            </div>
                                            {/* Email Address */}
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        defaultValue={props.userData.email}
                                                        {...register("email")}
                                                        readOnly
                                                    >
                                                    </input>
                                                    <label htmlFor="email">Email Address</label>
                                                </div>
                                                <p className="errorMessageAddFurtherDetails">{errors.email?.message}</p>

                                            </div>
                                        </div>
                                        {
                                            (availableDepartments.length !== 0)
                                            &&
                                            <div className="row m-2">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3">
                                                        <select id="dep" className="form-control" {...register("department")} onChange={e => setDepartment(e.target.value)}>
                                                            <option selected value="" disabled>Select Department</option>
                                                            {
                                                                availableDepartments.map((e) => {
                                                                    return (
                                                                        <option value={e._id}>{e.depName}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <label htmlFor="dep">Select your department</label>
                                                    </div>
                                                    <p className="errorMessageAddFurtherDetails">{errors.department?.message}</p>
                                                </div>
                                                {

                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3">
                                                            <select id="jt" className="form-control" {...register("jobTitle")}>
                                                                <option selected value="" disabled>Select Job Title</option>
                                                                {
                                                                    availableDepartments.find(dep => dep._id === department)?.Jobtitle.map((e) => {
                                                                        return (
                                                                            <option value={e?._id}>{e.jobTitlename}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                            <label htmlFor="jt">Select your job title</label>
                                                        </div>
                                                        <p className="errorMessageAddFurtherDetails">{errors.jobTitle?.message}</p>
                                                    </div>
                                                }
                                            </div>
                                        }

                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button
                                                    className="m-2 btn btn-outline-success form-control"
                                                    type="submit"
                                                    disabled={submitLoading}
                                                >
                                                    {
                                                        (submitLoading)
                                                            ?
                                                            <>
                                                                <span className='spinner-grow spinner-grow-sm me-3' role="status"></span>
                                                                Please Wait...
                                                            </>
                                                            :
                                                            "Submit Details"
                                                    }
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <input className="m-2 btn btn-outline-warning form-control" type="reset" value="Reset"></input>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
            }
            <br></br>
        </React.Fragment>
    );
}
export default FurtherDetails;