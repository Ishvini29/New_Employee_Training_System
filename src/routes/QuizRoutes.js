import QuizEntry from "../pages/Quiz/QuizEntry";
import Quizpage from "../pages/Quiz/Quizpage";
import QuizDisplay from "../pages/Quiz/QuizDisplay";
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
    path: "/quiz/view/:id/:chapId/:chapName/:unitName",
    ele: <QuizEntry />,
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
  {
    path: "/quiz",
    ele: <Quizpage />,
    availability: [ur.supervisor, ur.contentCreator]
  },
  {
    path: "/quiz/:id/:chapName/:unitName",
    ele: <Quizpage />,
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
];
