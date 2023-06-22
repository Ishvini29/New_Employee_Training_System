import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pdf from "./Pdf";
import CommentSection from "../../components/Comments/CommentSection";

const ViewContent = () => {
  const { id, articleName, chapterID, chapterName } = useParams();
  const [article, setArticle] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:1337/arts/${id}`)
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#fefefe" }}>
        <div className="container my-5">
          <h4 className="heading p-3 rounded">
            {chapterName + ": " + articleName}
          </h4>
          <nav className="navbar navbar-expand-lg">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link
                    to={"/chapterPage/" + chapterID + "/" + chapterName}
                    className="nav-link active"
                  >
                    Units
                  </Link>
                </li>
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link
                    to={"/article/" + chapterID + "/" + chapterName}
                    className="nav-link"
                  >
                    Articles
                  </Link>
                </li>
                <li className="nav-item" style={{ fontWeight: "bold" }}>
                  <Link
                    to={"/forums/" + chapterID + "/" + chapterName}
                    className="nav-link"
                  >
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
                <h4 style={{ font: "25px", color: "#000000" }}>Article 01</h4>
                <br></br>
                <Pdf url={article} />
                <CommentSection ID={id} type="article" />
              </div>
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ViewContent;
