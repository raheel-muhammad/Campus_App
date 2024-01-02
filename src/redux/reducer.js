import * as type from "./actionType";

const initialState = {
  loading: false,
  loginStatus: false,
  uid: "",
  role: "",
  error: "",
  isAdmin: false,
  approve: false,
  email: "",
  userName: "",
  fullname: "",
  fathername: "",
  cnic: "",
  address: "",
  contact: "",
  qualification: "",
  profilePicture: "",
  website: "",
  service: "",
  alljobs: [],
  AppliedStudents: [],
  category: "",
  AppliedJobs: [],
  ApprovedStudentsArray: [],
  NewApprovalStudentsArray: [],
  ApprovedCompaniesArray: [],
  NewApprovalCompaniesArray: [],
  blocked: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case type.GET_ALL_JOB_INIT:
    case type.REGISTER_START:
    case type.LOGIN_START:
    case type.LOGOUT_START:
    case type.PASSWORD_RESET_INITIATE:
      return { ...state, loading: true };
    case type.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loginStatus: false,
        uid: "",
        role: "",
        error: "",
        isAdmin: false,
        approve: false,
        email: "",
        userName: "",
        fullname: "",
        fathername: "",
        cnic: "",
        address: "",
        contact: "",
        qualification: "",
        profilePicture: "",
        website: "",
        service: "",
        alljobs: [],
        AppliedStudents: [],
        category: "",
        AppliedJobs: [],
        ApprovedStudentsArray: [],
        NewApprovalStudentsArray: [],
        ApprovedCompaniesArray: [],
        NewApprovalCompaniesArray: [],
        blocked: false

      };
    case type.JOB_UPDATE_INIT:
    case type.JOB_POST_INIT:
    case type.PROFILE_UPDATE_INIT:
      return { ...state, loading: true };
    case type.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        fullname: action.payload.fullname,
        fathername: action.payload.fathername,
        cnic: action.payload.cnic,
        address: action.payload.address,
        contact: action.payload.contact,
        qualification: action.payload.qualification,
        website: action.payload.website,
        service: action.payload.service,
        category: action.payload.category
      };
    case type.LOGIN_SUCCESS:
    case type.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loginStatus: true,
        registerSuccess: true,
        role: action.payload.role,
        email: action.payload.email,
        uid: action.payload.uid,
        userName: action.payload.userName,
        fullname: action.payload.fullname,
        fathername: action.payload.fathername,
        cnic: action.payload.cnic,
        address: action.payload.address,
        contact: action.payload.contact,
        qualification: action.payload.qualification,
        profilePicture: action.payload.ImgUrl,
        website: action.payload.website,
        service: action.payload.service,
        category: action.payload.category,
        approved: action.payload.approved,
        blocked: action.payload.blocked
      };
    case type.GET_ALL_JOB:
      return {
        ...state,
        alljobs: action.payload
      }
    case type.JOB_UPDATE_FAIL:
    case type.JOB_POST_FAIL:
    case type.PASSWORD_RESET_FAIL:
    case type.PASSWORD_RESET_SUCCESS:
    case type.PROFILE_UPDATE_Fail:
    case type.LOGOUT_FAIL:
      return { ...state, loading: false };
    case type.REGISTER_FAIL:
    case type.LOGIN_FAIL:
      return { ...state, loading: false, loginStatus: false };
    case type.PROFILE_PICTURE_UPLOAD_SUCCESS:
      return {
        ...state,
        profilePicture: action.payload
      };
    // case type.GET_ALL_JOB_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     alljobs: action.payload
    //   }
    case type.JOB_UPDATE_SUCCESS:

      const newArray = [...state.alljobs]
      newArray[action.payload.index] = action.payload



      return {
        ...state,
        loading: false,
        alljobs: newArray
        // alljobs: {
        //   ...state.alljobs,
        //   [action.payload.jobID]: action.payload,

        // }
      }
    case type.JOB_DELETE_INIT:
      return {
        ...state,
        loading: true
      }
    case type.JOB_DELETE_SUCCESS:
      // const alljobs = { ...state.alljobs }
      // delete alljobs[action.payload]

      return {
        ...state,
        loading: false,
        alljobs: [
          ...state.alljobs.slice(0, action.payload),
          ...state.alljobs.slice(action.payload + 1)
        ],

      }
    case type.JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        alljobs: [...state.alljobs, action.payload]
        // alljobs: {
        //   ...state.alljobs,

        //   [action.payload.jobID]: action.payload
        // }
      }

    case type.GET_APPLIED_STUDENTS:
      return {
        ...state,
        AppliedStudents: [...state.AppliedStudents, action.payload]
      }

    case type.REMOVE_APPLIED_STUDENT:
      return {
        ...state,
        AppliedStudents: []
      }

    case type.APPLY_JOB_SUCCESS:
      return {
        ...state,
        AppliedStudents: [...state.AppliedStudents, action.payload]
      }


    case type.APPLIED_JOBS_GET_SUCCESS:
      return {
        ...state,
        AppliedJobs: action.payload
      }
    case type.STUDENTS_ARRAYS:
      return {
        ...state,
        ApprovedStudentsArray: action.payload.ApprovedStudentsArray,
        NewApprovalStudentsArray: action.payload.NewApprovalStudentsArray
      }
    case type.COMPANIES_ARRAYS:
      return {
        ...state,
        ApprovedCompaniesArray: action.payload.ApprovedCompaniesArray,
        NewApprovalCompaniesArray: action.payload.NewApprovalCompaniesArray
      }
    case type.APPROVAL_SUCCESS_STUDENTS:
      return {
        ...state,
        NewApprovalStudentsArray: [...state.NewApprovalStudentsArray.slice(0, action.payload.index),
        ...state.NewApprovalStudentsArray.slice(action.payload.index + 1)],
        ApprovedStudentsArray: [...state.ApprovedStudentsArray, action.payload.item]


      }
    case type.APPROVAL_SUCCESS_COMPANIES:
      return {
        ...state,
        NewApprovalCompaniesArray: [...state.NewApprovalCompaniesArray.slice(0, action.payload.index),
        ...state.NewApprovalCompaniesArray.slice(action.payload.index + 1)],
        ApprovedCompaniesArray: [...state.ApprovedCompaniesArray, action.payload.item]


      }


    case type.COMPANY_BLOCKED_OR_UNBLOCK_SUCCESS: {
      let approvedCompanies = [...state.ApprovedCompaniesArray]
      let currentIndex = approvedCompanies.findIndex((item) => item?.email === action?.payload?.item?.email)
      if (currentIndex !== -1)
        approvedCompanies[currentIndex] = action.payload.item
      return {
        ...state,
        ApprovedCompaniesArray: approvedCompanies

      }
    }





    case type.STUDENT_BLOCKED_OR_UNBLOCK_SUCCESS: {
      let approvedStudents = [...state.ApprovedStudentsArray]
      let currentIndex = approvedStudents.findIndex((item) => item?.email === action?.payload?.item?.email)
      if (currentIndex !== -1)
        approvedStudents[currentIndex] = action.payload.item
      return {
        ...state,
        ApprovedStudentsArray: approvedStudents

      }


    }
    case type.USER_BLOCK_AND_UNBLOCK:
      return {
        ...state,
        approved: action.payload.approved,
        blocked: action.payload.blocked
      }
    default:
      return state;
  }
};
export default userReducer;
