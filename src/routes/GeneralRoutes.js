import MainDashBoard from "../pages/dashboard/MainDashBoard";
import ProfileOverview from "../pages/profile/ProfileOverview";
import PendingUserApproval from "../pages/login/PendingUserApproval";
import PendingUserApprovalDepartment from "../pages/login/PendingUserApprovalDepartment";
import Notifications from "../pages/Notifications";
import Logs from "../pages/Logs";
import { userRoles as ur } from "../data/userRole";
export const general_routes = [
    {
        path: "/home",
        ele: <MainDashBoard />
    },
    {
        path: "/pendingrequests",
        ele: <PendingUserApproval />,
        availability: [ur.superAdmin]
    },
    {
        path: "/verifyusersfromdepartment",
        ele: <PendingUserApprovalDepartment />,
        availability: [ur.systemAdmin]
    },
    {
        path: "/profile",
        ele: <ProfileOverview />
    },
    {
        path: "/notifications",
        ele: <Notifications />
    },
    {
        path: "/logs",
        ele: <Logs />,
        availability: [ur.superAdmin, ur.systemAdmin]
    },
]