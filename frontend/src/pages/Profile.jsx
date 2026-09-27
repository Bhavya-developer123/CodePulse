function Profile() {

    const user = {
        name: "Bhavya",
        email: "bhavya@example.com",
        college: "SRKR Engineering College",
        role: "Computer Science Student",
        xp: 1950,
        solved: 98,
        currentStreak: 12,
        longestStreak: 28,
        easy: 42,
        medium: 41,
        hard: 15
    };

    return (
        <div className="profile-page">

            {/* Profile Header */}

            <section className="profile-header">

                <div className="profile-main">

                    <div className="profile-avatar">
                        {user.name.charAt(0)}
                    </div>

                    <div>

                        <span className="profile-badge">
                            CODEPULSE MEMBER
                        </span>

                        <h1>
                            {user.name}
                        </h1>

                        <p>
                            {user.role}
                        </p>

                    </div>

                </div>

                <button className="edit-profile-button">
                    ✏️ Edit Profile
                </button>

            </section>


            {/* Profile Information */}

            <section className="profile-info-card">

                <div className="profile-section-title">

                    <div>
                        <h2>Personal Information</h2>

                        <p>
                            Your CodePulse account information.
                        </p>
                    </div>

                </div>


                <div className="profile-info-grid">

                    <div className="profile-info-item">

                        <span>
                            Full Name
                        </span>

                        <strong>
                            {user.name}
                        </strong>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            {user.email}
                        </strong>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            College
                        </span>

                        <strong>
                            {user.college}
                        </strong>

                    </div>


                    <div className="profile-info-item">

                        <span>
                            Role
                        </span>

                        <strong>
                            {user.role}
                        </strong>

                    </div>

                </div>

            </section>


            {/* Statistics */}

            <section className="profile-stats">

                <div className="profile-stat-card">

                    <span className="stat-icon">
                        ⚡
                    </span>

                    <div>
                        <span>
                            Total XP
                        </span>

                        <strong>
                            {user.xp}
                        </strong>
                    </div>

                </div>


                <div className="profile-stat-card">

                    <span className="stat-icon">
                        💻
                    </span>

                    <div>
                        <span>
                            Problems Solved
                        </span>

                        <strong>
                            {user.solved}
                        </strong>
                    </div>

                </div>


                <div className="profile-stat-card">

                    <span className="stat-icon">
                        🔥
                    </span>

                    <div>
                        <span>
                            Current Streak
                        </span>

                        <strong>
                            {user.currentStreak} days
                        </strong>
                    </div>

                </div>


                <div className="profile-stat-card">

                    <span className="stat-icon">
                        🏆
                    </span>

                    <div>
                        <span>
                            Longest Streak
                        </span>

                        <strong>
                            {user.longestStreak} days
                        </strong>
                    </div>

                </div>

            </section>


            {/* Problem Distribution */}

            <section className="profile-progress-card">

                <div className="profile-section-title">

                    <div>

                        <h2>
                            Problem Distribution
                        </h2>

                        <p>
                            Your solved problems by difficulty.
                        </p>

                    </div>

                </div>


                <div className="difficulty-progress">

                    <div className="difficulty-row">

                        <div className="difficulty-label">
                            <span>Easy</span>
                            <strong>{user.easy}</strong>
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill easy-progress"
                                style={{
                                    width: `${(user.easy / user.solved) * 100}%`
                                }}
                            ></div>
                        </div>

                    </div>


                    <div className="difficulty-row">

                        <div className="difficulty-label">
                            <span>Medium</span>
                            <strong>{user.medium}</strong>
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill medium-progress"
                                style={{
                                    width: `${(user.medium / user.solved) * 100}%`
                                }}
                            ></div>
                        </div>

                    </div>


                    <div className="difficulty-row">

                        <div className="difficulty-label">
                            <span>Hard</span>
                            <strong>{user.hard}</strong>
                        </div>

                        <div className="progress-track">
                            <div
                                className="progress-fill hard-progress"
                                style={{
                                    width: `${(user.hard / user.solved) * 100}%`
                                }}
                            ></div>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Profile;