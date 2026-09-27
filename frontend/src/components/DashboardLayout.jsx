import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Make sure this path matches your folder structure (e.g., "./Navbar" or "./components/Navbar")
import Sidebar from "./sidebar";

export default function DashboardLayout() {
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