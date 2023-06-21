import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

const Article = (props) => (
  <tr>
    <td>{props.article.chapterName}</td>
    <td>{props.article.articleName}</td>
    <td>{props.article.articleDesc}</td>
    <td>{props.article.old_data.articleName}</td>
    <td>{props.article.old_data.articleDesc}</td>
    <td>{props.article.updatedby}</td>
    <td>{props.article.updated_at}</td>
  </tr>
);

const UnitHistory = () => {
  const [editarticles, seteditarticles] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/editarticles/")
      .then((response) => {
        seteditarticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editarticlesList = () =>
    editarticles.map((currentArticle, i) => (
      <Article article={currentArticle} key={i} />
    ));

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Article Edit History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Chapter Name</th>
                <th>Article Name</th>
                <th>Article Description</th>
                <th>Previous Article Name</th>
                <th>Previous Article Description</th>
                <th>Updated By</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>{editarticlesList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UnitHistory;
