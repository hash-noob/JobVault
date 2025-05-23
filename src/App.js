// Add this import at the top of your file
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from "./components/Registeration/Register.js";
import AdminRegister from "./components/Registeration/AdminRegister.js";
import AdminLogin from "./components/Login/AdminLogin.js";
import StudentLogin from "./components/Login/StudentLogin.js";
import LandingPage from "./components/Login/LandingPage.js";

import Home from "./components/Home/Home.js";
import ForgetPassword from "./components/ForgotPassword/ForgetPassword.js";
import AddCompanies from "./components/Admin/Company-CRUD/AddCompanies.js";
import Companycrud from "./components/Admin/Company-CRUD/Companycrud.js";
import UpdateCompany from "./components/Admin/Company-CRUD/UpdateCompany.js";
import ResetPassword from "./components/ForgotPassword/ResetPassword.js";
import AdminDashboard from "./components/Admin/AdminReports/AdminDashboard.js";
import Admin from "./components/Admin/Admin.js";
import CompanyPage from "./components/Home/CompanyPages/CompanyPage.js";
import ScheduledInterview from "./components/Home/CompanyPages/ScheduledInterview.js";
import ScheduledInterviewData from "./components/Admin/AdminReports/ScheduledInterviewData.js";
import CompanyListing from "./components/Home/CompanyPages/CompanyListing.js";
import Faqspage from "./components/Home/FAQs/FaqPage.js";
import InterviewExperience from "./components/Home/InterviewExperiencePage/InterviewExperience.js";
import AddExperience from "./components/Home/InterviewExperiencePage/AddExperience.js";
import StudentProfile from './components/Home/HomeComponents/StudentProfile.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/companylisting" element={<CompanyListing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/add-companies" element={<AddCompanies />} />
        <Route path="/companies" element={<Companycrud />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/updatecompany/:id" element={<UpdateCompany />} />
        <Route path="/companypage/:id" element={<CompanyPage />} />
        <Route path="/scheduledInterview" element={<ScheduledInterview />} />
        <Route
          path="/scheduledInterviewdata"
          element={<ScheduledInterviewData />}
        />
        <Route path="/interviewexperience" element={<InterviewExperience />} />
        <Route path="/addexperience" element={<AddExperience />} />
        <Route path="/faq" element={<Faqspage />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
