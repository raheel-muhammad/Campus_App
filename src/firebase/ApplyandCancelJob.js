import { ref, set } from "firebase/database";

import { AvailableJobs } from "./AvailableJobs";
import { database } from './firebaseConfig';

async function ApplyJob(item, uid, dispatch) {
    try {
        await set(ref(database, `postedJobs/${item.jobID}/ApplicantsIDs/${uid}`), [uid]);
        await AvailableJobs(dispatch, uid)
        // console.log("apply success")
    } catch (error) {
        console.log(error)
    }

}

export { ApplyJob };
