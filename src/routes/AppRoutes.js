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
import { editlogs_routes } from "./Editlogs";
import Footer from "../components/Footer";
import { deletelogs_routes } from "./Deletelogs";

const AppRoutes = () => {
  const protectedRoutes = [
    ...chapter_routes,
    ...department_routes,
    ...discussion_forum_routes,
    ...final_project_assignment_routes,
    ...general_routes,
    ...guidance_request_routes,
    ...leader_board_routes,
    ...quiz_routes,
    ...report_routes,
    ...unit_article_routes,
    ...user_role_routes,
    ...editlogs_routes,
    ...deletelogs_routes,
  ];
  const unprotectedRoutes = [...auth_routes];

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        {unprotectedRoutes.map((e) => {
          return (
            <Route
              key={e.path}
              exact
              path={e.path}
              element={<RedirectIfLoggedIn>{e.ele}</RedirectIfLoggedIn>}
              // element={e.ele}
            />
          );
        })}

        {protectedRoutes.map((e) => {
          return (
            <Route
              key={e.path}
              exact
              path={e.path}
              element={
                <RequireAuth userroles={e?.availability}>{e.ele}</RequireAuth>
              }
              // element={e.ele}
            />
          );
        })}
      </Routes>
      {/* <Footer></Footer> */}
    </BrowserRouter>
  );
};
export default AppRoutes;
