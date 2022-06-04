import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import ProfilePage from "./pages/ProfilePage";
import RequestResetPassword from "./pages/RequestResetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={ <Dashboard /> }/>
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/register" element={ <RegisterPage /> } />
            <Route path="/verify/:id/:verificationCode" element={ <VerifyPage /> } />
            <Route path="/profile" element={ <ProfilePage /> } />
            <Route path="/requestResetPassword" element={ <RequestResetPassword /> } />
            <Route path="/resetPassword/:id/:resetPasswordCode" element={ <ResetPassword /> } />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
