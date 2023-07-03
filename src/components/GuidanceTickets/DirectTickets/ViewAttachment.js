import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ViewAttachment = (props) => {
  const params = useParams();
  const [link, setLink] = useState(null);
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_BASE +`/get-ticket-details-by-ticket-id/${params.ticketId}`
      )
      .then((response) => {
        setLink(response.data.attachment);
      })
      .catch(function (error) {
        console.log(error);
      });
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
