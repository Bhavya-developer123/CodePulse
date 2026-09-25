import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>CodePulse</h2>

            <div>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {" | "}
                <NavLink to="/problems">Problems</NavLink>
                {" | "}
                <NavLink to="/leaderboard">Leaderboard</NavLink>
                {" | "}
                <NavLink to="/profile">Profile</NavLink>
                {" | "}
                <NavLink to="/login">Login</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;