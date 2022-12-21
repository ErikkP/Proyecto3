import React from "react";
import User from "./User";
import {Link} from "react-router-dom"

const Profile = () => {
  return (
    <div className="profile">
      <User></User>
      <Link to={"/mod_user"}>
              <button class="btn btn-warning">Modificar perfil</button>
            </Link>
    </div>
  );
};

export default Profile;
