import CompleteGuidanceTickets from "../components/GuidanceTickets/CompleteTickets/CompleteGuidanceTickets";
import DirectGuidanceTickets from "../components/GuidanceTickets/DirectTickets/DirectGuidanceTickets";
import RequestGuidanceTickets from "../components/GuidanceTickets/RequestTickets/RequestGuidanceTickets";
import { userRoles as ur } from "../data/userRole";
export const guidance_request_routes = [
    {
        path: "/request-guidance-ticket",
        ele: <RequestGuidanceTickets/>,
        availability: [ur.hiredEmployee]
    },
    {
        path: "/direct-guidance-ticket",
        ele: <DirectGuidanceTickets/>,
        availability: [ur.supervisor]
    },
    {
        path: "/complete-guidance-ticket",
        ele: <CompleteGuidanceTickets/>,
        availability: [ur.contentCreator]
    },
]