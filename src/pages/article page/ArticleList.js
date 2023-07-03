import Articles from "./Articles";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticleList = (props) => {
  const chapterId = props.chapterId;
  const chapterName = props.chapterName;
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE + `/arts?chapterId=${chapterId}`)
      .then((response) => {
        setarticles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [chapterId, props.refreshArticleList]);

  return (
    <div>
      <div>
        {articles.map((article) => {
          return (
            <Articles
              key={article._id}
              article={article}
              chapterId={chapterId}
              chapterName={chapterName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ArticleList;
