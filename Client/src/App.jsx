import { Navigate, Route, Routes } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword_success from "../pages/ResetPassword_success";
import LoginSuccess from "../pages/LoginSuccess";
import ResetPasswordForm from "../pages/ResetPasswordForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password/success"
          element={<ResetPassword_success />}
        />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/login-success" element={<LoginSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
