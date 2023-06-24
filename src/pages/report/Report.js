import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../components/search";
import TabReport from "../../components/tabReport";
import axios from "axios";
import swal from "sweetalert";

const Report = () => {
  const [reportDetails, setReportDetails] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // navigate to chapter report page
  const routeToChapterReport = (empId) => {
    navigate("/chapterreport", { state: { empId } });
  };
  // navigate to ratings report page
  const routeToRatingsReport = (empId) => {
    navigate("/ratingsreport", {
      state: { empId: empId },
    });
  };

  // whether show the tab report or not
  const getTabReport = (show) => {
    setShow(show);
  };
  //store search value, show search value into states
  const getSearchValue = (search, showSearch) => {
    setSearch(search);
    setShowSearch(showSearch);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_API_BASE + "/showAllUsers")
      .then((res) => {
        setReportDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          swal({
            title: "Error",
            text: error.response.data.error,
            icon: "warning",
            dangerMode: true,
          });
        } else {
          // Handle other errors
          swal({
            title: "Error",
            text: error.message,
            icon: "warning",
            dangerMode: true,
          });
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <center>
          <div className="spinner-grow mt-3" role="status"></div>
        </center>
      ) : reportDetails?.length > 0 ? ( //checking whether system has data to show
        <div className="mt-3">
          <TabReport handleGetTabReport={getTabReport} />
          <div className="">
            <Search
              handleGetSearchValue={getSearchValue}
              width={{ width: "w-auto" }}
            />
          </div>
          <table className=" empTable table table-striped table-hover mt-sm-5 mt-lg-5 ">
            <thead>
              <tr className="table-head table-dark">
                <th className="ps-5">ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Job Title</th>
              </tr>
            </thead>
            <tbody>
              {/* filtering employees */}
              {reportDetails
                ?.filter((emp) => {
                  let name = emp?.firstName + " " + emp?.lastName;
                  if (showSearch) {
                    return emp;
                  } else if (
                    name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return emp;
                  }
                })
                ?.map((emp, index) =>
                  show //allow only hired employees
                    ? emp?.userRoleValue.toLowerCase() === "hired employee" && (
                        <tr
                          key={index}
                          onClick={() => routeToChapterReport(emp?.empId)}
                        >
                          <td>
                            <img
                              className="img-fluid rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                              src={emp?.userImage}
                              alt={emp?.firstName}
                            />
                            {"  "}
                            {emp?.empId}
                          </td>
                          <td>
                            {emp?.firstName} {emp?.lastName}
                          </td>
                          <td>{emp?.depName}</td>
                          <td>{emp?.jobTitle}</td>
                        </tr>
                      )
                    : emp?.userRoleValue.toLowerCase() ===
                        "content creator" && ( //allow only content creators
                        <tr
                          key={index}
                          onClick={() => routeToRatingsReport(emp?.empId)}
                        >
                          <td>
                            <img
                              className="img-fluid rounded-circle"
                              style={{ width: "50px", height: "50px" }}
                              src={emp?.userImage}
                              alt={emp?.firstName}
                            />{" "}
                            {emp?.empId}
                          </td>
                          <td>
                            {emp?.firstName} {emp?.lastName}
                          </td>
                          <td>{emp?.depName}</td>
                          <td>{emp?.jobTitle}</td>
                        </tr>
                      )
                )}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>No data available for display</h4>
        </div>
      )}
    </>
  );
};

export default Report;
