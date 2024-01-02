import React from 'react'
// import AdminLoginPage from "../pages/AdminLoginPage";
import AdminPage from "../pages/AdminPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import StudentHomePage from "../pages/StudentHomePage";
import CompanyHomePage from "../pages/CompanyHomePage";
import CompanyProfilePage from "../pages/CompanyProfilePage";
import StudentProfilePage from "../pages/StudentProfilePage";
import ForgotPassword from "../pages/ForgotPassword";
import PostNewJobPage from "../pages/PostNewJobPage";
import { useSelector } from 'react-redux';
import AppliedJobs from '../pages/AppliedJobs';
// import RelatedJobs from '../pages/RelatedJobs';

const Routing = () => {
    const UserDetails = useSelector((state) => state.user)
    return (<>
        {!UserDetails.loginStatus ?
            <Routes>

                <Route exact path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                {/* <Route path="/admin" element={<AdminPage />}></Route> */}
                <Route path="*" element={<Navigate replace to="/" />} />

            </Routes>
            :
            UserDetails.loginStatus && UserDetails.role === 'admin' ?
                <Routes>
                    <Route path="/admin" element={<AdminPage />}></Route>
                    <Route path="*" element={<Navigate replace to="/admin" />} />
                </Routes> :
                UserDetails.loginStatus && UserDetails.role === 'student' ? <Routes>
                    <Route path="/student" element={<StudentHomePage />} />
                    <Route path="/studentprofile" element={<StudentProfilePage />} />
                    <Route path="/appliedjobs" element={<AppliedJobs />} />
                    {/* <Route path="/relatedjobs" element={<RelatedJobs />} /> */}
                    <Route path="*" element={<Navigate replace to="/student" />} />
                </Routes>
                    :
                    <Routes>
                        <Route path="/company" element={<CompanyHomePage />} />
                        <Route path="/companyprofile" element={<CompanyProfilePage />} />
                        <Route path="/postnewjobs" element={<PostNewJobPage />}></Route>
                        <Route path="*" element={<Navigate replace to="/company" />} />
                    </Routes>

        }
    </>
    )
}

export default Routing