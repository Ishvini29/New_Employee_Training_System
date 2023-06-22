import DeleteHistory from "../components/DeleteHistory";
import DeleteArticle from "../pages/article page/ArticleDelete";
import DeleteUnit from "../pages/Chapter page/UnitDelete";
import DeleteKT from "../pages/Unit page/KTDelete";
import DeleteQ from "../pages/Quiz/QuestionDeleteHistory";

export const deletelogs_routes = [
  {
    path: "/deleteunits",
    ele: <DeleteUnit />,
  },
  {
    path: "/deletekts",
    ele: <DeleteKT />,
  },
  {
    path: "/deletearticles",
    ele: <DeleteArticle />,
  },
  {
    path: "/deletequestions",
    ele: <DeleteQ />,
  },
  {
    path: "/deletehistory",
    ele: <DeleteHistory />,
  },
];
