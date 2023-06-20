import React, { useState, useEffect } from "react";
import axios from "axios";

const Forum = (props) => (
  <tr>
    <td>{props?.forum?.chapterName}</td>
    <td>{props?.forum?.forumTopic}</td>
    <td>{props?.forum?.forumDesc}</td>
    <td>{props?.forum?.attachmentStatus === true ? "yes" : "no"}</td>
    <td>{props?.forum?.old_data?.topic}</td>
    <td>{props?.forum?.old_data?.description}</td>
    <td>{props?.forum?.old_data?.attachmentAllowed === true ? "yes" : "no"}</td>
    <td>{props?.forum?.updatedby}</td>
    <td>{props?.forum?.updated_at}</td>
  </tr>
);

const ForumHistory = () => {
  const [editForums, setEditForums] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/editForums/")
      .then((response) => {
        setEditForums(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editforumsList = () =>
    editForums.map((currentForum, i) => <Forum forum={currentForum} key={i} />);

  return (
    <React.Fragment>
      <div>
        <div className="container p-4">
          <h3>Discussion Forum Edit History</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Chapter Name</th>
                <th>Forum Topic</th>
                <th>Forum Description</th>
                <th>Attachment Allowed Status</th>
                <th>Previous Forum Topic</th>
                <th>Previous Forum Description</th>
                <th>Previous Attachment Allowed Status</th>
                <th>Updated By</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>{editforumsList()}</tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForumHistory;
