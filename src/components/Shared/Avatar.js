import React from "react";
import AvatarRound from "react-avatar";

const Avatar = (props) => {
  return (
    <div className="d-flex align-items-center">
      <AvatarRound src={`${props?.img}`} round size={50} />
    </div>
  );
};

export default Avatar;
