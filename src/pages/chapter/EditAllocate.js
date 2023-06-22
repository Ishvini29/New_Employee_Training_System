import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import NavBar from "../../components/NavBar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import image1 from "../../images/4.svg";

const EditAllocate = () => {
  const department = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
  const [chaptername, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      .post(process.env.REACT_APP_API_BASE+"/jobtitles/allocatechapter", {
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
      .get(process.env.REACT_APP_API_BASE+"/chapters/showAllChapters")
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
          <h5>Allocate Chapters For Jobtitle</h5>
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



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import swal from "sweetalert";
// import NavBar from "../../components/NavBar";
// import axios from "axios";
// import jwt_decode from "jwt-decode";

// const EditAllocate = () => {
//   const department = jwt_decode(
//     JSON.parse(localStorage.getItem("user")).token
//   ).userData.department;
//   const [chaptername, setChapter] = useState([]);
//   const { id } = useParams();
//   const [selectedChapters, setSelectedChapters] = useState(
//     JSON.parse(localStorage.getItem("selectedChapters")) || []
//   );

//   const updateArray = (event) => {
//     if (selectedChapters.includes(event.target.value)) {
//       setSelectedChapters(selectedChapters.filter((id) => id !== event.target.value));
//     } else {
//       setSelectedChapters([...selectedChapters, event.target.value]);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(process.env.REACT_APP_API_BASE+"/chapters/showAllChapters")
//       .then(function (response) {
//         const filteredChapters = response.data.filter(
//           (chapter) =>
//             chapter.depID._id === department && chapter.status === "active"
//         );
//         setChapter(filteredChapters);
//       });
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("selectedChapters", JSON.stringify(selectedChapters));
//   }, [selectedChapters]);

//   function submitEdit(e) {
//     e.preventDefault();
//     axios
//       .post(process.env.REACT_APP_API_BASE+"/jobtitles/allocatechapter", {
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
//   return (
//     <React.Fragment>
//       <NavBar></NavBar>
//       <div className="container">
//         <div className="alert mt-3 heading">
//           <h5>Edit Allocate Chapters</h5>
//         </div>
//         <br></br> <br></br>
//         <table className="table">
//           <tbody>
//             {chaptername.map((item) => {
//               return (
//                 <div key={item._id} className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value={item._id}
//                     id={item._id}
//                     onChange={(e) => {
//                       updateArray(e);
//                     }}
//                     checked={selectedChapters.includes(item._id)}
//                   />
//                   <label className="form-check-label">{item.chapterName}</label>
//                 </div>
//               );
//             })}
//             <input
//               type="submit"
//               className="btn btn-primary"
//               value="Edit Allocated chapter"
//               onClick={submitEdit}
//             />
//           </tbody>
//         </table>
//       </div>
//     </React.Fragment>
//   );
// };
// export default EditAllocate;

