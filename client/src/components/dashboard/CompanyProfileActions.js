import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-companyprofile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Изменить профиль
      </Link>
    </div>
  );
};

export default ProfileActions;
