import DeleteHistory from "../components/DeleteHistory";
import DeleteArticle from "../pages/article page/ArticleDelete";
import DeleteUnit from "../pages/Chapter page/UnitDelete";
import DeleteKT from "../pages/Unit page/KTDelete";
import DeleteQ from "../pages/quiz/QuestionDeleteHistory";
import { userRoles as ur } from "../data/userRole";
export const deletelogs_routes = [
  {
    path: "/deleteunits",
    ele: <DeleteUnit />,
    availability: [ur.superAdmin]
  },
  {
    path: "/deletekts",
    ele: <DeleteKT />,
    availability: [ur.superAdmin]
  },
  {
    path: "/deletearticles",
    ele: <DeleteArticle />,
    availability: [ur.superAdmin]
  },
  {
    path: "/deletequestions",
    ele: <DeleteQ />,
    availability: [ur.superAdmin]
  },
  {
    path: "/deletehistory",
    ele: <DeleteHistory />,
    availability: [ur.superAdmin]
  },
];
