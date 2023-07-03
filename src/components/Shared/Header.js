import React from "react";

const Header = (props) => {
  return (
    <h4 className="heading p-3 rounded">
      {props.title}
    </h4>
  );
};

export default Header;