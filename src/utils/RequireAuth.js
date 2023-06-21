import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
import jwt_decode from "jwt-decode";
const RequireAuth = ({ children, userroles }) => {
    let currentUserRole;
    if(localStorage.getItem("user")){
        currentUserRole = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData.userRole;
    }
    const userData = JSON.parse(localStorage.getItem("user"));
    // sample user response {picture:"", token:""}
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userData) {
            console.log("Checking Token Validity");
            axios.get(process.env.REACT_APP_API_BASE+`/authentication/verifyToken/${userData.token}`)
                .then((res) => {
                    if (res.data.status === false) {
                        localStorage.removeItem("user");
                        navigate("/login", { replace: true });
                        swal("Session Time Out!", "Sorry, Session Time out. Login again to use the application.", "warning");
                    }
                }).catch((error) => {
                    console.log(error)
                });
        }
    }, [navigate, userData])

    //state={{path:location.pathname}} in else part will pass requested url to the component
    if (userData?.token) {
        if (userroles) {
            if (userroles.includes(currentUserRole)) {
                return children
            } else {
                swal("Warning !", "Access Denied !", "warning");
                return <Navigate to="/home" state={{ path: location.pathname }} />
            }
        } else {
            return children
        }
    } else {
        // there are some pages that all user roles can access. if that is a case, we will not give
        // availability in route. so, user roles will not be able to access
        // that is why, we have this else component eg: home, profile
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

}
export default RequireAuth