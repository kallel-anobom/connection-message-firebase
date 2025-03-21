import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthGuard from "./guard/AuthGuard";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Connections from "./pages/Connections";
import Contacts from "./pages/Contacts";
import ConnectionContacts from "./pages/ConnectionContacts";
import MessageManagement from "./pages/MessageManagement";
import Broadcast from "./pages/Broadcast";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route path="/connections" element={<Connections />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/contacts/:connectionId"
            element={<ConnectionContacts />}
          />
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/messages" element={<MessageManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
