import WeeklyChart from "../components/WeeklyCharts";
function Dashboard() {

    const stats = [
        {
            title: "Problems Solved",
            value: 125,
            subtitle: "+12 this week",
            icon: "✓",
            type: "purple"
        },
        {
            title: "Easy",
            value: 65,
            subtitle: "52% of solved",
            icon: "E",
            type: "green"
        },
        {
            title: "Medium",
            value: 45,
            subtitle: "36% of solved",
            icon: "M",
            type: "orange"
        },
        {
            title: "Hard",
            value: 15,
            subtitle: "12% of solved",
            icon: "H",
            type: "red"
        }
    ];

    return (
        <div className="dashboard-page">

            {/* HERO SECTION */}

            <section className="dashboard-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        <span className="pulse-dot"></span>
                        CODING JOURNEY
                    </div>

                    <h1>
                        Keep pushing,
                        <span> Bhavya! 🚀</span>
                    </h1>

                    <p>
                        You're building momentum. Keep solving,
                        keep learning, and keep growing.
                    </p>

                    <div className="hero-progress">

                        <div className="progress-info">
                            <span>Weekly Goal</span>
                            <strong>12 / 20 problems</strong>
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: "60%" }}
                            ></div>
                        </div>

                        <small>
                            8 more problems to complete your goal
                        </small>

                    </div>

                </div>

                <div className="hero-graphic">

                    <div className="orbit orbit-one"></div>
                    <div className="orbit orbit-two"></div>

                    <div className="code-symbol">
                        {"</>"}
                    </div>

                    <div className="floating-card card-one">
                        ⚡ +40 XP
                    </div>

                    <div className="floating-card card-two">
                        🔥 7 day streak
                    </div>

                </div>

            </section>


            {/* STATISTICS */}

            <section className="dashboard-section">

                <div className="section-heading">
                    <div>
                        <h2>Your Progress</h2>
                        <p>Your coding performance at a glance.</p>
                    </div>
                </div>

                <div className="stats-grid">

                    {stats.map((stat) => (

                        <div
                            className={`stat-card ${stat.type}`}
                            key={stat.title}
                        >

                            <div className="stat-card-top">

                                <div className="stat-icon">
                                    {stat.icon}
                                </div>

                                <span className="stat-title">
                                    {stat.title}
                                </span>

                            </div>

                            <div className="stat-value">
                                {stat.value}
                            </div>

                            <div className="stat-subtitle">
                                {stat.subtitle}
                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* BOTTOM ANALYTICS */}

            <section className="analytics-grid">

                {/* XP CARD */}

                <div className="analytics-card xp-card">

                    <div className="analytics-header">
                        <div>
                            <h3>⚡ XP Progress</h3>
                            <p>Level 8 Developer</p>
                        </div>

                        <span className="level-badge">
                            LVL 8
                        </span>
                    </div>

                    <div className="xp-number">
                        1,850 XP
                    </div>

                    <div className="xp-track">
                        <div
                            className="xp-fill"
                            style={{ width: "74%" }}
                        ></div>
                    </div>

                    <div className="xp-footer">
                        <span>1,850</span>
                        <span>2,500 XP</span>
                    </div>

                </div>


                {/* STREAK CARD */}

                <div className="analytics-card streak-card">

                    <div className="analytics-header">
                        <div>
                            <h3>🔥 Coding Streak</h3>
                            <p>Consistency is power</p>
                        </div>

                        <div className="streak-number">
                            7
                        </div>
                    </div>

                    <div className="streak-days">

                        <div className="streak-day completed">
                            <span>M</span>
                            ✓
                        </div>

                        <div className="streak-day completed">
                            <span>T</span>
                            ✓
                        </div>

                        <div className="streak-day completed">
                            <span>W</span>
                            ✓
                        </div>

                        <div className="streak-day completed">
                            <span>T</span>
                            ✓
                        </div>

                        <div className="streak-day completed">
                            <span>F</span>
                            ✓
                        </div>

                        <div className="streak-day completed">
                            <span>S</span>
                            ✓
                        </div>

                        <div className="streak-day today">
                            <span>S</span>
                            🔥
                        </div>

                    </div>

                    <p className="streak-message">
                        Amazing! Don't break your streak today.
                    </p>

                </div>

            </section>
            <section className="dashboard-charts">

    <WeeklyChart />

</section>

        </div>
    );
}

export default Dashboard;