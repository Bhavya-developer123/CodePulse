import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [college, setCollege] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [collegeError, setCollegeError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [loading, setLoading] = useState(false);


    const validateForm = () => {

        let isValid = true;

        setNameError("");
        setEmailError("");
        setCollegeError("");
        setPasswordError("");
        setConfirmPasswordError("");


        // Name validation

        if (name.trim() === "") {

            setNameError("Full name is required");

            isValid = false;

        } else if (name.trim().length < 3) {

            setNameError("Name must contain at least 3 characters");

            isValid = false;
        }


        // Email validation

        if (email.trim() === "") {

            setEmailError("Email is required");

            isValid = false;

        } else if (!email.includes("@")) {

            setEmailError("Enter a valid email");

            isValid = false;
        }


        // College validation

        if (college.trim() === "") {

            setCollegeError("College name is required");

            isValid = false;

        } else if (college.trim().length < 3) {

            setCollegeError(
                "College name must contain at least 3 characters"
            );

            isValid = false;
        }


        // Password validation

        if (password === "") {

            setPasswordError("Password is required");

            isValid = false;

        } else if (password.length < 8) {

            setPasswordError(
                "Password must contain at least 8 characters"
            );

            isValid = false;

        } else if (!/[A-Z]/.test(password)) {

            setPasswordError(
                "Password must contain at least one uppercase letter"
            );

            isValid = false;

        } else if (!/[0-9]/.test(password)) {

            setPasswordError(
                "Password must contain at least one number"
            );

            isValid = false;
        }


        // Confirm password

        if (confirmPassword === "") {

            setConfirmPasswordError(
                "Please confirm your password"
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            setConfirmPasswordError(
                "Passwords do not match"
            );

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


        // Backend registration will be connected
        // during Days 41–45.

        setTimeout(() => {

            setLoading(false);

            console.log("Registration Data:", {
                name: name,
                email: email,
                college: college,
                password: password
            });

            alert("Registration form is working!");

        }, 1000);
    };


    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>Create Account</h1>

                    <p>Join CodePulse</p>

                    <span>
                        Start tracking your coding journey.
                    </span>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* NAME */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {nameError && (
                            <p className="error-message">
                                {nameError}
                            </p>
                        )}

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
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


                    {/* COLLEGE */}

                    <div className="form-group">

                        <label htmlFor="college">
                            College
                        </label>

                        <input
                            id="college"
                            type="text"
                            placeholder="Enter your college"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                        />

                        {collegeError && (
                            <p className="error-message">
                                {collegeError}
                            </p>
                        )}

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="register-password">
                            Password
                        </label>

                        <div className="password-container">

                            <input
                                id="register-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
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


                    {/* CONFIRM PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>

                        <div className="password-container">

                            <input
                                id="confirm-password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                        {confirmPasswordError && (
                            <p className="error-message">
                                {confirmPasswordError}
                            </p>
                        )}

                    </div>


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>


                <p className="login-text">

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;