import { useState, useEffect } from "react";
import { MdOutlineCancel, MdOutlineCheckCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Review = () => {
  const [review, setReview] = useState({});
  const location = useLocation();
  const propsData = location.state;
  const currentUser = propsData?.userId;
  const unitId = propsData?.unitId;
  const userImage = propsData?.userImage;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE+"/review/" + currentUser + "/" + unitId)
      .then((res) => setReview(res.data))
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
      {propsData?.userName !== undefined && (
        <div className=".emp-name-and-id d-flex py-4 ms-5 ps-lg-5">
          <img
            className="img-fluid rounded-circle supervisor-avatar"
            src={userImage}
            alt={propsData?.userName}
          />
          <div className="d-flex flex-column ps-4">
            <h3>{propsData?.userName}</h3>
            <h5 className="text-secondary ms-2">{propsData?.empId}</h5>
          </div>
        </div>
      )}
      {Object.keys(review).length !== 0 ? (
        <div className=" container-md pt-3">
          {review?.reviewData?.map((review, index) => (
            <div key={index}>
              <div className="question" key={index}>
                {/* question number */}
                <h5 className="quesno d-flex align-items-center justify-content-between">
                  Question: {index + 1}
                  {/* if submitted answer is matched with correct answer tick will be displayed else cross will be displayed*/}
                  {review?.checkedStatus ? (
                    <MdOutlineCheckCircle className=" fs-2" color="#4fdc6e" />
                  ) : (
                    <MdOutlineCancel className="fs-2" color="#ff0000" />
                  )}
                </h5>

                <div className="que ">
                  {/* displaying question */}
                  <p>{review?.question}</p>
                  <div className="m-0">
                    {/* displaying answers: correct answer in green color, wrong answer in red color, others is in ash color */}
                    {review?.answers?.map((answer, index) => (
                      <div key={index}>
                        {review?.correctAnswer === index ? (
                          <div className={`ans-badge corr-ans  m-2 `}>
                            {answer}
                          </div>
                        ) : index === review?.submittedAnswer ? (
                          <div className={`ans-badge wrong-ans m-2`}>
                            {answer}
                          </div>
                        ) : (
                          <span className={`ans-badge other-ans m-2`}>
                            {answer}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default Review;
