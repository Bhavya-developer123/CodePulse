import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function WeeklyChart() {

    const data = [
        {
            day: "Mon",
            problems: 2
        },
        {
            day: "Tue",
            problems: 4
        },
        {
            day: "Wed",
            problems: 3
        },
        {
            day: "Thu",
            problems: 5
        },
        {
            day: "Fri",
            problems: 2
        },
        {
            day: "Sat",
            problems: 6
        },
        {
            day: "Sun",
            problems: 4
        }
    ];

    const totalProblems = data.reduce(
        (total, item) => total + item.problems,
        0
    );

    return (
        <div className="chart-card">

            <div className="chart-header">

                <div>
                    <div className="chart-title-row">

                        <div className="chart-main-icon">
                            📈
                        </div>

                        <div>
                            <h3>Weekly Activity</h3>

                            <p>
                                Problems solved this week
                            </p>
                        </div>

                    </div>
                </div>

                <span className="chart-badge">
                    This Week
                </span>

            </div>


            <div className="chart-summary">

                <div>
                    <span>Total Solved</span>

                    <strong>
                        {totalProblems}
                    </strong>
                </div>

                <div>
                    <span>Daily Average</span>

                    <strong>
                        {(totalProblems / 7).toFixed(1)}
                    </strong>
                </div>

            </div>


            <div className="chart-container">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="weeklyGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor="#7c3aed"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#7c3aed"
                                    stopOpacity={0.02}
                                />

                            </linearGradient>

                        </defs>


                        <CartesianGrid
                            vertical={false}
                            stroke="#e5e7eb"
                            strokeDasharray="4 4"
                        />


                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}
                        />


                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}
                        />


                        <Tooltip
                            cursor={{
                                stroke: "#c4b5fd",
                                strokeWidth: 1
                            }}
                            contentStyle={{
                                border: "none",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 10px 30px rgba(15, 23, 42, 0.12)",
                                padding: "10px 14px"
                            }}
                            labelStyle={{
                                color: "#475569",
                                fontWeight: "700",
                                marginBottom: "4px"
                            }}
                            itemStyle={{
                                color: "#7c3aed",
                                fontWeight: "700"
                            }}
                        />


                        <Area
                            type="monotone"
                            dataKey="problems"
                            stroke="#7c3aed"
                            strokeWidth={3}
                            fill="url(#weeklyGradient)"
                            dot={{
                                r: 5,
                                fill: "#ffffff",
                                stroke: "#7c3aed",
                                strokeWidth: 3
                            }}
                            activeDot={{
                                r: 7,
                                fill: "#7c3aed",
                                stroke: "#ffffff",
                                strokeWidth: 3
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default WeeklyChart;