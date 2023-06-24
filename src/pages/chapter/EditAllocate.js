import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";
import image1 from "../../images/4.svg";
import AllocateChapter from "./AllocateChapter";

const EditAllocate = () => {
  const department = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
  const [chaptername, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { name } = useParams();

  let selectedChapters = []
  const updateArray = (event) => {
    if (selectedChapters.includes(event.target.value)) {
      selectedChapters.pop(event.target.value)
    } else {
      selectedChapters.push(event.target.value)
    }
    console.log(selectedChapters)
  }

  //----
  function submitEdit(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_BASE + "/jobtitles/allocatechapter", {
        chaptersAllocated: selectedChapters,
        editedId: id,
      })
      .then((res) => {
        if (res.data.status === true) {
          swal({
            icon: "success",
            text: res.data.message,
          });
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
  //-----

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE + "/chapters/showAllChapters")
      .then(function (response) {
        const filteredChapters = response.data.filter(chapter => chapter.depID._id === department && chapter.status === "active");
        // const filteredChapters = response.data.filter(chapter => chapter.depID !== null);
        setChapter(filteredChapters);
        console.log(filteredChapters)
        setLoading(false);
      });
  }, []);


  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading">
          <h5>Allocate Chapters For {name}</h5>

        </div>
        <div>
          <img src={image1} className="picside3" draggable={false} alt="this is image" />
        </div>
        <div class="card" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
          <div class="card-body">
            <br></br>{
              <table className="table">
                <tbody>
                  {
                    (loading)
                      ?
                      <center><div className="spinner-grow mt-3" role="status"></div></center>
                      :
                      (chaptername.length === 0)
                        ?
                        (<div className="alert alert-info mt-4"> No Chapters Found related to your Department !</div>)
                        : chaptername.map((item) => {
                          return (

                            <div key={item._id} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={item._id}
                                id={item._id}
                                onChange={(e) => { updateArray(e) }}
                              />
                              <label
                                className="form-check-label"
                              >
                                {item.chapId}{" "} -{" "}
                                {item.chapterName}
                              </label>
                            </div>
                          );
                        })}
                  {(chaptername.length === 0)
                    ? "" :
                    <input
                      type="submit"
                      className="btn btn-success mt-4 col-md-12"
                      value="     Allocate     "
                      onClick={submitEdit}
                    />}

                </tbody>

              </table>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditAllocate;



//it is the code for when I select the checkbox,that does not change
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import swal from "sweetalert";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import image1 from "../../images/4.svg";

// const EditAllocate = () => {
//   const department = jwt_decode(
//     JSON.parse(localStorage.getItem("user")).token
//   ).userData.department;
//   const [chaptername, setChapter] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const { name } = useParams();

//   const jobTitleKey = `jobtitle_${id}`; // Key for storing checkbox state for each job title

//   const [selectedChapters, setSelectedChapters] = useState(() => {
//     const storedState = localStorage.getItem(jobTitleKey);
//     return storedState ? JSON.parse(storedState) : [];
//   }); // State to store selected chapter IDs for the job title

//   const updateArray = (event) => {
//     const value = event.target.value;
//     setSelectedChapters((prevSelectedChapters) => {
//       if (prevSelectedChapters.includes(value)) {
//         return prevSelectedChapters.filter((chapterId) => chapterId !== value);
//       } else {
//         return [...prevSelectedChapters, value];
//       }
//     });
//   };

//   //----
//   function submitEdit(e) {
//     e.preventDefault();
//     axios
//       .post(process.env.REACT_APP_API_BASE + "/jobtitles/allocatechapter", {
//         chaptersAllocated: selectedChapters,
//         editedId: id,
//       })
//       .then((res) => {
//         if (res.data.status === true) {
//           swal({
//             icon: "success",
//             text: res.data.message,
//           });
//         } else {
//           swal({
//             icon: "warning",
//             text: res.data.message,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   //-----

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(process.env.REACT_APP_API_BASE + "/chapters/showAllChapters")
//       .then(function (response) {
//         const filteredChapters = response.data.filter(
//           (chapter) =>
//             chapter.depID._id === department && chapter.status === "active"
//         );
//         setChapter(filteredChapters);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(jobTitleKey, JSON.stringify(selectedChapters));
//   }, [selectedChapters, jobTitleKey]);

//   return (
//     <React.Fragment>
//       <div className="container">
//         <div className="alert mt-3 heading">
//           <h5>Allocate Chapters For {name}</h5>
//         </div>
//         <div>
//           <img
//             src={image1}
//             className="picside3"
//             draggable={false}
//             alt="this is image"
//           />
//         </div>
//         <div
//           className="card"
//           style={{
//             borderRadius: "15px",
//             backgroundColor: "#f1f8f5",
//             boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)",
//           }}
//         >
//           <div className="card-body">
//             <br></br>
//             {loading ? (
//               <center>
//                 <div className="spinner-grow mt-3" role="status"></div>
//               </center>
//             ) : chaptername.length === 0 ? (
//               <div className="alert alert-info mt-4">
//                 No Chapters Found related to your Department!
//               </div>
//             ) : (
//               <table className="table">
//                 <tbody>
//                   {chaptername.map((item) => (
//                     <div key={item._id} className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value={item._id}
//                         id={item._id}
//                         onChange={(e) => {
//                           updateArray(e);
//                         }}
//                         checked={selectedChapters.includes(item._id)} // Set the checked state based on selectedChapters
//                       />
//                       <label className="form-check-label">
//                         {item.chapId} - {item.chapterName}
//                       </label>
//                     </div>
//                   ))}
//                   {chaptername.length !== 0 && (
//                     <input
//                       type="submit"
//                       className="btn btn-success mt-4 col-md-12"
//                       value="     Allocate     "
//                       onClick={submitEdit}
//                     />
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default EditAllocate;


