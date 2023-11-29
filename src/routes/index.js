import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./config";

//----------------Pages-------------------------//
import Login from "../views/Auth/login";
import Register from "../views/Auth/register";
import Dashboard from "../views/Admin/dashboard";
import NewRecord from "../views/Admin/new_record";
import Admins from "../views/Admin/admins";
import Uploaded from "../views/Admin/uploads";
import ManageRecords from "../views/Admin/manage";
import Draft from "../views/Admin/draft";
import EditRecord from "../views/Admin/editRecord";
import Profile from "../views/Admin/profile";
import Trash from "../views/Admin/trash";

const AllRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard/new"
        element={
          <PrivateRoute>
            <NewRecord />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/trash"
        element={
          <PrivateRoute>
            <Trash />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/profile/:id"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/edit/:id"
        element={
          <PrivateRoute>
            <EditRecord />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/draft"
        element={
          <PrivateRoute>
            <Draft />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/manage"
        element={
          <PrivateRoute>
            <ManageRecords />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/uploads"
        element={
          <PrivateRoute>
            <Uploaded />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard/admins"
        element={
          <PrivateRoute>
            <Admins />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        exact
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AllRoutes;
