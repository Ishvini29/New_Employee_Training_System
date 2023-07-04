import Edit from "./EditArticle";
import Delete from "./DeleteArticle";
import { Link } from "react-router-dom";
import pdf from '../../images/pdf.png';
import jwt_decode from "jwt-decode";

const Articles = ({ article, chapterId, chapterName }) => {
  const userRole = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData?.userRole;
  return (
    <div>
      <div className='card mt-3'>
        <div className='card-body' style={{ backgroundColor: '#ADD8E6' }}>
          <div class='col-lg-12'>

            <h3 style={{ font: '25px', color: '#000000' }}>
              {article.articleName}
            </h3>
            <div>
              {
                ["Content Creator", "Supervisor"].includes(userRole)
                &&
                <Edit key={article._id} article={article} />
              }
            </div>
            <p>{article.articleDesc} </p>
            <div>
              {
                ["Content Creator", "Supervisor"].includes(userRole)
                &&
                <Delete key={article._id} article={article} />
              }
            </div>
          </div>
          <p>
            <Link to={'/article/View/' + article._id + "/" + article.articleName + "/" + chapterId + "/" + chapterName}>
              <img src={pdf} height='20px' width='20px' alt='pdf'></img>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Articles;