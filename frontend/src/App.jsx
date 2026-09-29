import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProblem from "./pages/AddProblem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import WeeklyGraph from "./pages/WeeklyGraph";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes wrapped with DashboardLayout and ProtectedRoute */}
               <Route element={<ProtectedRoute />}>

    <Route element={<DashboardLayout />}>

        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/problems"
            element={<Problems />}
        />

        <Route
            path="/weekly"
            element={<WeeklyGraph />}
        />

        <Route
            path="/leaderboard"
            element={<Leaderboard />}
        />

        <Route
            path="/profile"
            element={<Profile />}
        />

        <Route
            path="/add-problem"
            element={<AddProblem />}
        />

    </Route>

</Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;