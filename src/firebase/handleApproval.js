import { getDatabase, ref, remove, set, update } from "firebase/database";
import { database } from './firebaseConfig';
import { getAuth } from "firebase/auth";
import { ApprovalSuccessStudents, ApprovalSuccessCompanies } from "../redux/action";
// import { JobDeleteSuccess, JobPostSuccess } from '../redux/action';
const db = getDatabase();

// async function AddNewJob(JobData) {
//     const Data = JSON.parse(JSON.stringify(JobData));

//     try {
//         await set(ref(database, `postedJobs/${Data.jobID}`), {
//             JobDesignation: Data.JobDesignation,
//             RequiredQualification: Data.RequiredQualification,
//             Location: Data.Location,
//             VacantPosition: Data.VacantPosition,
//             category: Data.category,
//             jobID: Data.jobID,
//             companyID: Data.uid
//         });
//         JobData.dispatch(JobPostSuccess(Data));
//         console.log("job post successfull")
//     } catch (error) {
//         console.log(error)
//     };
// }

async function AcceptApprovals(category, index, uid, dispatch, item) {

    // const Data = JSON.parse(JSON.stringify(JobData))
    // await remove(ref(database, `postedJobs/${Data.jobID}`)).then(() => {
    //     dispatch(JobDeleteSuccess(index))
    //     console.log("Deleted Success")
    // }).catch((e) => {
    //     console.log("delete fails", e)
    // })
    const data = { ...item, approved: true }

    await update(ref(db, `${category}/${uid}`), { approved: true }).then(() => {
        if (category === "student") {
            // console.log("S==>", { index, item })
            dispatch(ApprovalSuccessStudents({ index, data }))

        }
        else {
            // console.log("C==>", { index, item })
            dispatch(ApprovalSuccessCompanies({ index, data }))
        }
        // console.log("approved!");
    })
        .catch(error => {
            console.log(error);
        })


}

async function RejectUser(category, index, uid) {

    // const db = getDatabase();
    // const Data = JSON.parse(JSON.stringify(JobData));
    // const updates = {};
    // updates[`postedJobs/${JobData.jobID}`] = Data;
    // await update(ref(db, `postedJobs/${JobData.jobID}`), Data).then(() => {
    //     console.log("Job Updated successfully!");
    // })
    //     .catch(error => {
    //         console.log(error);
    //     })

    // await remove(ref(database, `${category}/${uid}`)).then(() => {
    //     // dispatch(JobDeleteSuccess(index))
    //     console.log("Deleted Success")
    // }).catch((e) => {
    //     console.log("delete fails", e)
    // })

    // // getAuth()
    // //     .deleteUser(uid)
    // //     .then(() => {
    // //         console.log('Successfully deleted user');
    // //     })
    // //     .catch((error) => {
    // //         console.log('Error deleting user:', error);
    // //     });
    // console.log("remove==>", getAuth())




}

export { AcceptApprovals };

