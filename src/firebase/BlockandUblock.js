import { getDatabase, ref, remove, set, update, get, child } from "firebase/database";
import { database } from './firebaseConfig';
import { getAuth } from "firebase/auth";
import { CompanyBlockedOrUnNlockSuccess, StudentBlockedOrUnNlockSuccess } from "../redux/action";

const dbRef = ref(getDatabase());
async function handleBlockOrUnblock(role, item, dispatch, index) {


    const data = item.blocked ? { ...item, blocked: false } : { ...item, blocked: true }
    await update(ref(database, `${role}/${data.uid}`), { blocked: data.blocked }).then(async () => {
        if (role === "student") {
            dispatch(StudentBlockedOrUnNlockSuccess({ index, data }))

        }
        else {
            await get(child(dbRef, `postedJobs/`)).then(async (snapshot) => {

                if (snapshot.exists()) {

                    async function filterArray() {
                        return await [...Object.entries(snapshot.val()).map(entry => entry[1])].filter(element => element.companyID === data.uid)
                    }
                    const jobArray = await filterArray()
                    jobArray.map((item, index) => {
                        update(ref(database, `postedJobs/${item.jobID}`), { blocked: data.blocked })
                    })

                }
            })

            dispatch(CompanyBlockedOrUnNlockSuccess({ index, data }))
        }

    })
        .catch(error => {
            console.log(error);
        })







}








export { handleBlockOrUnblock }