import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UilFolderDownload } from "@iconscout/react-unicons";
import axios from "axios";
import swal from "sweetalert";
import Search from "../../components/search";
import jwt_decode from "jwt-decode";

const Submission = () => {
  // States
  const [downloadIcon, setDownloadIcon] = useState("");
  const [submissionData, setSubmissionData] = useState([]);
  const [errorHandling, setErrorHandling] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState();

  const supervisorId = jwt_decode(
    JSON?.parse(localStorage?.getItem("user"))?.token
  )?.userData?._id;

  // Fetch data on mount
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/getSubmissionTable/" + supervisorId)
      .then((res) => setSubmissionData(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          setErrorHandling(error.response.data.error);
        } else {
          // Handle other errors
          setErrorHandling(error.message);
        }
      });
  }, []);

  // Download zip file of the submitted project
  const handleGetZipFile = (empId) => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/getZipFile/" + empId)
      .then((res) => downloadFile(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle "User not found" error
          swal({
            title: "Not found",
            text: error.response.data.error,
            icon: "warning",
            dangerMode: true,
          });
        } else {
          // Handle other errors
          setErrorHandling(error.message);
        }
      });
  };
  // Download file using the provided URL
  const downloadFile = async (fileURL) => {
    try {
      const response = await fetch(fileURL);
      let fileNameIndex = fileURL.lastIndexOf("/");
      let fileName = fileURL.slice(fileNameIndex + 1);
      const blob = await response.blob(); //to convert the response into a Blob object.
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log(error);
    }
  };
  submissionData?.sort((a, b) => {
    if (a.status === b.status) {
      return 0; // Preserve the original order if both values are the same
    } else if (a.status) {
      return 1; // `a` is true and `b` is false, so `b` should come first
    } else {
      return -1; // `a` is false and `b` is true, so `a` should come first
    }
  });
  const getSearchValue = (search, showSearch) => {
    setSearch(search);
    setShowSearch(showSearch);
  };

  return (
    <>
      {/* checking whether there is error or not */}
      {submissionData?.length > 0 ? (
        <>
          {errorHandling === "" ? (
            <>
              <div className="d-flex justify-content-between m-4">
                <h3 className="text-secondary ">
                  Project Assignment Submission
                </h3>
                <div id="content-creator" className="mt-2">
                  <Search
                    handleGetSearchValue={getSearchValue}
                    width={{ width: "w-auto" }}
                  />
                </div>
              </div>
              <div className="table-responsive container-lg">
                <table className="table table-striped table-hover mt-sm-5 mt-lg-5">
                  <thead>
                    <tr className="table-head">
                      <th className="emp-id fw-normal">ID</th>
                      <th className="emp-name fw-normal">Name</th>
                      <th className="emp-sub fw-normal">Submitted Time</th>
                      <th className="emp-proName fw-normal">Project Name</th>
                      <th className="emp-status fw-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionData
                      ?.filter((emp) => {
                        // Filtering the editlog data based on the search query
                        const fullName = emp?.firstName + emp?.lastName;
                        if (showSearch) {
                          return emp;
                        } else if (
                          fullName
                            ?.toLowerCase()
                            ?.includes(search?.toLowerCase())
                        ) {
                          return emp;
                        }
                      })
                      ?.map((emp, index) => (
                        // when mouse enter the tr set state downloadIcon as employee ID when leave the mouse cursor set it to empty string
                        <tr
                          key={index}
                          onMouseEnter={() => setDownloadIcon(emp.empId)}
                          onMouseLeave={() => setDownloadIcon("")}
                        >
                          <td>{emp.empId}</td>
                          <td>
                            {emp.firstName} {emp.lastName}
                          </td>
                          <td
                            className="ps-4"
                            dangerouslySetInnerHTML={{
                              __html: emp.submittedOn,
                            }}
                          ></td>
                          <td className="td-download-icon">
                            {emp.projectName}{" "}
                            {/* if downloadIcon is equal to current employeeID the download icon will appear */}
                            {downloadIcon === emp.empId &&
                              emp?.isFileToDownload && (
                                <UilFolderDownload
                                  color="#0198E1"
                                  className="download-icon"
                                  // click to download file and pass employeeId as argument
                                  onClick={() => handleGetZipFile(emp.empId)}
                                />
                              )}
                          </td>

                          <td className="text-center">
                            {emp.status ? (
                              <Link
                                to="/evaluate"
                                state={{
                                  empId: emp.empId,
                                  firstName: emp.firstName,
                                  lastName: emp.lastName,
                                  projectName: emp.projectName,
                                  update: emp.status,
                                }}
                                className="text-decoration-none text-white"
                              >
                                <button className="btn btn-submission btn-sm btn-primary">
                                  Upgrade
                                </button>
                              </Link>
                            ) : (
                              <Link
                                to="/evaluate"
                                state={{
                                  empId: emp.empId,
                                  firstName: emp.firstName,
                                  projectName: emp.projectName,
                                  lastName: emp.lastName,
                                  update: emp.status,
                                }}
                                className="text-decoration-none text-white"
                              >
                                <button className="btn btn-submission btn-sm btn-danger">
                                  Evaluate
                                </button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div
              className="shadow text-center bg-dark text-light"
              width="90px"
              height="90px"
              style={{ margin: "15%", padding: "20px" }}
            >
              <h4>{errorHandling}</h4>
            </div>
          )}
        </>
      ) : (
        <div
          className="shadow text-center bg-dark text-light"
          width="90px"
          height="90px"
          style={{ margin: "15%", padding: "20px" }}
        >
          <h4>No submissions were submitted for evaluation. </h4>
        </div>
      )}
    </>
  );
};

export default Submission;
