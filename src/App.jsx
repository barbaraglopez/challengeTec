import React from "react";
import { Routes, Route} from "react-router-dom";
import { Login } from "./Pages/Login/Login.jsx";
import { Users } from "./Pages/Users/Users.jsx";
import { ProtectedRoute } from "./Components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="users"
          element={
            <ProtectedRoute >
              <Users/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
