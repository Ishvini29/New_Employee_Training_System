import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const NotificationCard = ({ data, handleRefresh, refreshCount }) => {
    const userID = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData._id;
    const [loading, setLoading] = useState(false);
    const handleNotificationSeen = (notificationID) => {
        setLoading(true);
        const postBody = {
            userID: userID,
            notificationID: notificationID
        }

        axios.post(process.env.REACT_APP_API_BASE + '/notification/seen', postBody)
            .then((res) => {
                console.log(res);
                handleRefresh(refreshCount + 1)
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            });
    }
    const color = (data.seen === true) ? "bg-dark" : "bg-success";
    return (
        <div className="card mt-2">
            <div className={"card-header " + color}></div>
            <div className={"card-body"}>
                {data?.message}
            </div>
            <div className="card-footer">
                <span className="me-2">
                    {new Date(data?.time).toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}
                </span>
                {
                    (data.seen === true) ? null :
                        <button className="btn btn-outline-success btn-sm  align-items-center " onClick={() => { handleNotificationSeen(data._id) }}>
                            {
                                (loading === false) ? "Mark as Read" : <span className='spinner-grow spinner-grow-sm me-3' role="status"></span>
                            }
                        </button>
                }

            </div>
        </div>
    );
}
export default NotificationCard;