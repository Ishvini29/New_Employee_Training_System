import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// Component Imports
import AboutNETS from "./AboutNETS";
import InfoSection from "./InfoSection";
import FurtherDetails from "./FurtherDetails";
// we didnt install google as module. we connected javascript to index.html
// so when in compiling google will not be available
// so, when in compiling it will get empty object
// otherwise it will take from window.google
const google = window.google = window.google ? window.google : {}

const GoogleLogin = () => {
    // To get access to the current location object of the router. 
    // The location object contains information about the current URL 
    // and can be used to extract query parameters, route parameters, or 
    // any other data associated with the current location.
    // will re render with url changes
    const location = useLocation();
    // The navigate function can be used to programmatically navigate to a 
    // new URL in the application, either by pushing a new URL to the 
    // history stack or by replacing the current URL.
    const navigate = useNavigate();
    // if user enter any url to another page without logging in user will be navigated  to
    // login automatically. after signin, user will be redirected to correct page
    const redirectPath = location.state?.path || "/home"
    // this state is used to determine whether user is new to system o rnot
    // if new user it will be true else false
    const [isThisNewUser, setIsThisNewUser] = useState(false);
    const [googleLoginDecodedValues, setGoogleLoginDecodedValues] = useState();
    // we have handleGoogle function to handle google login, after click the login page, 
    // handleGoogle function has parameter response
    // response in object format
    // object contains, image, token, fname, lname, email, iat, eat etc...
    const handleGoogle = async (response) => {
        // Response includes fname, lname, email, picture, credential(token), iat, eat and etc.
        // from that we assign decoded token into googleLoginDecodedValues to send to further data
        // if user is new
        setGoogleLoginDecodedValues(jwt_decode(response.credential));
        // we send post request to following endpoint, it gets token as a body 
        axios.post(process.env.REACT_APP_API_BASE+'/authentication/login', { credential: response.credential })
            .then((res) => {
                // if res.data.status is true, if there is no any un handled error in backend
                if (res.data.status === true) {
                    console.log(res.data)
                    // This is the logic if user is available and verified
                    if (res.data.verified === true && res.data.availability === true) {
                        // user data will be stored in local storage
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                        Swal.fire({
                            title: 'Login Success',
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        })
                        // and will be navigated to the page user entered before or home page
                        navigate(redirectPath, { replace: true });
                    } else if (res.data.verified === false && res.data.availability === true) {
                        // means account is not verified, will show a alert modal
                        Swal.fire(
                            `Hello ${res?.data.user.firstName + " " + res.data.user.lastName} !`,
                            "Your Account is not verified yet. Try again later. <br> After verification you will be notified via E-Mail",
                            'info'
                        )
                    } else if (res.data.verified === false && res.data.availability === false) {
                        // means user is new to the system, it will set 
                        // isThisNewUser as true, if this variable set as true, then 
                        // futher data form will be displayed, and infoSection will be hidden
                        Swal.fire(`Hello ${res?.data.user.firstName + " " + res.data.user.lastName}`, "Welcome to New Employee Training System !", 'info')
                        setIsThisNewUser(true);
                        document.getElementById("infoSection").hidden = true;
                    }
                } else {
                    alert("BackEnd Error");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Network Error")
            });
    };

    // This useEffect is used to render the Google Login Button within the loginDiv element
    useEffect(() => {
        // if google is available and account, id is available it will initialize
        google?.accounts?.id?.initialize({
            client_id: "707797281139-4aqd3htq7bnut6nsp76ufc448svl64r9.apps.googleusercontent.com",
            callback: handleGoogle,
        });
        // if google is available and account, id is available it will render the button
        google?.accounts?.id?.renderButton(document.getElementById("loginDiv"), {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "square",
        });
        // it will prompt the continue  as email
        google?.accounts?.id?.prompt();
    }, []);

    return (
        <React.Fragment>
            <div id="infoSection" style={{ "userSelect": "none" }}>
                {/* info section contains loginDiv element to render the google login button */}
                <InfoSection />
                <AboutNETS />
            </div >
            {
                // if new user found, further details form will appear
                // otherwise it will just return null
                // googleLoginDecodedValues values will be sent to further details form and
                // some available data (ie: fname, lname, email, image) will be shown in the form 
                (isThisNewUser === true)
                    ? <FurtherDetails userData={googleLoginDecodedValues} />
                    : null
            }

        </React.Fragment >
    );
};

export default GoogleLogin;