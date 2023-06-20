import AddChapter from "../pages/chapter/AddChapter";
import AllocateChapter from "../pages/chapter/AllocateChapter";
import Chapter from "../pages/chapter/Chapter";
import CommonChapter from "../pages/chapter/CommonChapter";
import EditCommonChapter from "../pages/chapter/EditCommonChapter";
import DepartmentAddChapter from "../pages/chapter/DepartmentAddChapter";
import DepartmentChapter from "../pages/chapter/DepartmentChapter";
import EditAllocate from "../pages/chapter/EditAllocate";
import EditChapter from "../pages/chapter/EditChapter";
import EnrollRequestEmployee from "../pages/chapter/EnrollRequestEmployee";
import EnrollRequestSupervisor from "../pages/chapter/EnrollRequestSupervisor";
import PermanentDeleteChapter from "../pages/chapter/PermanentDeleteChapter";
import ViewChapter from "../pages/chapter/ViewChapter";
import Content from "../pages/Chapter page/Content";

import { userRoles as ur } from "../data/userRole";
import ConCreChaps from "../pages/dashboard/ConCreChaps";

export const chapter_routes = [
  {
    path: "/chapter/department/all",
    ele: <ConCreChaps />,
    availability: [ur.contentCreator, ur.supervisor],
  },
  {
    path: "/chapter",
    ele: <Chapter />,
    availability: [ur.superAdmin],
  },
  {
    path: "/commonchapter",
    ele: <CommonChapter />,
  },
  {
    path: "/editcommonchapter/:id/:name",
    ele: <EditCommonChapter />,
  },
  {
    path: "/newchap",
    ele: <AddChapter />,
    availability: [ur.superAdmin],
  },
  {
    path: "/editchap/:id/:name",
    ele: <EditChapter />,
    availability: [ur.systemAdmin, ur.superAdmin],
  },

  {
    path: "/permanentdeletechapter",
    ele: <PermanentDeleteChapter />,
    availability: [ur.superAdmin],
  },
  {
    path: "/depchapter",
    ele: <DepartmentChapter />,
    availability: [ur.systemAdmin],
  },
  {
    path: "/viewchapter",
    ele: <ViewChapter />,
    availability: [
      ur.superAdmin,
      ur.systemAdmin,
      ur.supervisor,
      ur.contentCreator,
    ],
  },
  {
    path: "/allocatechapter",
    ele: <AllocateChapter />,
    availability: [ur.systemAdmin],
  },
  {
    path: "/editallocatechapter/:id/:name",
    ele: <EditAllocate />,
    availability: [ur.systemAdmin],
  },
  {
    path: "/enrollrequestsupervisor",
    ele: <EnrollRequestSupervisor />,
    availability: [ur.supervisor],
  },
  {
    path: "/enrollrequestemployee",
    ele: <EnrollRequestEmployee />,
    availability: [ur.hiredEmployee],
  },
  {
    path: "/newdepchap",
    ele: <DepartmentAddChapter />,
    availability: [ur.systemAdmin],
  },

  {
    path: "/chapterPage/:chapterId/:chapterName",
    ele: <Content />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
];
