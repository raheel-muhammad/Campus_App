import { getDatabase, ref, update } from "firebase/database";
import { ProfileUpdateSuccess } from "../redux/action";
export async function ProfileUpdate(userData) {
  const db = getDatabase();
  const Data = JSON.parse(JSON.stringify(userData));
  const updates = {};
  updates[`${userData.role}/${userData.uid}`] = Data;
  await update(ref(db, `${userData.role}/${userData.uid}`), Data)
    .then(() => {
      // userData.dispatch(ProfileUpdateSuccess(userData));
      console.log("Data saved successfully!");
    })
    .catch(error => {
      console.log(error);
    });
}

export async function imgUpdate(url, uid, role) {
  const db = getDatabase();
  const URL = JSON.parse(JSON.stringify(url));
  const updates = {};

  updates[`${role}/${uid}`] = URL;
  await update(ref(db, `${role}/${uid}`), URL)
    .then(() => {
      // console.log("url update");
    })
    .catch(() => {
      console.log("error occurred");
    });
}
