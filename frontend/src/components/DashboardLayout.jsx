import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout() {

    return (
        <>
            <Navbar />

            <div className="dashboard-layout">

                <Sidebar />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>
        </>
    );
}

export default DashboardLayout;