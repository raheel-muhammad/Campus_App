import * as type from "./actionType";

export const registerStart = () => ({
  type: type.REGISTER_START
});
export const registerSuccess = Data => ({
  type: type.REGISTER_SUCCESS,
  payload: {
    uid: Data.uid,
    role: Data.role,
    email: Data.email,
    userName: Data.userName
  }
});
export const registerFail = () => ({
  type: type.REGISTER_FAIL
});

export const loginStart = () => ({
  type: type.LOGIN_START
});


export const loginSuccess = Data => ({
  type: type.LOGIN_SUCCESS,
  payload: {
    email: Data.email,
    uid: Data.uid,
    role: Data.role,
    userName: Data.userName,
    fullname: Data.fullname,
    fathername: Data.fathername,
    cnic: Data.cnic,
    address: Data.address,
    contact: Data.contact,
    qualification: Data.qualification,
    ImgUrl: Data.ImgUrl,
    website: Data.website,
    service: Data.service,
    category: Data.category,
    approved: Data.approved,
    blocked: Data.blocked
  }
});
export const GetAllJobs = Data => ({
  type: type.GET_ALL_JOB,
  payload: Data
})
export const loginFail = () => ({
  type: type.LOGIN_FAIL
});

export const logoutStart = () => ({
  type: type.LOGOUT_START
});
export const passwordResetInitiaite = () => ({
  type: type.PASSWORD_RESET_INITIATE
});
export const passwordResetSuccess = () => ({
  type: type.PASSWORD_RESET_SUCCESS
});
export const passordResetFail = () => ({
  type: type.PASSWORD_RESET_FAIL
});
export const logoutSuccess = () => ({
  type: type.LOGOUT_SUCCESS
});
export const logoutFail = error => ({
  type: type.LOGOUT_FAIL,
  payload: error
});



export const ProfileUpdateInit = () => ({
  type: type.PROFILE_UPDATE_INIT
});
export const ProfileUpdateSuccess = Data => ({
  type: type.PROFILE_UPDATE_SUCCESS,
  payload: {
    fullname: Data.fullname,
    fathername: Data.fathername,
    cnic: Data.cnic,
    address: Data.address,
    contact: Data.contact,
    qualification: Data.qualification,
    website: Data.website,
    service: Data.service,
    category: Data.category
  }
});
export const ProfileUpdateFail = Data => ({
  type: type.PROFILE_UPDATE_Fail
});
export const ProfilePictureUploadSuccess = Data => ({
  type: type.PROFILE_PICTURE_UPLOAD_SUCCESS,
  payload: Data
});

export const JobPostInit = () => ({
  type: type.JOB_POST_INIT
})


export const JobPostSuccess = (Data) => ({
  type: type.JOB_POST_SUCCESS,
  payload: {
    Category: Data.Category,
    JobDesignation: Data.JobDesignation,
    Location: Data.Location,
    RequiredQualification: Data.RequiredQualification,
    VacantPosition: Data.VacantPosition,
    jobID: Data.jobID,
    category: Data.category

  }
})

export const JobPostFail = () => ({
  type: type.JOB_POST_FAIL
})




export const JobUpdateInit = () => ({
  type: type.JOB_UPDATE_INIT
})

export const JobUpdateSuccess = (Data) => ({
  type: type.JOB_UPDATE_SUCCESS,
  payload: {
    Category: Data.Category,
    JobDesignation: Data.JobDesignation,
    Location: Data.Location,
    RequiredQualification: Data.RequiredQualification,
    VacantPosition: Data.VacantPosition,
    jobID: Data.jobID,
    index: Data.index,
    JobDescription: Data.JobDescription,
    ApplicantsIDs: Data.ApplicantsIDs
  }
})
export const JobUpdateFail = () => ({
  type: type.JOB_UPDATE_FAIL
})


export const JobDeleteInit = () => ({
  type: type.JOB_DELETE_INIT
})


export const JobDeleteSuccess = (Data) => ({
  type: type.JOB_DELETE_SUCCESS,
  payload: Data
})


export const GetAppliedStudents = (Data) => ({
  type: type.GET_APPLIED_STUDENTS,
  payload: Data
})



export const RemoveAppliedStudent = () => ({
  type: type.REMOVE_APPLIED_STUDENT
})


export const ApplyJobSuccess = (Data) => ({
  type: type.APPLY_JOB_SUCCESS,
  payload: Data
})


export const AppliedJobsGetSuccess = (Data) => ({
  type: type.APPLIED_JOBS_GET_SUCCESS,
  payload: Data
})


export const StudentsArrays = (Data) => ({
  type: type.STUDENTS_ARRAYS,
  payload: {
    ApprovedStudentsArray: Data.ApprovedStudentsArray,
    NewApprovalStudentsArray: Data.NewApprovalStudentsArray

  }
})

export const CompaniesArrays = (Data) => ({
  type: type.COMPANIES_ARRAYS,
  payload: {
    ApprovedCompaniesArray: Data.ApprovedCompaniesArray,
    NewApprovalCompaniesArray: Data.NewApprovalCompaniesArray,

  }
})



export const ApprovalSuccessStudents = (Data) => ({
  type: type.APPROVAL_SUCCESS_STUDENTS,
  payload: {
    index: Data.index,
    item: Data.data
  }
})

export const ApprovalSuccessCompanies = (Data) => ({
  type: type.APPROVAL_SUCCESS_COMPANIES,
  payload: {
    index: Data.index,
    item: Data.data
  }
})


export const CompanyBlockedOrUnNlockSuccess = (Data) => ({
  type: type.COMPANY_BLOCKED_OR_UNBLOCK_SUCCESS,
  payload: {
    // index: Data.index,
    item: Data.data
  }
})


export const StudentBlockedOrUnNlockSuccess = (Data) => ({
  type: type.STUDENT_BLOCKED_OR_UNBLOCK_SUCCESS,
  payload: {
    // index: Data.index,
    item: Data.data
  }
})


export const UserBlockAndUnblock = (Data) => ({
  type: type.USER_BLOCK_AND_UNBLOCK,
  payload: {
    approved: Data.approved,
    blocked: Data.blocked
  }
})