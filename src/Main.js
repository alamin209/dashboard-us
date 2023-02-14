import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Helpers
import GuestRoute from "helpers/routes/GuestRoute";
import ProtectedRoute from "helpers/routes/ProtectedRoute";

// Components
import DocumentHead from "shared/DocumentHead";

// Layout
import Layout from "components/Layout";

// =============== Pages ===============
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Sheets from "pages/Sheets";

import Admins from "pages/Admins";
import AddAdmin from "pages/Admins/AddAdmin";
import UpdateAdmin from "pages/Admins/UpdateAdmin";

import Users from "pages/Users";
import AddUser from "pages/Users/AddUser";
import UpdateUser from "pages/Users/UpdateUser";

import SecurityQuestions from "pages/Security-Questions";
import AddQuestion from "pages/Security-Questions/AddQuestion";
import UpdateQuestion from "pages/Security-Questions/UpdateQuestion";

const Main = () => {
  return (
    <div className="Agoverse-Dashboard">
      <DocumentHead />

      <Router basename="/dashboard">
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="admins">
              <Route path="add" element={<AddAdmin />} />
              <Route path=":adminId/edit" element={<UpdateAdmin />} />
              <Route index element={<Admins />} />
            </Route>
            <Route path="users">
              <Route path="add" element={<AddUser />} />
              <Route path=":userId/edit" element={<UpdateUser />} />
              <Route index element={<Users />} />
            </Route>
            <Route path="questions">
              <Route path="add" element={<AddQuestion />} />
              <Route path=":questionId/edit" element={<UpdateQuestion />} />
              <Route index element={<SecurityQuestions />} />
            </Route>
            <Route path="sheets" element={<Sheets />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
