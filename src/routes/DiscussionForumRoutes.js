import AddReply from "../components/Forums/AddReply";
import CreateForum from "../components/Forums/CreateForum";
import CreatePost from "../components/Forums/CreatePost";
import EditForum from "../components/Forums/EditForum";
import Forums from "../components/Forums/Forums";
import ViewAttachment from "../components/Forums/ViewAttachment";
import ViewForum from "../components/Forums/ViewForum";
import { userRoles as ur } from "../data/userRole";
export const discussion_forum_routes = [
  {
    path: "/forums/:chapterID/:chapterName",
    ele: <Forums />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor, ur.systemAdmin],
  },
  {
    path: "/view-forum/:forumId",
    ele: <ViewForum />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
  {
    path: "/create-forum/:chapterID/:chapterName",
    ele: <CreateForum />,
    availability: [ur.contentCreator, ur.supervisor],
  },
  {
    path: "/edit-forum/:forumId/:chapterID/:chapterName",
    ele: <EditForum />,
    availability: [ur.contentCreator, ur.supervisor],
  },
  {
    path: "/create-post/:forumId",
    ele: <CreatePost />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
  {
    path: "/add-reply/:forumId/:commentId",
    ele: <AddReply />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
  {
    path: "/view-forum/:forumId/:postId",
    ele: <ViewAttachment type="posts" />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
  {
    path: "/view-forum/:forumId/:postId/:replyId",
    ele: <ViewAttachment type="replies" />,
    availability: [ur.hiredEmployee, ur.contentCreator, ur.supervisor],
  },
];
