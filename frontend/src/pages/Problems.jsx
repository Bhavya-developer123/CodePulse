import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/apiClient";
import getApiErrorMessage from "../utils/apiError";

import "./Problems.css";

function Problems() {

    const navigate = useNavigate();

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        fetchProblems();

    }, []);

    const fetchProblems = async () => {

        try {

            setLoading(true);
            setErrorMessage("");

            const response = await apiClient.get("/api/v1/problems");

            console.log("Problems API response:");
            console.log(response.data);

            setProblems(response.data);

        } catch (error) {

            console.error("Failed to fetch problems:");
            console.error(error);

            setErrorMessage(getApiErrorMessage(error));

        } finally {

            setLoading(false);

        }
    };


    const getDifficultyClass = (difficulty) => {

        if (!difficulty) {
            return "";
        }

        return difficulty.toLowerCase();

    };


    return (
        <div className="problems-page">

            {/* Page Header */}

            <div className="problems-page-header">

                <div>

                    <span className="page-label">
                        CODEPULSE
                    </span>

                    <h1>Problems</h1>

                    <p>
                        Track your coding journey and keep improving every day.
                    </p>

                </div>


                <button
                    className="add-problem-button"
                    onClick={() => navigate("/add-problem")}
                >
                    <span className="add-icon">+</span>
                    Add Problem
                </button>

            </div>


            {/* Statistics */}

            <div className="problems-stats">

                <div className="problem-stat-card">

                    <div className="problem-stat-icon total-icon">
                        #
                    </div>

                    <div>
                        <span>Total Solved</span>
                        <strong>{problems.length}</strong>
                    </div>

                </div>


                <div className="problem-stat-card">

                    <div className="problem-stat-icon easy-icon">
                        E
                    </div>

                    <div>
                        <span>Easy</span>

                        <strong>
                            {
                                problems.filter(
                                    (problem) =>
                                        problem.difficulty?.toLowerCase() === "easy"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="problem-stat-card">

                    <div className="problem-stat-icon medium-icon">
                        M
                    </div>

                    <div>
                        <span>Medium</span>

                        <strong>
                            {
                                problems.filter(
                                    (problem) =>
                                        problem.difficulty?.toLowerCase() === "medium"
                                ).length
                            }
                        </strong>

                    </div>

                </div>


                <div className="problem-stat-card">

                    <div className="problem-stat-icon hard-icon">
                        H
                    </div>

                    <div>
                        <span>Hard</span>

                        <strong>
                            {
                                problems.filter(
                                    (problem) =>
                                        problem.difficulty?.toLowerCase() === "hard"
                                ).length
                            }
                        </strong>

                    </div>

                </div>

            </div>


            {/* Main Content */}

            <div className="problems-card">

                <div className="problems-card-header">

                    <div>
                        <h2>Solved Problems</h2>

                        <p>
                            Your recently recorded coding problems
                        </p>
                    </div>

                    <button
                        className="refresh-button"
                        onClick={fetchProblems}
                    >
                        ↻ Refresh
                    </button>

                </div>


                {/* Error */}

                {errorMessage && (

                    <div className="problems-error">

                        <strong>Unable to load problems</strong>

                        <span>
                            {errorMessage}
                        </span>

                        <button onClick={fetchProblems}>
                            Try Again
                        </button>

                    </div>

                )}


                {/* Loading */}

                {loading && (

                    <div className="problems-loading">

                        <div className="loading-spinner"></div>

                        <p>Loading your problems...</p>

                    </div>

                )}


                {/* Empty */}

                {!loading && !errorMessage && problems.length === 0 && (

                    <div className="empty-problems">

                        <div className="empty-icon">
                            +
                        </div>

                        <h3>No problems yet</h3>

                        <p>
                            Start tracking your coding progress by adding
                            your first solved problem.
                        </p>

                        <button
                            className="empty-add-button"
                            onClick={() => navigate("/add-problem")}
                        >
                            Add Your First Problem
                        </button>

                    </div>

                )}


                {/* Table */}

                {!loading && !errorMessage && problems.length > 0 && (

                    <div className="problems-table-wrapper">

                        <table className="problems-table">

                            <thead>

                                <tr>

                                    <th>Problem</th>

                                    <th>Difficulty</th>

                                    <th>Topic</th>

                                    <th>Platform</th>

                                    <th>Solved Date</th>

                                </tr>

                            </thead>


                            <tbody>

                                {problems.map((problem) => (

                                    <tr key={problem.id}>

                                        <td>

                                            <div className="problem-title-cell">

                                                <div className="problem-number">
                                                    #{problem.id}
                                                </div>

                                                <div>

                                                    <strong>
                                                        {problem.title}
                                                    </strong>

                                                    <span>
                                                        {problem.username}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        <td>

                                            <span
                                                className={`difficulty-badge ${getDifficultyClass(
                                                    problem.difficulty
                                                )}`}
                                            >
                                                {problem.difficulty}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="topic-badge">
                                                {problem.topic || "—"}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="platform-badge">
                                                {problem.platform || "—"}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="solved-date">
                                                {problem.solvedDate || "—"}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Problems;