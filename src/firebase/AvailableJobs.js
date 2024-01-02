import { child, get, getDatabase, ref } from "firebase/database";
import { AppliedJobsGetSuccess, GetAllJobs } from "../redux/action";
const dbRef = ref(getDatabase());


async function AvailableJobs(dispatch, uid) {
    await get(child(dbRef, `postedJobs/`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            async function myFunction() {
                return await [...Object.entries(snapshot.val()).map(entry => entry[1])]
            }
            const jobArray = await myFunction()


            async function AppliedJobs() {

                return await jobArray?.map((item, index) =>
                    item.blocked ? false :
                        item?.ApplicantsIDs ?
                            Object?.entries(item?.ApplicantsIDs)?.map((entry) => entry[0] === uid ? item : false) : false)
            }

            const AppliedJobsList = await AppliedJobs()
            const AppliedJobsArray = AppliedJobsList.flat().filter(Boolean)



            // console.log(jobArray)
            // console.log(AppliedJobsArray)
            const AvailableJobsArray = jobArray.filter(a => !AppliedJobsArray.map(b => b.jobID).includes(a.jobID))

            // console.log("filter", AvailableJobsArray)
            dispatch(GetAllJobs(AvailableJobsArray))

            dispatch(AppliedJobsGetSuccess(AppliedJobsArray))
        }
    }).catch(error => {
        console.log("available jobs error", error)
    })

}








const AllJobsArray = async (uid, dispatch) => {
    await get(child(dbRef, `postedJobs/`)).then(async (snapshot) => {

        if (snapshot.exists()) {

            async function filterArray() {
                return await [...Object.entries(snapshot.val()).map(entry => entry[1])].filter(element => element.companyID === uid)
            }
            const jobArray = await filterArray()
            // console.log("company jobs===>", jobArray.filter(Boolean))
            dispatch(GetAllJobs(jobArray.filter(Boolean)))

        }
    })
}






export { AvailableJobs, AllJobsArray };
