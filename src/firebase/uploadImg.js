import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ProfilePictureUploadSuccess } from "../redux/action";
import { imgUpdate } from "./ProfileUpdate";
export default async function uploadImage(Data) {
  const storage = getStorage();
  const storageRef = ref(storage, "image/" + Data.ImgName);
  await uploadBytes(storageRef, Data.e.target.files[0])
    .then(async snapshot => {
      // console.log("Uploaded a blob or file!");
      const url = await getDownloadURL(storageRef);
      await imgUpdate({ ImgUrl: url }, Data.ImgName, Data.role);
      Data.dispatch(ProfilePictureUploadSuccess(url));
    })
    .catch(e => {
      console.log("error==>", e);
    });
}
