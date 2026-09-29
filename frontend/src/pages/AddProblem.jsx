import { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/apiClient";
import getApiErrorMessage from "../utils/apiError";

import "./Problems.css";

function AddProblem() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        difficulty: "",
        topic: "",
        platform: "",
        solvedDate: ""
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");


        if (!formData.title.trim()) {

            setErrorMessage("Problem title is required.");
            return;

        }


        if (!formData.difficulty) {

            setErrorMessage("Please select difficulty.");
            return;

        }


        if (!formData.topic.trim()) {

            setErrorMessage("Topic is required.");
            return;

        }


        if (!formData.platform) {

            setErrorMessage("Please select platform.");
            return;

        }


        if (!formData.solvedDate) {

            setErrorMessage("Solved date is required.");
            return;

        }


        try {

            setLoading(true);

            const response = await apiClient.post(
                "/api/v1/problems",
                formData
            );

            console.log("Problem added:");
            console.log(response.data);

            setSuccessMessage("Problem added successfully!");

            setFormData({
                title: "",
                difficulty: "",
                topic: "",
                platform: "",
                solvedDate: ""
            });


        } catch (error) {

            console.error("Failed to add problem:");
            console.error(error);

            setErrorMessage(
                getApiErrorMessage(error)
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="add-problem-page">

            {/* Header */}

            <div className="add-problem-header">

                <div>

                    <span className="page-label">
                        CODEPULSE
                    </span>

                    <h1>Add Problem</h1>

                    <p>
                        Record a problem you have successfully solved.
                    </p>

                </div>

                <button
                    className="back-button"
                    onClick={() => navigate("/problems")}
                >
                    ← Back to Problems
                </button>

            </div>


            {/* Form Card */}

            <div className="add-problem-card">

                <div className="form-card-header">

                    <div className="form-header-icon">
                        +
                    </div>

                    <div>

                        <h2>Problem Details</h2>

                        <p>
                            Add the details of your solved problem below.
                        </p>

                    </div>

                </div>


                {/* Error */}

                {errorMessage && (

                    <div className="form-error">
                        {errorMessage}
                    </div>

                )}


                {/* Success */}

                {successMessage && (

                    <div className="form-success">
                        {successMessage}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    {/* Title */}

                    <div className="form-group">

                        <label htmlFor="title">
                            Problem Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Example: Two Sum"
                            value={formData.title}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Difficulty */}

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="difficulty">
                                Difficulty
                            </label>

                            <select
                                id="difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select difficulty
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


                        {/* Platform */}

                        <div className="form-group">

                            <label htmlFor="platform">
                                Platform
                            </label>

                            <select
                                id="platform"
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select platform
                                </option>

                                <option value="LeetCode">
                                    LeetCode
                                </option>

                                <option value="GeeksForGeeks">
                                    GeeksForGeeks
                                </option>

                                <option value="CodeChef">
                                    CodeChef
                                </option>

                                <option value="HackerRank">
                                    HackerRank
                                </option>

                                <option value="Codeforces">
                                    Codeforces
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Topic */}

                    <div className="form-group">

                        <label htmlFor="topic">
                            Topic
                        </label>

                        <input
                            id="topic"
                            name="topic"
                            type="text"
                            placeholder="Example: Arrays"
                            value={formData.topic}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Solved Date */}

                    <div className="form-group">

                        <label htmlFor="solvedDate">
                            Solved Date
                        </label>

                        <input
                            id="solvedDate"
                            name="solvedDate"
                            type="date"
                            value={formData.solvedDate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Buttons */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/problems")}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-problem-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Problem"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddProblem;