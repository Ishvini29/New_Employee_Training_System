import Articles from './Articles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ArticleList = (props) => {
  const chapterId = props.chapterId;
  const chapterName = props.chapterName;
  const [articles, setarticles] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:1337/arts/')
  //     .then(response => {
  //       setarticles(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []); 

  useEffect(() => {
    axios.get(`http://localhost:1337/arts?chapterId=${chapterId}`)
      .then(response => {
        setarticles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [chapterId]);

  return (
    <div>
      <div>
        {articles.map(article => {
          return (
            <Articles key={article._id} article={article} chapterId={chapterId} chapterName={chapterName} />
          )
        })}
      </div>
    </div>


  );
}

export default ArticleList;