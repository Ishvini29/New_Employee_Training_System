import ViewKT from "../pages/KT view/ViewKT";
import UnitContent from "../pages/Unit page/UnitContent";
import ArticleContent from "../pages/article page/ArticleContent";
import ViewContent from "../pages/article view/ViewContent";
import Edit from "../pages/Chapter page/EditUnit";
import { userRoles as ur } from "../data/userRole";
export const unit_article_routes = [
    {
        path: "/Unit",
        ele: <UnitContent/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
    },
    {
        path: "/Unit/:chapterID/:chapterName/:id/:unitName",
        ele: <UnitContent/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
    },
    {
        path: "/Unit/View/:chapterID/:chapterName/:id/:unitName/:KTid/:KTName",
        ele: <ViewKT/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
    },
    {
        path: "/article/:chapterId/:chapterName",
        ele: <ArticleContent/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator, ur.systemAdmin]
    },
    {
        path: "/article/View/:id/:articleName/:chapterID/:chapterName",
        ele: <ViewContent/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
    },
    {
        path: "/edit/:id",
        ele: <Edit/>,
        availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
    }
]