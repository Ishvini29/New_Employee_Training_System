import { useEffect, useState } from "react";

// It takes an object destructuring argument "handleGetTabReport" prop.
const TabReport = ({ handleGetTabReport }) => {
  const [show, setShow] = useState("hired-employee");

  // The function is run initially when the component mounts
  // and again whenever the value of show changes.
  useEffect(() => {
    handleGetTabReport(show);
  }, [show]);

  return (
    <ul className="nav mx-md-3">
      <li className="nav-item report-tab">
        {/* Apply "active" class if show is true 
        and set show to true when Hired Employee tab is clicked*/}
        <a
          className={`nav-link btn btn-outline-primary  ${
            show === "hired-employee" ? "active" : ""
          }`}
          aria-current="page"
          href="#hired-employee"
          onClick={() => setShow("hired-employee")}
        >
          Hired Employees
        </a>
      </li>
      <li className="nav-item report-tab">
        {/* Apply "active" class if show is false 
        and set show to false when Content Creators tab is clicked*/}
        <a
          className={`btn btn-outline-primary nav-link  ${
            show === "content-creator" ? "active" : ""
          }`}
          href="#content-creator"
          onClick={() => setShow("content-creator")}
        >
          Content Creators
        </a>
      </li>
      <li className="nav-item report-tab">
        {/* Apply "active" class if show is false 
        and set show to false when Supervisor tab is clicked*/}
        <a
          className={`btn btn-outline-primary nav-link  ${
            show === "supervisor" ? "active" : ""
          }`}
          href="#supervisor"
          onClick={() => setShow("supervisor")}
        >
          Supervisors
        </a>
      </li>
    </ul>
  );
};

export default TabReport;

// This component is used in Report.jsx file.
