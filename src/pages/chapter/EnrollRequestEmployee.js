import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import jwt_decode from "jwt-decode";

const EnrollRequestEmployee = () => {
  const [chapters, setChapter] = useState([]);
  const [loading, setLoading] = useState(false);
  const userID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData._id;
  const [reset, setReset] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonStates, setButtonStates] = useState([]);

  const requestChapter = (chapID) => {
    swal({
      title: "Are you sure?",
      text: "Do you want to request this chapter",
      icon: "info",
      buttons: true,
      dangerMode: false,
    })
      .then((confirmed) => {
        if (confirmed) {
          axios
            .post(process.env.REACT_APP_API_BASE+"/chapters/enrollChapter", {
              chapID: chapID,
              userID: userID,
            })
            .then((res) => {
              if (res.data.status === true) {
                swal({
                  icon: "success",
                  text: res.data.message,
                });
                setReset(Date.now);
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
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE+"/chapters/showAllChapters")
      .then(function (response) {
        const filteredChapters = response.data.filter(
          (chapter) =>
            chapter.depID !== null && chapter.status !== "notactive"
        );
        setChapter(filteredChapters);
        setLoading(false);
        setButtonStates([]);
      });
  }, [reset]);

  const handleClick = (chapterIndex, deptIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to send request to this request?"
    );
    if (confirmed) {
      const newButtonStates = [...buttonStates];
      newButtonStates[deptIndex][chapterIndex] = true;
      setButtonStates(newButtonStates);
      swal("Success", "Your request sent successfully!", "success");
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="alert mt-3 heading">
          <h5>Other department Chapters</h5>
        </div>
        <input
          type="text"
          placeholder="Search by chapId"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            marginBottom: "16px",
            width: "280px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        {loading ? (
          <center>
            <div className="spinner-grow mt-3" role="status"></div>
          </center>
        ) : chapters.length === 0 ? (
          <div className="alert alert-info mt-4">
            <b>No Other Department Chapters Found!</b>
          </div>
        ) : (
          <table className="table">
            <tbody>
              {chapters
                .filter((value) =>
                  value?.chapId.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((value) => {
                  return value?.depID._id !==
                    jwt_decode(JSON.parse(localStorage.getItem("user")).token)
                      .userData.department ? (
                    <div className="row m-2">
                      <div className="col-md-2">
                        <div className="form-control">{value?.chapId}</div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-control">{value?.chapterName}</div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-control">
                          {"From " + value?.depID?.depName + " Department"}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn btn-outline-success form-control"
                          onClick={() => {
                            requestChapter(value?._id);
                          }}
                          disabled={true && value?.requested.includes(userID)}
                        >
                          {value?.requested.includes(userID) ? "Requested" : "Request"}
                        </button>
                      </div>
                    </div>
                  ) : null;
                })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default EnrollRequestEmployee;



