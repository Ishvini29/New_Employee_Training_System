import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import job from "../../images/job.png";

const AllocateChapter = () => {
  const department = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + "/jobtitles/showAllJobtitles")
      .then(function (response) {
        setDepartments(response.data);
      });
  }, []);

  // filter departments based on departmentID
  const filteredDepartments = departments.filter((dep) => dep._id === department);

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading"><h5>Allocate Default Chapters</h5></div>
        <br></br>
        <table className="table">
          <tbody>
            {filteredDepartments.map((department, index) => {
              return department.Jobtitle.map((jobtitle, j) => {
                return (
                  <tr className="align-middle" key={jobtitle._id}>
                    {/* <td>{jobtitle._id}</td> */}
                    <img src={job} className="picside9" draggable={false} alt="this is job" />
                    <td>{jobtitle.jobTitlename}</td>

                    <td>
                      <button className="button-result">
                        <Link
                          to={"/editallocatechapter/" + jobtitle._id + "/" + jobtitle.jobTitlename}
                          className="showBut text-decoration-none"
                        >
                          Add chapters
                        </Link>
                      </button>
                    </td>
                  </tr>

                );

              })
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment >
  );
};
export default AllocateChapter;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import Swal from "sweetalert2";
// import job from "../../images/job.png";

// const AllocateChapter = () => {
//   const department = jwt_decode(JSON.parse(localStorage.getItem("user")).token)
//     .userData.department;
//   const [departments, setDepartments] = useState([]);
//   useEffect(() => {
//     axios
//       .get(process.env.REACT_APP_API_BASE + "/jobtitles/showAllJobtitles")
//       .then(function (response) {
//         setDepartments(response.data);
//       });
//   }, []);

//   // filter departments based on departmentID
//   const filteredDepartments = departments.filter((dep) => dep._id === department);

//   return (
//     <React.Fragment>
//       <div className="container">
//         <div className="alert mt-3 heading">
//           <h5>Allocate Default Chapters</h5>
//         </div>
//         <br></br>
//         <table className="table">
//           <tbody>
//             {filteredDepartments.map((department, index) => {
//               return department.Jobtitle.map((jobtitle, j) => {
//                 return (
//                   <tr className="align-middle" key={jobtitle._id}>
//                     <img src={job} className="picside9" draggable={false} alt="this is job" />
//                     <td>
//                       <td
//                         onClick={() => {
//                           Swal.fire({
//                             title: "Allocated Chapters",
//                             text: jobtitle.chaptersAllocated,
//                             icon: "info",
//                             confirmButtonText: "OK",
//                           });
//                         }}
//                       >
//                         {jobtitle.jobTitlename}
//                       </td>
//                     </td>

//                     <td>
//                       <button className="button-result">
//                         <Link
//                           to={"/editallocatechapter/" + jobtitle._id + "/" + jobtitle.jobTitlename}
//                           className="showBut text-decoration-none"
//                         >
//                           Add chapters
//                         </Link>
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

// export default AllocateChapter;
