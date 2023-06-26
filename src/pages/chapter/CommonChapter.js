import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import before from "../../images/before.png";

const Chapter = () => {
    const [commonchapters, setChapter] = useState([]);
    const [loading, setLoading] = useState(false);
    function deletechapter(id) {
        swal({
            title: "Confirm",
            text: "Are you absolutely sure you want to permanently delete this Chapter and all the data it contains?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios
                    .post(process.env.REACT_APP_API_BASE + "/commonchapters/deleteChapter", {
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

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_BASE + "/commonchapters/showAllChapters")
            .then(function (response) {
                setChapter(response.data);
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
                    <h5>Common Chapters</h5></div>
                <div className="row ">
                </div>{
                    (loading)
                        ?
                        <center><div className="spinner-grow mt-3" role="status"></div></center>
                        :
                        (commonchapters.length === 0)
                            ?
                            <div className="alert alert-info mt-4">
                                <b>No Common Chapters Found !</b> </div>
                            :
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">ChapterID</th>
                                        <th scope="col">Chapter name</th>
                                        <th>Created On</th>
                                        <th scope="col">Edit chapter</th>
                                        <th scope="col">Delete chapter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        commonchapters.map((item) => {
                                            if (item.status === "notactive") {
                                                return null; // If the status is not active, don't render the row
                                            }
                                            return (
                                                <tr className="align-middle" key={item._id}>
                                                    <th scope="row">{item.chapId}</th>
                                                    <td>{item.chapterName}</td>
                                                    <td> {new Date(item?.createdOn).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}</td>
                                                    <td>
                                                        <Link
                                                            to={"/editcommonchapter/" + item._id + "/" + item.chapterName}
                                                            className="btn btn-outline-primary form-control"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <button type="submit" onClick={() => deletechapter(item._id)}
                                                            className="btn btn-outline-danger form-control"
                                                        >
                                                            Delete
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
export default Chapter;
