import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import add from "../../images/create.png";

const DepartmentChapter = () => {
    const userdepartment = jwt_decode(
        JSON.parse(localStorage.getItem("user")).token
    ).userData.department;
    const [chapters, setChapter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteReason, setDeletionReason] = useState("");

    function deleteChapter(id, deleteReason) {
        swal({
            title: "Confirm",
            text:
                "Are you absolutely sure that you want to temporarily delete this Chapter? Please note that this action will send to the Super admin.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            content: {
                element: "input",
                attributes: {
                    placeholder: "Reason for deletion",
                    type: "text",
                },
            },
        }).then((deletionConfirmed) => {
            if (deletionConfirmed !== null && deletionConfirmed !== "") {
                setDeletionReason(deletionConfirmed);
                axios
                    .put(process.env.REACT_APP_API_BASE + `/chapters/${id}`, {
                        status: "notactive",
                        deleteReason: deletionConfirmed,
                    })
                    .then((res) => {
                        if (res.data.status === true) {
                            swal(res.data.message, {
                                icon: "success",
                            });
                        } else {
                            swal(res.data.message, {
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                swal("Your chapter will not be deleted until you provide a reason!", {
                    icon: "error",
                });
            }
        });
    }

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE + "/chapters/showAllChapters")
            .then(function (response) {
                const filteredChapters = response.data.filter(
                    (chapter) =>
                        chapter.depID !== null &&
                        chapter.depID._id === userdepartment
                );
                setChapter(filteredChapters);
                setLoading(false);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <div className="alert mt-3 heading">
                    <h5>Chapters</h5>
                </div>
                <div className="row ">
                    <div className="col-md-12">
                        <Link
                            to="/newdepchap"
                            className="btn btn-outline-success form-control"
                        >
                            <img src={add} className="picside5" alt="add_symbol" /> Add New Chapter
                        </Link>
                        <hr className="mt-3"></hr>
                    </div>
                </div>
                {loading ? (
                    <center>
                        <div className="spinner-grow mt-3" role="status"></div>
                    </center>
                ) : chapters.length === 0 ? (
                    <div className="alert alert-info mt-4">
                        <b>No chapters Found !</b>
                    </div>
                ) : (
                    <table className="table">
                        <thead>
                            <tr style={{ backgroundColor: "#b9e1dc" }}>
                                <th scope="col">ChapterID</th>
                                <th scope="col">Chapter name</th>
                                <th>Created On</th>
                                <th scope="col">View chapter</th>
                                <th scope="col">Edit chapter</th>
                                <th scope="col">Delete chapter</th>
                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: "MintCream" }}>
                            {chapters.map((item) => {
                                if (item.status === "notactive") {
                                    return null; // If the status is notactive, don't render the row
                                }
                                return (
                                    <tr className="align-middle" key={item._id}>
                                        <th scope="row">{item.chapId}</th>
                                        <td>{item.chapterName}</td>
                                        <td>
                                            {new Date(item?.createdOn).toLocaleString(
                                                "en-US",
                                                { timeZone: "Asia/Colombo" }
                                            )}
                                        </td>
                                        <td>
                                            <Link
                                                to={"/chapterPage/" + item._id + "/" + item.chapterName}
                                                className="btn btn-outline-secondary form-control"
                                            >
                                                View
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={"/editchap/" + item._id + "/" + item.chapterName}
                                                className="btn btn-outline-primary form-control"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                type="submit"
                                                onClick={() => deleteChapter(item._id, deleteReason)}
                                                className="btn btn-outline-danger form-control"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </React.Fragment>
    );
};

export default DepartmentChapter;







// import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import swal from "sweetalert";
// import { Link } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import add from "../../images/create.png";

// const DepartmentChapter = () => {
//     const userdepartment = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.department;
//     const [chapters, setChapter] = useState([]);
//     const [loading, setLoading] = useState(false);

//     function deleteChapter(id) {
//         swal({
//             title: "Confirm",
//             text: "Are you absolutely sure that you want to delete this Chapter? Please note that this action will send to the Super admin.",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//         }).then((willDelete) => {
//             if (willDelete) {
//                 axios
//                     .put(`http://localhost:1337/chapters/${id}`, {
//                         status: "notactive",
//                     })
//                     .then((res) => {
//                         if (res.data.status === true) {
//                             swal(res.data.message, {
//                                 icon: "success",
//                             });

//                         } else {
//                             swal(res.data.message, {
//                                 icon: "success",
//                             });
//                         }
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//             } else {
//                 swal("Your Chapter is safe!", {
//                     icon: "success",
//                 });
//             }
//         });
//     }

//     useEffect(() => {
//         setLoading(true);
//         axios.get("http://localhost:1337/chapters/showAllChapters")
//             .then(function (response) {
//                 const filteredChapters = response.data.filter(chapter => chapter.depID !== null && chapter.depID._id === userdepartment);
//                 setChapter(filteredChapters);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <React.Fragment>
//             <div className="container">
//                 <div className="alert mt-3 heading"><h5>Chapters</h5></div>
//                 <div className="row ">
//                     <div className="col-md-12">
//                         <Link
//                             to="/newdepchap"
//                             className="btn btn-outline-success form-control"
//                         >
//                             <img src={add} className="picside5" alt="add_symbol" /> Add New Chapter
//                         </Link>
//                         <hr className="mt-3"></hr>
//                     </div>
//                 </div>
//                 {
//                     (loading)
//                         ?
//                         <center><div className="spinner-grow mt-3" role="status"></div></center>
//                         :
//                         (chapters.length === 0)
//                             ?
//                             <div className="alert alert-info mt-4"> <b>No chapters Found !</b> </div>
//                             :
//                             <table className="table">
//                                 <thead>
//                                     <tr style={{ "backgroundColor": "#b9e1dc" }}>
//                                         <th scope="col">ChapterID</th>
//                                         <th scope="col">Chapter name</th>
//                                         <th>Created On</th>
//                                         <th scope="col">Edit chapter</th>
//                                         <th scope="col">Delete chapter</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody style={{ "backgroundColor": "MintCream" }}>
//                                     {
//                                         chapters.map((item) => {
//                                             if (item.status === "notactive") {
//                                                 return null; // If the status is notactive, don't render the row
//                                             }
//                                             return (
//                                                 <tr className="align-middle" key={item._id}>
//                                                     <th scope="row">{item.chapId}</th>
//                                                     <td>{item.chapterName}</td>
//                                                     <td> {new Date(item?.createdOn).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
//                                                     <td>
//                                                         <Link
//                                                             to={"/editchap/" + item._id + "/" + item.chapterName}
//                                                             className="btn btn-outline-primary form-control"
//                                                         >
//                                                             Edit
//                                                         </Link>
//                                                     </td>
//                                                     <td>
//                                                         <button type="submit" onClick={() => deleteChapter(item._id)}
//                                                             className="btn btn-outline-danger form-control"
//                                                         >
//                                                             Delete
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                 </tbody>
//                             </table>}
//             </div>
//         </React.Fragment>
//     );
// };
// export default DepartmentChapter;
