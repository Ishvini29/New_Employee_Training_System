import AssignFinalAssignment from "../pages/final_project_assignment/AssignFinalAssignment";
import Submission from "../pages/projSubmission/submission";
import Evaluate from "../pages/projSubmission/Evaluate";
import Feedback from "../pages/projSubmission/feedback";
import FinalAssignmentSubmission from "../pages/final_project_assignment/FinalAssignmentSubmission";
import ShowAssignmentRequests from "../pages/final_project_assignment/ShowAssignmentRequests";
import EditAssignedTasks from "../pages/final_project_assignment/EditAssignedTasks";
import ManageFinalProjectAssignment from "../pages/final_project_assignment/ManageFinalProjectAssignment";
import UpdateFinalProjectAssignment from "../pages/final_project_assignment/UpdateFinalProjectAssignment";
import OverDuedFinalProjectAssignment from "../pages/final_project_assignment/OverDuedFinalProjectAssignment";
import Editlog from "./../pages/projSubmission/editLog";
import ProjScore from "./../pages/projSubmission/projectScore";
import { userRoles as ur } from "../data/userRole";
export const final_project_assignment_routes = [
  {
    path: "/assignFinalProjectAssignment/:id/:userID",
    ele: <AssignFinalAssignment />,
    availability: [ur.supervisor],
  },
  {
    path: "/updateFinalProjectAssignment/:id",
    ele: <UpdateFinalProjectAssignment />,
    availability: [ur.supervisor],
  },
  {
    path: "/submission",
    ele: <Submission />,
    availability: [ur.supervisor],
  },
  {
    path: "/evaluate",
    ele: <Evaluate />,
    availability: [ur.supervisor],
  },
  {
    path: "/projectScore",
    ele: <ProjScore />,
    availability: [ur.supervisor],
  },
  {
    path: "/feedback",
    ele: <Feedback />,
    availability: [ur.hiredEmployee],
  },
  {
    path: "/scoreEditLog",
    ele: <Editlog />,
    availability: [ur.superAdmin],
  },
  {
    path: "/submitanswer",
    ele: <FinalAssignmentSubmission />,
    availability: [ur.hiredEmployee],
  },
  {
    path: "/finalProjectAssignmentRequests",
    ele: <ShowAssignmentRequests />,
    availability: [ur.supervisor],
  },
  {
    path: "/editAssignedProjectAssignment",
    ele: <EditAssignedTasks />,
    availability: [ur.supervisor],
  },
  {
    path: "/manageFinalProjectAssignment",
    ele: <ManageFinalProjectAssignment />,
    availability: [ur.supervisor],
  },
  {
    path: "/overduedAssignments",
    ele: <OverDuedFinalProjectAssignment />,
    availability: [ur.supervisor],
  },
];
