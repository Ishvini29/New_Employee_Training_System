import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ViewAttachment = (props) => {
  const params = useParams();
  const [link, setLink] = useState("");
  useEffect(() => {
    props?.type === "posts" ? (
      axios
        .get(
          process.env.REACT_APP_API_BASE +
            `/get-post-details-by-post-id/${params?.forumId}/${params?.postId}`
        )
        .then((response) => {
          console.log(response.data[0].attachment);
          setLink(response.data[0].attachment);
        })
        .catch(function (error) {
          console.log(error);
        })
    ) : props?.type === "replies" ? (
      axios
        .get(
          process.env.REACT_APP_API_BASE +
            `/get-reply-details-by-reply-id/${params?.forumId}/${params?.postId}/${params?.replyId}`
        )
        .then((response) => {
          console.log(response.data[0].attachment);
          setLink(response.data[0].attachment);
        })
        .catch(function (error) {
          console.log(error);
        })
    ) : (
      <></>
    );
  }, []);
  return (
    <div style={{ backgroundColor: "#202121" }}>
      <div style={{ textAlign: "center", height: "900px" }}>
        <iframe
          title="myframe"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            margin: "0 auto",
          }}
          src={link}
        ></iframe>
      </div>
    </div>
  );
};

export default ViewAttachment;
