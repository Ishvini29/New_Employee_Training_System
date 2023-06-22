import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Unit from "./Unit";

const UnitContent = (props) => {
  const { id, chapterName, chapterID, unitName } = useParams();
  // http://localhost:3000/Unit/648b44b4190f2b8c4fc0f693/Chapter%2012/648b5af7722aa42bfa1a1bc5/sadfg

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#fefefe" }}>
        <div className="container my-5">
          <h4 className="heading rounded p-3">
            {chapterName + ': ' + unitName}
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
              <div className="container p-3">
                <Unit id={id} chapterName={chapterName} chapterID={chapterID} unitName={unitName}></Unit>
              </div>
            </div>
            <div className="card-footer">
              {/* here id means unit id */}
              <Link to={"/quiz/view/" + id + "/" + chapterID + "/" + chapterName + "/" + unitName}>
                <button type="button" class="btn btn-primary form-control">
                  Quiz
                </button>
              </Link>
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UnitContent;
