import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <>
                            <Navbar />
                            <Dashboard />
                        </>
                    }
                />

                <Route
                    path="/problems"
                    element={
                        <>
                            <Navbar />
                            <Problems />
                        </>
                    }
                />

                <Route
                    path="/leaderboard"
                    element={
                        <>
                            <Navbar />
                            <Leaderboard />
                        </>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <>
                            <Navbar />
                            <Profile />
                        </>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;