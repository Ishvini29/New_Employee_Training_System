import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import KT from "./KT";
import CommentSection from "../../components/Comments/CommentSection";

const ViewKT = () => {
  const { KTid, KTName, id, unitName, chapterID, chapterName } = useParams();
  const [kts, setkts] = useState([]);
  useEffect(() => {
    console.log(KTid.id);
    axios
      .get(process.env.REACT_APP_API_BASE+`/kts/${KTid}`)
      .then((response) => {
        setkts(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [KTid]);

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#fefefe" }}>
        <div className="container my-5">
        <h4 className="heading p-3 rounded">
            {chapterName + ": " + unitName+": "}
            <Link to={"/Unit/"+chapterID+"/"+chapterName+"/"+id+"/"+unitName}>
              {"KT Sessions"}
            </Link>
            {": "+KTName}
          </h4>
          <nav className="navbar navbar-expand-lg">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link to={"/chapterPage/" + chapterID + "/" + chapterName} className="nav-link active">
                    Units
                  </Link>
                </li>
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link to={"/article/" + chapterID + "/" + chapterName} className="nav-link">
                    Articles
                  </Link>
                </li>
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link to={"/forums/" + chapterID + "/" + chapterName} className="nav-link">
                    Discussion Forums
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
        </div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="container pt-3">
                <h4 style={{ font: "25px", color: "#000000" }}>
                  KT Session 01
                </h4>
                <br></br>
                <KT url={kts} />
                <CommentSection ID={KTid} type="KT" />
              </div>
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ViewKT;
