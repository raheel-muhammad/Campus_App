import { getDatabase, ref, remove, set, update } from "firebase/database";
import { database } from './firebaseConfig';

import { JobDeleteSuccess, JobPostSuccess } from '../redux/action';


async function AddNewJob(JobData) {
    const Data = JSON.parse(JSON.stringify(JobData));

    try {
        await set(ref(database, `postedJobs/${Data.jobID}`), {
            JobDesignation: Data.JobDesignation,
            RequiredQualification: Data.RequiredQualification,
            Location: Data.Location,
            VacantPosition: Data.VacantPosition,
            category: Data.category,
            jobID: Data.jobID,
            companyID: Data.uid,
            blocked: false
        });
        JobData.dispatch(JobPostSuccess(Data));
        console.log("job post successfull")
    } catch (error) {
        console.log(error)
    };
}

async function DeleteJob(JobData, uid, dispatch, index) {

    const Data = JSON.parse(JSON.stringify(JobData))
    await remove(ref(database, `postedJobs/${Data.jobID}`)).then(() => {
        dispatch(JobDeleteSuccess(index))
        console.log("Deleted Success")
    }).catch((e) => {
        console.log("delete fails", e)
    })



}

async function UpdateJob(JobData) {

    const db = getDatabase();
    const Data = JSON.parse(JSON.stringify(JobData));
    const updates = {};
    updates[`postedJobs/${JobData.jobID}`] = Data;
    await update(ref(db, `postedJobs/${JobData.jobID}`), Data).then(() => {
        console.log("Job Updated successfully!");
    })
        .catch(error => {
            console.log(error);
        })






}

export { AddNewJob, UpdateJob, DeleteJob };

