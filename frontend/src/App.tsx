import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./utils/AuthContext";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected section */}
        {/* You go to /dashboard.

React Router renders <ProtectedRoute> first.

Inside <ProtectedRoute>, <Outlet /> renders <Dashboard /> because that’s the matched child route.

If you go to /settings, <Outlet /> will render <Settings />. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Example role-based */}
        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
