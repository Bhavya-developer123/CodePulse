import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
function Problems() {
    useEffect(() => {

    apiClient.get("/api/v1/problems")
        .then((response) => {

            console.log("Backend response:");
            console.log(response.data);

        })
        .catch((error) => {

            console.error("Backend request failed:");
            console.error(error);

        });

}, []);

    const [problems, setProblems] = useState([
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            topic: "Array",
            platform: "LeetCode",
            solvedDate: "Sep 23, 2026"
        },
        {
            id: 2,
            title: "Binary Search",
            difficulty: "Easy",
            topic: "Binary Search",
            platform: "LeetCode",
            solvedDate: "Sep 22, 2026"
        },
        {
            id: 3,
            title: "Number of Islands",
            difficulty: "Medium",
            topic: "Graph",
            platform: "LeetCode",
            solvedDate: "Sep 21, 2026"
        },
        {
            id: 4,
            title: "Coin Change",
            difficulty: "Medium",
            topic: "Dynamic Programming",
            platform: "LeetCode",
            solvedDate: "Sep 20, 2026"
        },
        {
            id: 5,
            title: "Merge Sort",
            difficulty: "Medium",
            topic: "Sorting",
            platform: "GeeksforGeeks",
            solvedDate: "Sep 19, 2026"
        },
        {
            id: 6,
            title: "Valid Parentheses",
            difficulty: "Easy",
            topic: "Stack",
            platform: "LeetCode",
            solvedDate: "Sep 18, 2026"
        },
        {
            id: 7,
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            topic: "Sliding Window",
            platform: "LeetCode",
            solvedDate: "Sep 17, 2026"
        },
        {
            id: 8,
            title: "Climbing Stairs",
            difficulty: "Easy",
            topic: "Dynamic Programming",
            platform: "LeetCode",
            solvedDate: "Sep 16, 2026"
        }
    ]);

    // =========================================
    // FILTER STATE
    // =========================================

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [topic, setTopic] = useState("All");
    const [platform, setPlatform] = useState("All");

    // =========================================
    // ADD PROBLEM STATE
    // =========================================

    const [showAddForm, setShowAddForm] = useState(false);

    const [newProblem, setNewProblem] = useState({
        title: "",
        difficulty: "Easy",
        topic: "",
        platform: "LeetCode",
        solvedDate: ""
    });

    const [successMessage, setSuccessMessage] = useState("");

    // =========================================
    // FILTER PROBLEMS
    // =========================================

    const filteredProblems = problems.filter((problem) => {
        const matchesSearch = problem.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" || problem.difficulty === difficulty;

        const matchesTopic = topic === "All" || problem.topic === topic;

        const matchesPlatform =
            platform === "All" || problem.platform === platform;

        return (
            matchesSearch &&
            matchesDifficulty &&
            matchesTopic &&
            matchesPlatform
        );
    });

    // =========================================
    // RESET FILTERS
    // =========================================

    const resetFilters = () => {
        setSearch("");
        setDifficulty("All");
        setTopic("All");
        setPlatform("All");
    };

    // =========================================
    // HANDLE ADD FORM INPUT
    // =========================================

    const handleAddProblemChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setNewProblem({
            ...newProblem,
            [name]: value
        });

        setSuccessMessage("");
    };

    // =========================================
    // ADD PROBLEM
    // =========================================

    const handleAddProblem = (event) => {
        event.preventDefault();

        const problem = {
            id: problems.length + 1,
            title: newProblem.title,
            difficulty: newProblem.difficulty,
            topic: newProblem.topic,
            platform: newProblem.platform,
            solvedDate: newProblem.solvedDate
        };

        setProblems([problem, ...problems]);
        setSuccessMessage("Problem added successfully!");

        setNewProblem({
            title: "",
            difficulty: "Easy",
            topic: "",
            platform: "LeetCode",
            solvedDate: ""
        });

        setShowAddForm(false);
    };

    return (
        <div className="problems-page">
            {/* PAGE HEADER */}
            <section className="problems-header">
                <div>
                    <span className="problems-badge">CODING HISTORY</span>
                    <h1>Problems</h1>
                    <p>Track and review all the problems you've solved.</p>
                </div>

                <div className="problems-header-actions">
                    <div className="problems-count">
                        <span>Total Solved</span>
                        <strong>125</strong>
                    </div>
                    {/* Extra button removed from here */}
                </div>
            </section>

            {/* FILTER SECTION */}
            <section className="filter-card">
                <div className="filter-header">
                    <div>
                        <h2>Find Problems</h2>
                        <p>Search and filter your coding history.</p>
                    </div>

                    <button
                        className="add-problem-top-button"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        {showAddForm ? "✕ Close" : "+ Add Problem"}
                    </button>
                </div>

                {/* ADD PROBLEM FORM */}
                {showAddForm && (
                    <div className="add-problem-form">
                        <div className="add-form-header">
                            <div>
                                <h2>Add New Problem</h2>
                                <p>Add a problem to your coding history.</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddProblem}>
                            <div className="add-form-group">
                                <label>Problem Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newProblem.title}
                                    onChange={handleAddProblemChange}
                                    placeholder="Enter problem title"
                                />
                            </div>

                            <div className="add-form-grid">
                                <div className="add-form-group">
                                    <label>Difficulty</label>
                                    <select
                                        name="difficulty"
                                        value={newProblem.difficulty}
                                        onChange={handleAddProblemChange}
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>

                                <div className="add-form-group">
                                    <label>Topic</label>
                                    <input
                                        type="text"
                                        name="topic"
                                        value={newProblem.topic}
                                        onChange={handleAddProblemChange}
                                        placeholder="Example: Array"
                                    />
                                </div>

                                <div className="add-form-group">
                                    <label>Platform</label>
                                    <select
                                        name="platform"
                                        value={newProblem.platform}
                                        onChange={handleAddProblemChange}
                                    >
                                        <option value="LeetCode">LeetCode</option>
                                        <option value="GeeksforGeeks">GeeksforGeeks</option>
                                        <option value="CodeChef">CodeChef</option>
                                        <option value="HackerRank">HackerRank</option>
                                    </select>
                                </div>

                                <div className="add-form-group">
                                    <label>Solved Date</label>
                                    <input
                                        type="date"
                                        name="solvedDate"
                                        value={newProblem.solvedDate}
                                        onChange={handleAddProblemChange}
                                    />
                                </div>
                            </div>

                            <div className="add-form-actions">
                                <button
                                    type="button"
                                    className="cancel-add-button"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="save-add-button">
                                    + Add Problem
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="add-success-message">
                        ✅ {successMessage}
                    </div>
                )}

                {/* FILTERS */}
                <div className="filters">
                    <div className="search-box">
                        <span className="search-icon">🔎</span>
                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Topic</label>
                        <select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        >
                            <option value="All">All Topics</option>
                            <option value="Array">Array</option>
                            <option value="Binary Search">Binary Search</option>
                            <option value="Graph">Graph</option>
                            <option value="Dynamic Programming">Dynamic Programming</option>
                            <option value="Sorting">Sorting</option>
                            <option value="Stack">Stack</option>
                            <option value="Sliding Window">Sliding Window</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Platform</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <option value="All">All Platforms</option>
                            <option value="LeetCode">LeetCode</option>
                            <option value="GeeksforGeeks">GeeksforGeeks</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* TABLE */}
            <section className="problems-table-card">
                <div className="table-header">
                    <div>
                        <h2>Problem History</h2>
                        <p>
                            Showing <strong>{filteredProblems.length}</strong> of{" "}
                            {problems.length} problems
                        </p>
                    </div>
                </div>

                <div className="table-wrapper">
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
                            {filteredProblems.length > 0 ? (
                                filteredProblems.map((problem) => (
                                    <tr key={problem.id}>
                                        <td>
                                            <div className="problem-title">
                                                <div className="problem-number">
                                                    #{problem.id}
                                                </div>
                                                <span>{problem.title}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
                                            >
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="topic-text">{problem.topic}</span>
                                        </td>
                                        <td>
                                            <span className="platform-badge">{problem.platform}</span>
                                        </td>
                                        <td>
                                            <span className="solved-date">{problem.solvedDate}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-results">
                                        <div className="no-results-content">
                                            <div className="no-results-icon">🔍</div>
                                            <h3>No problems found</h3>
                                            <p>Try changing your search or filters.</p>
                                            <button
                                                onClick={resetFilters}
                                                className="no-results-button"
                                            >
                                                Clear Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Problems;