import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2"
const EnrollRequestSupervisor = () => {
  const depID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
  const [chapters, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE+`/chapters/getEnrolledChapters/${depID}`)
      .then(function (response) {
        setChapter(response.data);
        setLoading(false);
      });
  }, []);

  const handleAction = (empid, chapterid, action) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        const bodytData = {
          empid: empid,
          chapid: chapterid,
          action: action
        }
        axios.post(process.env.REACT_APP_API_BASE+'/chapters/acceptRequest', bodytData)
          .then((res) => {
            if (res.data.status === true) {
              Swal.fire(
                'Request has been handled',
                res.data.message,
                'success'
              )
            } else {
              Swal.fire(
                'Error !',
                res.data.message,
                'danger'
              )
            }
          })
          .catch((error) => {
            console.log(error);
          });

      }
    })
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading">
          <h5>Enroll requests</h5>
        </div>
        <hr className="mt-3"></hr>
        <div class="accordion accordion-flush" id="accordionFlushExample">
          {
            (loading)
              ?
              <center><div className="spinner-grow mt-3" role="status"></div></center>
              :
              (chapters.length === 0)
                ?
                <div className="alert alert-info mt-4"> <b>No requests Found !</b> </div>
                :
                chapters?.map((item) => {
                  return (
                    <div class="accordion-item">
                      <h2 class="accordion-header" id={"chapter1" + item._id}>
                        <button style={{ "backgroundColor": "#e5f4f7" }} class="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target={"#open" + item._id} aria-expanded="false" aria-controls={"open" + item._id}>
                          <b>{item.chapId}-{item.chapterName}</b>
                        </button>
                      </h2>
                      <br></br>
                      <div id={"open" + item._id} class="accordion-collapse collapse" aria-labelledby={"chapter1" + item._id} data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                          <table class="table">
                            <thead>
                              <tr style={{ "backgroundColor": "#b9e1dc" }}>
                                <th scope="col">Image</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Employee Name</th>
                                {/* <th scope="col">Department</th> */}
                                {/* <th scope="col">JobTitle</th>  */}
                                <th scope="col"><center>Action</center></th>
                              </tr>
                            </thead>
                            <tbody style={{ "backgroundColor": "MintCream !important" }}>
                              {
                                item?.requested?.map((emps) => {
                                  return (
                                    <tr>
                                      <td scope="col"><img draggable={false} referrerPolicy="no-referrer" className="shadow rounded-circle" style={{ "width": "40px" }} alt="user" src={emps.userImage}></img></td>
                                      <td scope="col">{emps.empId}</td>
                                      <td scope="col">{emps.firstName}{" "}{emps?.lastName}</td>
                                      {/* <td scope="col">{emps?.department?.departmentName}</td> */}
                                      {/* <th scope="col">{emps.jobPosition}</th>  */}
                                      <td scope="col">
                                        <select className="form-control" onChange={(e) => { handleAction(emps._id, item._id, e.target.value) }}>
                                          <option disabled selected>Select your action</option>
                                          <option value={1}>Accept</option>
                                          <option value={0}>Decline</option>
                                        </select>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                })
          }
        </div>
      </div>
    </React.Fragment >
  );
};

export default EnrollRequestSupervisor;









<<<<<<< HEAD
=======

//this is working that does not have any changes when refresh
// import React, { useState, useEffect } from "react";
// import NavBar from "../../components/NavBar";
// import axios from "axios";
// import employees from "../../data/Employee.json";
// import { Link } from "react-router-dom";
// import jwt_decode from "jwt-decode";

// const EnrollRequestSupervisor = () => {
//   const depID = jwt_decode(JSON.parse(localStorage.getItem("user")).token)
//     .userData.department;
//   console.log(depID);

//   const [chapters, setChapter] = useState(() => {
//     const storedChapters = localStorage.getItem("filteredChapters");
//     return storedChapters ? JSON.parse(storedChapters) : [];
//   });

//   useEffect(() => {
//     axios
//       .get(process.env.REACT_APP_API_BASE+`/chapters/getEnrolledChapters/${depID}`)
//       .then(function (response) {
//         const filteredChapters = response.data.filter(
//           (chapter) => chapter.depID !== null
//         );
//         setChapter(filteredChapters);

//         // Store the filtered chapters in localStorage
//         localStorage.setItem("filteredChapters", JSON.stringify(filteredChapters));
//       });
//   }, []);

//   const [disabledRows, setDisabledRows] = useState([]);
//   const [acceptedRows, setAcceptedRows] = useState(() => {
//     const storedAcceptedRows = localStorage.getItem("acceptedRows");
//     return storedAcceptedRows ? JSON.parse(storedAcceptedRows) : [];
//   });
//   const [declinedRows, setDeclinedRows] = useState(() => {
//     const storedDeclinedRows = localStorage.getItem("declinedRows");
//     return storedDeclinedRows ? JSON.parse(storedDeclinedRows) : [];
//   });

//   const handleAccept = (chapterId, requestId) => {
//     // Perform the accept action here, e.g., send a request to the server

//     // Disable the button for the clicked row
//     const disabledRow = `${chapterId}-${requestId}`;
//     setDisabledRows((prevDisabledRows) => [...prevDisabledRows, disabledRow]);

//     // Add the row to the accepted rows
//     setAcceptedRows((prevAcceptedRows) => [...prevAcceptedRows, disabledRow]);

//     // Store the accepted rows in localStorage
//     localStorage.setItem("acceptedRows", JSON.stringify([...acceptedRows, disabledRow]));
//   };

//   const handleDecline = (chapterId, requestId) => {
//     // Perform the decline action here, e.g., send a request to the server

//     // Disable the button for the clicked row
//     const disabledRow = `${chapterId}-${requestId}`;
//     setDisabledRows((prevDisabledRows) => [...prevDisabledRows, disabledRow]);

//     // Add the row to the declined rows
//     setDeclinedRows((prevDeclinedRows) => [...prevDeclinedRows, disabledRow]);

//     // Store the declined rows in localStorage
//     localStorage.setItem("declinedRows", JSON.stringify([...declinedRows, disabledRow]));

//     // Rest of your code
//     // ...
//   };

//   return (
//     <React.Fragment>
//       <NavBar />
//       <div className="container">
//         <div className="alert mt-3 heading">
//           <h5>Enroll requests</h5>
//         </div>
//         <hr className="mt-3"></hr>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">EmployeeID</th>
//               <th scope="col">Employeename</th>
//               <th scope="col">Jobtitle</th>
//               <th scope="col">Chapter</th>
//               <th scope="col">
//                 <center> Actions</center>
//               </th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {chapters.map((item) => {
//               return item.requested.map((requested) => {
//                 const rowId = `${item._id}-${requested._id}`;
//                 const isAccepted = acceptedRows.includes(rowId);
//                 const isDeclined = declinedRows.includes(rowId);

//                 return (
//                   <tr key={requested._id}>
//                     <td>{requested._id}</td>
//                     <td>{requested.firstName}</td>
//                     <td>{requested.jobPosition}</td>
//                     <td>{item.chapterName}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className={`btn ${isAccepted ? "btn-success" : "btn-secondary"
//                           } form-control`}
//                         disabled={
//                           disabledRows.includes(rowId) || isAccepted || isDeclined
//                         }
//                         onClick={() => handleAccept(item._id, requested._id)}
//                       >
//                         {isAccepted ? "Accepted" : "Accept"}
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         type="button"
//                         className={`btn ${isDeclined ? "btn-danger" : "btn-secondary"
//                           } form-control`}
//                         disabled={
//                           disabledRows.includes(rowId) || isAccepted || isDeclined
//                         }
//                         onClick={() => handleDecline(item._id, requested._id)}
//                       >
//                         {isDeclined ? "Declined" : "Decline"}
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               });
//             })}
//           </tbody>
//         </table>
//       </div>
//     </React.Fragment>
//   );
// };

// export default EnrollRequestSupervisor;






// import React, { useState, useEffect } from "react";
// import NavBar from "../../components/NavBar";
// import axios from "axios";
// import employees from "../../data/Employee.json";
// import { Link } from "react-router-dom";
// import jwt_decode from "jwt-decode";

// const EnrollRequestSupervisor = () => {
//   const depID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
//   console.log(depID);
//   const [chapters, setChapter] = useState([]);

//   useEffect(() => {
//     axios.get(process.env.REACT_APP_API_BASE+`/chapters/getEnrolledChapters/${depID}`)
//       .then(function (response) {
//         const filteredChapters = response.data.filter(chapter => chapter.depID !== null);
//         setChapter(filteredChapters);

//       });
//   }, []);

//   return (
//     <React.Fragment>
//       <NavBar />
//       <div className="container">
//         <div className="alert mt-3 heading"><h5>Enroll requests</h5></div>
//         <hr className="mt-3"></hr>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">EmployeeID</th>
//               <th scope="col">Employeename</th>
//               <th scope="col">Jobtitle</th>
//               <th scope="col">Chapter</th>
//               <th scope="col"><center> Actions</center></th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {chapters.map((item) => {
//               // if (item.requested._id.length === 0) {
//               //   return null;
//               // }
//               return item.requested.map((requested) => {
//                 return (
//                   <tr key={requested._id}>
//                     <td>{requested._id}</td>
//                     <td>{requested.firstName}</td>
//                     <td>{requested.jobPosition}</td>
//                     <td>{item.chapterName}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn btn-success form-control"
//                       >
//                         Accept
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         type="button"
//                         className="btn btn-danger form-control"
//                       >
//                         Decline
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             })
//             }
//           </tbody>
//         </table>
//       </div>
//     </React.Fragment>
//   );
// };

// export default EnrollRequestSupervisor;


>>>>>>> f336ab78e660d828252fc383ef6fa513ab86ac4b
