import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../App.css";
import RequireAuth from "../utils/RequireAuth";
import RedirectIfLoggedIn from "../utils/RedirectIfLoggedIn";
import NavBar from "../components/NavBar";
// unprotectedRoutes
import { auth_routes } from "./AuthRoutes";
// protectedRoutes
import { chapter_routes } from "./ChapterRoutes";
import { comment_routes } from "./CommentRoutes";
import { department_routes } from "./DepartmentRoutes";
import { discussion_forum_routes } from "./DiscussionForumRoutes";
import { final_project_assignment_routes } from "./FinalProjectAssignmentRoutes";
import { general_routes } from "./GeneralRoutes";
import { guidance_request_routes } from "./GuidanceRequestRoutes";
import { leader_board_routes } from "./LeaderBoardRoutes";
import { quiz_routes } from "./QuizRoutes";
import { report_routes } from "./ReportRoutes";
import { unit_article_routes } from "./UnitArticleRoutes";
import { user_role_routes } from "./UserRoleRoutes";

const AppRoutes = () => {
  const protectedRoutes = [
    ...chapter_routes,
    ...comment_routes,
    ...department_routes,
    ...discussion_forum_routes,
    ...final_project_assignment_routes,
    ...general_routes,
    ...guidance_request_routes,
    ...leader_board_routes,
    ...quiz_routes,
    ...report_routes,
    ...unit_article_routes,
    ...user_role_routes
  ]

  const unprotectedRoutes = [
    ...auth_routes
  ]
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        {
          unprotectedRoutes.map((e) => {
            return (
              <Route
                key={e.path}
                exact
                path={e.path}
                element={<RedirectIfLoggedIn>{e.ele}</RedirectIfLoggedIn>}
              />
            )
          })
        }

        {
          protectedRoutes.map((e) => {
            return (
              <Route
                key={e.path}
                exact
                path={e.path}
                element={<RequireAuth>{e.ele}</RequireAuth>}
              />
            )
          })
        }
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
