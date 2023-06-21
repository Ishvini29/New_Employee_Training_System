import QuizEntry from "../pages/quiz/QuizEntry";
import Quizpage from "../pages/quiz/Quizpage";
import QuizDisplay from "../pages/quiz/QuizDisplay";
import Result from "../pages/quiz/result";
import Review from "../pages/quiz/review";
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
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
  {
    path: "/quiz/view/:id",
    ele: <QuizEntry />,
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
  {
    path: "/quiz",
    ele: <Quizpage />,
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
  {
    path: "/quiz/:id",
    ele: <Quizpage />,
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator]
  },
];
