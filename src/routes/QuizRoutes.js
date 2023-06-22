import QuizEntry from "../pages/Quiz/QuizEntry";
import Quizpage from "../pages/Quiz/Quizpage";
import Result from "../pages/Quiz/result";
import Review from "../pages/Quiz/review";
import { userRoles as ur } from "../data/userRole";

export const quiz_routes = [
  {
    path: "/result",
    ele: <Result />,
    availability: [ur.hiredEmployee],
  },
  {
    path: "/review",
    ele: <Review />,
    availability: [ur.hiredEmployee, ur.supervisor],
  },
  {
    path: "/quiz/view",
    ele: <QuizEntry />,
  },
  {
    path: "/quiz/view/:id",
    ele: <QuizEntry />,
  },
  {
    path: "/quiz",
    ele: <Quizpage />,
  },
  {
    path: "/quiz/:id",
    ele: <Quizpage />,
  },
];
