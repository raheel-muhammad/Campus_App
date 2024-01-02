import { MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileNavigation = () => {
  const UserDetails = useSelector((state) => state.user);
  return (
    <div>
      <Link
        to={
          UserDetails.role === "student" ? "/studentprofile" : "/companyprofile"
        }
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <MenuItem>Profile</MenuItem>
      </Link>
    </div>
  );
};

export default ProfileNavigation;
