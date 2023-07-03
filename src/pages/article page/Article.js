import React from 'react'
import { useState } from 'react';
import AddArticle from './AddArticle';
import Header from '../../components/Header';
import ArticleList from './ArticleList';

function Article(props) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [refreshArticleList, setRefreshArticleList] = useState(0);
  return (
    <div>
      <div className="container">
        <h4 style={{ font: "25px", color: "#000000" }}>Articles</h4>
        <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
        {showAddTask && <AddArticle chapterId={props.chapterId} refreshArticleList={refreshArticleList} setRefreshArticleList={setRefreshArticleList}/>}
        <br></br>
        <ArticleList chapterId={props.chapterId} chapterName={props.chapterName} refreshArticleList={refreshArticleList}></ArticleList>
      </div>
    </div>

  )
}

export default Article