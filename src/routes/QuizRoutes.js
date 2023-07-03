import QuizEntry from "../pages/quiz/QuizEntry";
import Quizpage from "../pages/quiz/Quizpage";
import Result from "../pages/quiz/result";
import Review from "../pages/quiz/review";

import { userRoles as ur } from "../data/userRole";
import QuizPopup from "../pages/quiz/QuizPopup";
import QuizDisplay from "../pages/quiz/QuizDisplay";

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
    availability: [ur.hiredEmployee, ur.supervisor, ur.contentCreator],
  },
  {
    path: "/quiz/:id/:chapName/:unitName",
    ele: <Quizpage />,
    availability: [ur.supervisor, ur.contentCreator],
  },
  {
    path: "/attemptQuiz/:id/:chapId",
    ele: <QuizPopup></QuizPopup>,
    availability: [ur.hiredEmployee],
  },
  {
    path: "/viewquiz/:id/:chapId",
    ele: <QuizDisplay></QuizDisplay>,
    availability: [ur.hiredEmployee],
  },
];
