import React, { useState, useEffect } from "react";
import axios from "axios";

const Article = (props) => (
  <tr>
    <td>{props.article.chapterName}</td>
    <td>{props.article.articleName}</td>
    <td>{props.article.articleDesc}</td>
    <td>{props.article.createdBy}</td>
    <td>{props.article.deletedBy}</td>

    <td>{props.article.updated_at}</td>
  </tr>
);

const ArticleHistory = () => {
  const [deletearticles, setdeletearticles] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/deletearticles/")
      .then((response) => {
        setdeletearticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletearticlesList = () =>
    deletearticles.map((currentArticle, i) => (
      <Article article={currentArticle} key={i} />
    ));

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Article Delete History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Chapter Name</th>
                <th>Article Name</th>
                <th>Article Description</th>
                <th>Created By</th>
                <th>Deleted By</th>
                <th>Deleted Time</th>
              </tr>
            </thead>
            <tbody>{deletearticlesList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ArticleHistory;
