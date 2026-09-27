import { useState } from "react";

function Problems() {

    const problems = [
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
    ];


    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
    const [topic, setTopic] = useState("All");
    const [platform, setPlatform] = useState("All");


    const filteredProblems = problems.filter((problem) => {

        const matchesSearch =
            problem.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" ||
            problem.difficulty === difficulty;

        const matchesTopic =
            topic === "All" ||
            problem.topic === topic;

        const matchesPlatform =
            platform === "All" ||
            problem.platform === platform;

        return (
            matchesSearch &&
            matchesDifficulty &&
            matchesTopic &&
            matchesPlatform
        );
    });


    const resetFilters = () => {
        setSearch("");
        setDifficulty("All");
        setTopic("All");
        setPlatform("All");
    };


    return (
        <div className="problems-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="problems-header">

                <div>

                    <span className="problems-badge">
                        CODING HISTORY
                    </span>

                    <h1>
                        Problems
                    </h1>

                    <p>
                        Track and review all the problems
                        you've solved.
                    </p>

                </div>


                <div className="problems-count">

                    <span>
                        Total Solved
                    </span>

                    <strong>
                        125
                    </strong>

                </div>

            </section>


            {/* =================================================
                FILTER SECTION
            ================================================= */}

            <section className="filter-card">

                <div className="filter-header">

                    <div>

                        <h2>
                            Find Problems
                        </h2>

                        <p>
                            Search and filter your coding history.
                        </p>

                    </div>


                    <button
                        className="reset-button"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>

                </div>


                <div className="filters">

                    {/* Search */}

                    <div className="search-box">

                        <span className="search-icon">
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search problems..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* Difficulty */}

                    <div className="filter-group">

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }
                        >

                            <option value="All">
                                All Difficulties
                            </option>

                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Hard">
                                Hard
                            </option>

                        </select>

                    </div>


                    {/* Topic */}

                    <div className="filter-group">

                        <label>
                            Topic
                        </label>

                        <select
                            value={topic}
                            onChange={(e) =>
                                setTopic(e.target.value)
                            }
                        >

                            <option value="All">
                                All Topics
                            </option>

                            <option value="Array">
                                Array
                            </option>

                            <option value="Binary Search">
                                Binary Search
                            </option>

                            <option value="Graph">
                                Graph
                            </option>

                            <option value="Dynamic Programming">
                                Dynamic Programming
                            </option>

                            <option value="Sorting">
                                Sorting
                            </option>

                            <option value="Stack">
                                Stack
                            </option>

                            <option value="Sliding Window">
                                Sliding Window
                            </option>

                        </select>

                    </div>


                    {/* Platform */}

                    <div className="filter-group">

                        <label>
                            Platform
                        </label>

                        <select
                            value={platform}
                            onChange={(e) =>
                                setPlatform(e.target.value)
                            }
                        >

                            <option value="All">
                                All Platforms
                            </option>

                            <option value="LeetCode">
                                LeetCode
                            </option>

                            <option value="GeeksforGeeks">
                                GeeksforGeeks
                            </option>

                        </select>

                    </div>

                </div>

            </section>


            {/* =================================================
                TABLE
            ================================================= */}

            <section className="problems-table-card">

                <div className="table-header">

                    <div>

                        <h2>
                            Problem History
                        </h2>

                        <p>
                            Showing{" "}
                            <strong>
                                {filteredProblems.length}
                            </strong>{" "}
                            of {problems.length} problems
                        </p>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="problems-table">

                        <thead>

                            <tr>

                                <th>
                                    Problem
                                </th>

                                <th>
                                    Difficulty
                                </th>

                                <th>
                                    Topic
                                </th>

                                <th>
                                    Platform
                                </th>

                                <th>
                                    Solved Date
                                </th>

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

                                                <span>
                                                    {problem.title}
                                                </span>

                                            </div>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    `difficulty-badge ${problem.difficulty.toLowerCase()}`
                                                }
                                            >
                                                {problem.difficulty}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="topic-text">
                                                {problem.topic}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="platform-badge">
                                                {problem.platform}
                                            </span>

                                        </td>


                                        <td>

                                            <span className="solved-date">
                                                {problem.solvedDate}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="no-results"
                                    >

                                        <div className="no-results-content">

                                            <div className="no-results-icon">
                                                🔍
                                            </div>

                                            <h3>
                                                No problems found
                                            </h3>

                                            <p>
                                                Try changing your search
                                                or filters.
                                            </p>

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