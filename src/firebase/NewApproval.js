import { child, get, getDatabase, ref } from "firebase/database";
import { CompaniesArrays, StudentsArrays } from "../redux/action";
import { app } from '../firebase/firebaseConfig'
const dbRef = ref(getDatabase());

const Approvals = async (dispatch) => {





    await get(child(dbRef, `student/`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            async function myFunction() {
                return await [...Object.entries(snapshot.val()).map(entry => entry[1])]
            }
            const AllStudents = await myFunction()
            // console.log(AllStudents)
            async function NewApprovalStudentsFunction() {
                return await AllStudents?.map((item, index) =>
                    item?.approved === false ? item : false)
            }
            const NewApprovalStudent = await NewApprovalStudentsFunction()
            const NewApprovalStudentsArray = NewApprovalStudent.filter(Boolean)

            async function ApprovedStudents() {
                return await AllStudents?.map((item, index) =>
                    item?.approved === true ? item : false)
            }
            const ApprovedStudentsList = await ApprovedStudents()
            const ApprovedStudentsArray = ApprovedStudentsList.filter(Boolean)
            await dispatch(StudentsArrays({ ApprovedStudentsArray, NewApprovalStudentsArray }))

        }
    }).catch(error => {
        console.log("available jobs error", error)
    })











    await get(child(dbRef, `company/`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            async function myFunction() {
                return await [...Object.entries(snapshot.val()).map(entry => entry[1])]
            }
            const AllCompany = await myFunction()
            // console.log(AllCompany)
            async function NewApprovals() {
                return await AllCompany?.map((item, index) =>
                    item?.approved === false ? item : false)
            }
            const NewApprovalCompanies = await NewApprovals()
            const NewApprovalCompaniesArray = NewApprovalCompanies.filter(Boolean)
            // console.log("Company  filter=>", NewApprovalCompaniesArray)
            async function ApprovedCompanies() {
                return await AllCompany?.map((item, index) =>
                    item?.approved === true ? item : false)
            }
            const ApprovedCompaniesList = await ApprovedCompanies()
            const ApprovedCompaniesArray = ApprovedCompaniesList.filter(Boolean)

            await dispatch(CompaniesArrays({ ApprovedCompaniesArray, NewApprovalCompaniesArray }))


        }
    }).catch(error => {
        console.log("available jobs error", error)
    })







}

export { Approvals };
