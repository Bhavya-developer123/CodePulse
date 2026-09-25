import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    const getNavLinkClass = ({ isActive }) => {

        return isActive
            ? "nav-link active"
            : "nav-link";
    };

    return (
        <nav className="navbar">

            {/* Logo */}

            <div
                className="navbar-logo"
                onClick={() => navigate("/dashboard")}
            >
                CodePulse
            </div>


            {/* Navigation */}

            <div className="navbar-links">

                <NavLink
                    to="/dashboard"
                    className={getNavLinkClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/problems"
                    className={getNavLinkClass}
                >
                    Problems
                </NavLink>

                <NavLink
                    to="/leaderboard"
                    className={getNavLinkClass}
                >
                    Leaderboard
                </NavLink>

                <NavLink
                    to="/profile"
                    className={getNavLinkClass}
                >
                    Profile
                </NavLink>

            </div>


            {/* Logout */}

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>
    );
}

export default Navbar;