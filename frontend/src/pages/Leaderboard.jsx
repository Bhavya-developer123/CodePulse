function Leaderboard() {

    const leaderboard = [
        {
            rank: 1,
            username: "Rahul",
            xp: 2450,
            solved: 125
        },
        {
            rank: 2,
            username: "Ananya",
            xp: 2280,
            solved: 118
        },
        {
            rank: 3,
            username: "Kiran",
            xp: 2100,
            solved: 109
        },
        {
            rank: 4,
            username: "Bhavya",
            xp: 1950,
            solved: 98
        },
        {
            rank: 5,
            username: "Priya",
            xp: 1820,
            solved: 92
        },
        {
            rank: 6,
            username: "Arjun",
            xp: 1740,
            solved: 87
        },
        {
            rank: 7,
            username: "Sneha",
            xp: 1650,
            solved: 81
        },
        {
            rank: 8,
            username: "Vijay",
            xp: 1530,
            solved: 76
        }
    ];

    return (
        <div className="leaderboard-page">

            {/* Header */}

            <section className="leaderboard-header">

                <div>
                    <span className="leaderboard-badge">
                        CODEPULSE RANKINGS
                    </span>

                    <h1>Leaderboard</h1>

                    <p>
                        See how you compare with other CodePulse users.
                    </p>
                </div>

                <div className="leaderboard-trophy">
                    🏆
                </div>

            </section>


            {/* Top 3 */}

           <section className="top-three">

    {leaderboard.slice(0, 3).map((user) => (

        <div
            className={`top-user rank-${user.rank}`}
            key={user.rank}
        >

            <div className="top-rank">
                {user.rank === 1 && "🥇"}
                {user.rank === 2 && "🥈"}
                {user.rank === 3 && "🥉"}
            </div>

            <div className="top-avatar">
                {user.username.charAt(0)}
            </div>

            <h2>{user.username}</h2>

            <span className="top-position">
                Rank #{user.rank}
            </span>

            <p>
                {user.solved} Problems Solved
            </p>

            <div className="top-xp">
                <span>⚡</span>
                {user.xp} XP
            </div>

        </div>

    ))}

</section>


            {/* Leaderboard Table */}

            <section className="leaderboard-card">
                <div className="leaderboard-summary">

    <div className="summary-item">
        <span>Total Users</span>
        <strong>{leaderboard.length}</strong>
    </div>

    <div className="summary-item">
        <span>Your Rank</span>
        <strong>#4</strong>
    </div>

    <div className="summary-item">
        <span>Your XP</span>
        <strong>1950</strong>
    </div>

    <div className="summary-item">
        <span>Problems Solved</span>
        <strong>98</strong>
    </div>

</div>

                <div className="leaderboard-table-header">

                    <div>
                        <h2>Global Rankings</h2>

                        <p>
                            Track XP and problems solved by users.
                        </p>
                    </div>

                </div>


                <div className="leaderboard-table-wrapper">

                    <table className="leaderboard-table">

                        <thead>

                            <tr>
                                <th>Rank</th>
                                <th>User</th>
                                <th>XP</th>
                                <th>Problems Solved</th>
                            </tr>

                        </thead>

                        <tbody>

                            {leaderboard.map((user) => (

    <tr
        key={user.rank}
        className={
            user.username === "Bhavya"
                ? "current-user-row"
                : ""
        }
    >

                                    <td>

                                        <span
                                            className={
                                                user.rank <= 3
                                                    ? `rank-badge rank-${user.rank}`
                                                    : "rank-badge"
                                            }
                                        >
                                            #{user.rank}
                                        </span>

                                    </td>

                                    <td>

                                        <div className="leaderboard-user">

                                            <div className="user-avatar">
                                                {user.username.charAt(0)}
                                            </div>

                                            <span>
    {user.username}

    {user.username === "Bhavya" && (
        <span className="you-badge">
            You
        </span>
    )}
</span>

                                        </div>

                                    </td>

                                    <td>

                                        <span className="xp-value">
                                            ⚡ {user.xp}
                                        </span>

                                    </td>

                                    <td>

                                        <span className="solved-value">
                                            {user.solved}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>

        </div>
    );
}

export default Leaderboard;