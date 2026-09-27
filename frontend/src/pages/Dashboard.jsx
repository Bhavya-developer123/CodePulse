function Dashboard() {

    const stats = [
        {
            title: "Total Solved",
            value: 125,
            description: "Problems completed",
            icon: "✓"
        },
        {
            title: "Easy",
            value: 65,
            description: "Easy problems",
            icon: "E"
        },
        {
            title: "Medium",
            value: 45,
            description: "Medium problems",
            icon: "M"
        },
        {
            title: "Hard",
            value: 15,
            description: "Hard problems",
            icon: "H"
        },
        {
            title: "Total XP",
            value: 1850,
            description: "Experience points",
            icon: "XP"
        },
        {
            title: "Current Streak",
            value: 7,
            description: "Days in a row",
            icon: "🔥"
        }
    ];

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Track your coding progress and performance.
                    </p>
                </div>
            </div>

            <div className="stats-grid">

                {stats.map((stat) => (
                    <div
                        className="stat-card"
                        key={stat.title}
                    >

                        <div className="stat-card-top">

                            <div className="stat-icon">
                                {stat.icon}
                            </div>

                            <p className="stat-title">
                                {stat.title}
                            </p>

                        </div>

                        <h2 className="stat-value">
                            {stat.value}
                        </h2>

                        <p className="stat-description">
                            {stat.description}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Dashboard;