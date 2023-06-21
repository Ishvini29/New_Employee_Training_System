import axios from "axios";
import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import jwt_decode from "jwt-decode";
const Notifications = () => {
    const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
    const [notifications, setNotifications] = useState([]);
    const [handleRefresh, setHandleRefresh] = useState(0);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_BASE+`/notifications/${userDocument._id}`)
            .then(response => {
                setNotifications(response.data.notifications);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [handleRefresh, userDocument])

    return (
        <div className="container mt-3">
            <h4 className="heading p-3 rounded">Notifications</h4>
            <hr></hr>
            {
                notifications.map((e) => {
                    return (
                        <NotificationCard data={e} handleRefresh={setHandleRefresh} refreshCount={handleRefresh}></NotificationCard>
                    )
                })
            }

        </div>
    )
}
export default Notifications;