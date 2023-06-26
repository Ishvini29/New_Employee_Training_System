import React from "react";
import Avatar from "../Shared/Avatar";

const Comment = (props) => {
  return (
    <>
      <div key={props?.id} className="d-flex flex-row user p-2 mt-2 border-top">
        <Avatar user={props?.user} img={props?.img} />
        <div className="d-flex flex-column mx-2 my-auto">
          <span className="font-weight-bold" style={{ fontSize: "16px" }}>
            {props?.user}
            <span style={{ fontSize: "12px", marginLeft: "8px" }}>
              {props?.role}
            </span>
            <span style={{ fontSize: "12px", marginLeft: "8px" }}>
              {props?.time}
            </span>
          </span>
        </div>
      </div>
      <div className="mt-2 p-2">
        <p style={{ fontSize: "14px" }}>{props?.message}</p>
      </div>
    </>
  );
};

export default Comment;
