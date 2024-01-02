import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { registerSuccess } from '../redux/action';
import { AvailableJobs } from "./AvailableJobs";
import { database } from './firebaseConfig';


const auth = getAuth();

async function signUp(authParams) {
  const { email, password, role, userName, dispatch } = authParams

  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)
  writeUserData(uid, email, role, userName, dispatch)
};

async function writeUserData(uid, email, role, userName, dispatch) {
  try {
    await set(ref(database, role === 'student' ? `student/${uid}` : `company/${uid}`), {
      uid: uid,
      email: email,
      role: role,
      userName: userName,
      approved: false,
      blocked: false
    });






    role === "student" && await AvailableJobs(dispatch)
    dispatch(registerSuccess({ uid, email, role, userName }));

  } catch (error) {
    console.log(error)
  };
}

export {
  signUp,


};

