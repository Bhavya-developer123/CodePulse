function WeeklyGraph() {

    const weeklyData = [
        { day: "Mon", solved: 3 },
        { day: "Tue", solved: 5 },
        { day: "Wed", solved: 2 },
        { day: "Thu", solved: 6 },
        { day: "Fri", solved: 4 },
        { day: "Sat", solved: 7 },
        { day: "Sun", solved: 3 }
    ];

    const totalSolved = weeklyData.reduce(
        (total, item) => total + item.solved,
        0
    );

    const highestDay = weeklyData.reduce(
        (highest, item) =>
            item.solved > highest.solved ? item : highest,
        weeklyData[0]
    );

    return (
        <div className="weekly-page">

            {/* Header */}

            <section className="weekly-header">

                <div>
                    <span className="weekly-badge">
                        WEEKLY PROGRESS
                    </span>

                    <h1>Weekly Progress</h1>

                    <p>
                        Track your coding activity throughout the week.
                    </p>
                </div>

                <div className="weekly-icon">
                    📈
                </div>

            </section>


            {/* Summary Cards */}

            <section className="weekly-summary">

                <div className="weekly-summary-card">

                    <span>
                        Problems This Week
                    </span>

                    <strong>
                        {totalSolved}
                    </strong>

                </div>


                <div className="weekly-summary-card">

                    <span>
                        Most Productive Day
                    </span>

                    <strong>
                        {highestDay.day}
                    </strong>

                </div>


                <div className="weekly-summary-card">

                    <span>
                        Best Day Problems
                    </span>

                    <strong>
                        {highestDay.solved}
                    </strong>

                </div>

            </section>


            {/* Graph */}

            <section className="weekly-chart-card">

                <div className="weekly-chart-header">

                    <div>
                        <h2>
                            Problems Solved
                        </h2>

                        <p>
                            Your coding activity for the last 7 days.
                        </p>
                    </div>

                </div>


                <div className="weekly-chart">

                    {weeklyData.map((item) => (

                        <div
                            className="chart-column"
                            key={item.day}
                        >

                            <div className="chart-value">
                                {item.solved}
                            </div>

                            <div
                                className="chart-bar"
                                style={{
                                    height: `${item.solved * 35}px`
                                }}
                            ></div>

                            <span className="chart-day">
                                {item.day}
                            </span>

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default WeeklyGraph;