import { child, get, getDatabase, ref } from "firebase/database";
import { GetAppliedStudents } from "../redux/action";




const GetAppliedStudentData = async (props, dispatch) => {
    // console.log("props===>", props)
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `student/${props}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            await snapshot.val()
            // console.log("std", snapshot.val())
            await dispatch(GetAppliedStudents(snapshot.val()))
        }
    }).catch((error) => {
        console.error(error)
    })
}

export { GetAppliedStudentData };
