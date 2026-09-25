import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(false);

    const validateForm = () => {

        let isValid = true;

        setEmailError("");
        setPasswordError("");

        if (email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        } else if (!email.includes("@")) {
            setEmailError("Enter a valid email");
            isValid = false;
        }

        if (password.trim() === "") {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must contain at least 6 characters");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        setTimeout(() => {

            setLoading(false);

            alert("Login form is working!");

        }, 1000);
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>CodePulse</h1>

                    <p>
                        Welcome back!
                    </p>

                    <span>
                        Login to continue your coding journey.
                    </span>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Email */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {emailError && (
                            <p className="error-message">
                                {emailError}
                            </p>
                        )}

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <div className="password-label">

                            <label htmlFor="password">
                                Password
                            </label>

                            <Link to="/forgot-password">
                                Forgot password?
                            </Link>

                        </div>

                        <div className="password-container">

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>

                        {passwordError && (
                            <p className="error-message">
                                {passwordError}
                            </p>
                        )}

                    </div>


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>


                {/* Register */}

                <p className="register-text">

                    Don't have an account?

                    {" "}

                    <Link to="/register">
                        Create an account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;