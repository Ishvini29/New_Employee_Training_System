

import React from "react";
import axios from "axios";
import before from "../../images/before.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useState, useEffect } from "react";
const PermanentDeleteChapter = () => {
  const [chapters, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);

  function deletechapter(id) {
    swal({
      title: "Confirm",
      text: "Are you absolutely sure you want to permanently delete this Chapter?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(process.env.REACT_APP_API_BASE + "/chapters/deleteChapter", {
            id: id,

          })
          .then((res) => {
            if (res.data.status === true) {
              swal(res.data.message, {
                icon: "success",
              });
            } else {
              swal(res.data.message, {
                icon: "warning",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Your Chapter is safe!", {
          icon: "success",
        });
      }
    });
  }

  function recoverchapter(id) {
    swal({
      title: "Confirm",
      text: "Are you absolutely sure, you want this Chapter?",
      icon: "info",
      buttons: true,
      successMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .put(process.env.REACT_APP_API_BASE +`/retrievechapters/${id}`, {
            status: "active",
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
        swal("Your Chapter is safe!", {
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    axios.get(process.env.REACT_APP_API_BASE + "/chapters/showAllChapters")
      .then(function (response) {
        const filteredChapters = response.data.filter(chapter => chapter.depID !== null && chapter.status === "notactive");
        setChapter(filteredChapters);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading">
          <Link
            to={"/chapter"}
            className="image">
            <img src={before} className="picside11" draggable={false} alt="this is image" />
          </Link>
          <h5>Deleted Chapters</h5></div>
        <hr className="mt-3"></hr>{
          (loading)
            ?
            <center><div className="spinner-grow mt-3" role="status"></div></center>
            :
            (chapters.length === 0)
              ?
              <div className="alert alert-info mt-4">
                <b>No tempararily deleted chapters Found !</b> </div>
              :
              <table className="table">

                <thead>
                  <tr>
                    <th scope="col">Chapter ID</th>
                    <th scope="col">Chapter name</th>
                    <th scope="col">Department</th>
                    <th>Deleted By</th>
                    <th>Reason</th>
                    <th scope="col">
                      <center>Actions</center>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {

                    chapters.map((item) => {
                      return (
                        <tr className="align-middle" key={item._id}>
                          <th scope="row">{item.chapId}</th>
                          <td>{item.chapterName}</td>
                          <td>{item.depID?.depName}</td>
                          <td>{item.createdBy?.empId}</td>
                          <td>{item.deleteReason}</td>
                          <td>
                            <button type="submit" onClick={() => deletechapter(item._id)}
                              className="btn btn-outline-danger form-control"
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button type="submit" onClick={() => recoverchapter(item._id)}
                              className="btn btn-outline-success form-control"
                            >
                              Retrieve
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>}
      </div>
    </React.Fragment>
  );
};
export default PermanentDeleteChapter;