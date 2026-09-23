import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Problems from "./pages/Problems";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/problems" element={<Problems />} />

                <Route path="/leaderboard" element={<Leaderboard />} />

                <Route path="/profile" element={<Profile />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;