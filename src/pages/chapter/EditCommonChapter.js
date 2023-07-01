import image1 from "../../images/2.svg";
import swal from "sweetalert";
import "../../App.css";
import { Link } from "react-router-dom";
import before from "../../images/before.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import validator from "validator";
import { useState } from "react";

const EditChapter = () => {
    const { id, name } = useParams();
    const [newChapterName, setNewChapterName] = useState(name);
    const [reason, setReason] = useState("");
    function submitEdit(e) {
        e.preventDefault();

        // Validate chapter name
        if (!validator.isAlpha(newChapterName.replace(/[^A-Za-z]/g, ""))) {  // Must contain at least 1 alphabet
            swal({
                icon: "warning",
                text: "Common Chapter name must contain at least one alphabet letter.",
            });
            return;
        }

        // Validate chapter name starts with a capital letter
        if (!newChapterName.match(/^[A-Z]/)) {
            swal({
                icon: "warning",
                text: "Common Chapter name must start with a capital letter.",
            });
            return;
        }

        axios
            .post(process.env.REACT_APP_API_BASE + "/commonchapters/editChapter", {
                fromName: name,
                newName: newChapterName,
                reason: reason,
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

    return (
        <div className="container">
            <div className="alert mt-3 heading">
                <Link
                    to={"/chapter"}
                    className="image">
                    <img src={before} className="picside11" draggable={false} alt="this is image" />
                </Link>
                <h5>Edit Common Chapter</h5></div>
            <div className="alert alert-info mt-4"> <b>Common Chapter Name must start with upper case and it can consist numerical digits.</b> </div>
            <div className="columns mt-4">
                <div>
                    <img src={image1} className="picside2" draggable={false} alt="this is image" />
                </div>
                <div class="card" style={{ borderRadius: "15px", backgroundColor: "#f1f8f5", boxShadow: "0px 0px 5px 2px rgba(151,196,177, 0.5)" }} >
                    <div class="card-body">
                        <form name="myForm" onSubmit={submitEdit}>
                            <div className="field">
                                <label className="ml-5 createchap">Rename Common Chapter</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        value={newChapterName}
                                        onChange={(e) => {
                                            setNewChapterName(e.target.value);
                                        }}
                                        name="cname"
                                        className="inputdata2 my-2 ml-5"
                                        placeholder="Enter Common chapter name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label className="ml-5 createchap">Reason</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        name="dreason"
                                        className="inputdata2 my-2 ml-5"
                                        placeholder="Reason"
                                        required
                                        value={reason}
                                        onChange={(e) => {
                                            setReason(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="control">
                                <center>
                                    <button
                                        type="submit"
                                        className="btn btn-success mr-1 column is-half text-white col-md-3 my-3"
                                    >
                                        Save
                                    </button>
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditChapter;
