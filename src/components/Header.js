import React from 'react';
import Button from './Button';
import jwt_decode from "jwt-decode";

const Header = ({ showForm, changeTextAndColor }) => {
    const userDocument = jwt_decode(JSON.parse(localStorage.getItem("user")).token).userData;
    const userRole = userDocument?.userRole;
    return (
        <>
            {
                ["Content Creator", "Supervisor"].includes(userRole)
                &&
                <div className="container p-3">
                    <Button onClick={showForm} color={changeTextAndColor ? ' #625F5F' : '#1D9EEC'} text={changeTextAndColor ? 'Close' : 'Add'} />
                </div>
            }
        </>
    )
}

export default Header;
