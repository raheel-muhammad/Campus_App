import { MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from '../../firebase/firebaseConfig';
import { logoutFail, logoutStart, logoutSuccess } from "../../redux/action";


export const LogOut = () => {

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logoutStart());

    try {
      await signOut(auth);
      dispatch(logoutSuccess());

    } catch (e) {
      dispatch(logoutFail());
    }
  };

  return (
    <div>
      <MenuItem variant="contained" onClick={handleLogOut} disableElevation>
        Logout
      </MenuItem>
    </div>
  );
};
