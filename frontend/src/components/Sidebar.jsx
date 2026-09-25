import { NavLink } from "react-router-dom";

function Sidebar() {

    const getSidebarClass = ({ isActive }) => {
        return isActive ? "sidebar-link active" : "sidebar-link";
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>CodePulse</h2>
                <p>Track. Improve. Grow.</p>
            </div>

            <div className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    className={getSidebarClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/problems"
                    className={getSidebarClass}
                >
                    Problems
                </NavLink>

                <NavLink
                    to="/leaderboard"
                    className={getSidebarClass}
                >
                    Leaderboard
                </NavLink>

                <NavLink
                    to="/profile"
                    className={getSidebarClass}
                >
                    Profile
                </NavLink>

            </div>

        </aside>
    );
}

export default Sidebar;