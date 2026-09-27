const API_URL = "http://localhost:8080";

const authSection = document.getElementById("authSection");
const connectedSection = document.getElementById("connectedSection");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const connectButton = document.getElementById("connectButton");
const authMessage = document.getElementById("authMessage");

const togglePassword = document.getElementById("togglePassword");

const connectedEmail = document.getElementById("connectedEmail");

const problemContainer = document.getElementById("problemContainer");
const addProblemButton = document.getElementById("addProblemButton");

const message = document.getElementById("message");

const disconnectButton = document.getElementById("disconnectButton");


// ========================================
// CHECK AUTHENTICATION
// ========================================

async function checkAuthentication() {

    const data = await chrome.storage.local.get([
        "codepulseToken",
        "codepulseEmail"
    ]);

    if (data.codepulseToken) {

        showConnectedState(data.codepulseEmail);

        detectProblem();

    } else {

        showLoginState();
    }
}


// ========================================
// SHOW LOGIN
// ========================================

function showLoginState() {

    authSection.style.display = "block";

    connectedSection.style.display = "none";
}


// ========================================
// SHOW CONNECTED
// ========================================

function showConnectedState(email) {

    authSection.style.display = "none";

    connectedSection.style.display = "block";

    connectedEmail.textContent = email;
}


// ========================================
// LOGIN
// ========================================

async function login() {

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    emailError.textContent = "";

    passwordError.textContent = "";

    authMessage.textContent = "";


    if (email === "") {

        emailError.textContent =
            "Email is required";

        return;
    }


    if (!email.includes("@")) {

        emailError.textContent =
            "Enter a valid email";

        return;
    }


    if (password === "") {

        passwordError.textContent =
            "Password is required";

        return;
    }


    connectButton.disabled = true;

    connectButton.textContent =
        "Connecting...";


    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message || "Login failed"
            );
        }


        // Store JWT and email
        await chrome.storage.local.set({

            codepulseToken: data.token,

            codepulseEmail: email

        });


        authMessage.textContent =
            "Connected successfully!";


        showConnectedState(email);

        detectProblem();


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        authMessage.textContent =
            error.message ||
            "Unable to connect";

        authMessage.style.color =
            "#f87171";

    } finally {

        connectButton.disabled = false;

        connectButton.textContent =
            "🔐 Connect to CodePulse";
    }
}


// ========================================
// PASSWORD TOGGLE
// ========================================

togglePassword.addEventListener(
    "click",
    () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent =
                "Show";
        }
    }
);


// ========================================
// DISCONNECT
// ========================================

disconnectButton.addEventListener(
    "click",
    async () => {

        await chrome.storage.local.remove([
            "codepulseToken",
            "codepulseEmail"
        ]);


        problemContainer.innerHTML = "";

        addProblemButton.disabled = true;

        showLoginState();
    }
);


// ========================================
// CONNECT BUTTON
// ========================================

connectButton.addEventListener(
    "click",
    login
);


// ========================================
// DETECT PROBLEM
// ========================================

async function detectProblem() {

    problemContainer.innerHTML = `
        <p class="loading">
            Detecting problem...
        </p>
    `;

    addProblemButton.disabled = true;


    try {

        const tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });


        if (!tabs || tabs.length === 0) {

            showProblemError(
                "No active tab found."
            );

            return;
        }


        const tab = tabs[0];


        console.log(
            "Active tab:",
            tab.url
        );


        if (!tab.id) {

            showProblemError(
                "Could not access active tab."
            );

            return;
        }


        // Check URL
        if (
            !tab.url ||
            !tab.url.includes(
                "leetcode.com/problems/"
            )
        ) {

            showProblemError(
                "Open a LeetCode problem page first."
            );

            return;
        }


        // Inject code into current page
        const results =
            await chrome.scripting.executeScript({

                target: {
                    tabId: tab.id
                },

                func: () => {

                    const heading =
                        document.querySelector("h1");


                    let title = "";


                    // Try H1
                    if (heading) {

                        title =
                            heading.innerText.trim();
                    }


                    // Try document title
                    if (!title) {

                        title =
                            document.title
                                .replace(
                                    /\s*-\s*LeetCode.*$/i,
                                    ""
                                )
                                .replace(
                                    /^\d+\.\s*/,
                                    ""
                                )
                                .trim();
                    }


                    // Try URL
                    if (!title) {

                        const path =
                            window.location.pathname;

                        const match =
                            path.match(
                                /\/problems\/([^/]+)/
                            );


                        if (match) {

                            title =
                                match[1]
                                    .split("-")
                                    .map(word =>
                                        word
                                            .charAt(0)
                                            .toUpperCase()
                                        +
                                        word.slice(1)
                                    )
                                    .join(" ");
                        }
                    }


                    if (!title) {

                        return null;
                    }


                    // Detect difficulty

                    const pageText =
                        document.body.innerText
                            .toLowerCase();


                    let difficulty =
                        "Not detected";


                    if (
                        pageText.includes("easy")
                    ) {

                        difficulty = "Easy";

                    } else if (
                        pageText.includes("medium")
                    ) {

                        difficulty = "Medium";

                    } else if (
                        pageText.includes("hard")
                    ) {

                        difficulty = "Hard";
                    }


                    return {

                        title: title,

                        difficulty: difficulty,

                        platform: "LeetCode"
                    };
                }
            });


        console.log(
            "Detection result:",
            results
        );


        if (
            !results ||
            results.length === 0
        ) {

            showProblemError(
                "No result returned from page."
            );

            return;
        }


        const problem =
            results[0].result;


        if (
            !problem ||
            !problem.title
        ) {

            showProblemError(
                "Could not detect the problem title."
            );

            return;
        }


        displayProblem(problem);


    } catch (error) {

        console.error(
            "Detection error:",
            error
        );


        showProblemError(
            "Could not read this LeetCode page."
        );
    }
}


// ========================================
// DISPLAY PROBLEM
// ========================================

function displayProblem(problem) {

    problemContainer.innerHTML = `

        <div class="problem-card">

            <span class="platform">
                ${problem.platform}
            </span>

            <h2>
                ${problem.title}
            </h2>

            <div class="difficulty-row">

                <span class="difficulty-label">
                    Difficulty
                </span>

                <span class="difficulty-badge">
                    ${problem.difficulty}
                </span>

            </div>

        </div>
    `;


    addProblemButton.disabled = false;
}


// ========================================
// SHOW DETECTION ERROR
// ========================================

function showProblemError(text) {

    problemContainer.innerHTML = `

        <div style="
            padding: 15px;
            border-radius: 10px;
            background: #1a1115;
            border: 1px solid #4b2028;
        ">

            <p style="
                margin: 0;
                color: #f87171;
                font-size: 12px;
                line-height: 1.5;
            ">
                ${text}
            </p>

        </div>
    `;


    addProblemButton.disabled = true;
}

async function addProblem() {

    const data = await chrome.storage.local.get([
        "codepulseToken",
        "codepulseEmail"
    ]);

    if (!data.codepulseToken || !data.codepulseEmail) {
        message.textContent = "Please connect to CodePulse first.";
        message.style.color = "#f87171";
        return;
    }

    const problemCard = document.querySelector(".problem-card");

    if (!problemCard) {
        message.textContent = "No problem detected.";
        message.style.color = "#f87171";
        return;
    }

    const titleElement = problemCard.querySelector("h2");
    const difficultyElement = problemCard.querySelector(".difficulty-badge");

    if (!titleElement || !difficultyElement) {
        message.textContent = "Problem details are missing.";
        message.style.color = "#f87171";
        return;
    }

    const title = titleElement.textContent.trim();
    const difficulty = difficultyElement.textContent.trim();

    addProblemButton.disabled = true;
    addProblemButton.textContent = "Adding...";
    message.textContent = "";

    const problem = {
        username: data.codepulseEmail,
        title: title,
        difficulty: difficulty,
        topic: "Unknown",
        platform: "LeetCode",
        solvedDate: new Date().toISOString().split("T")[0]
    };

    try {

        const response = await fetch(
            `${API_URL}/api/v1/problems`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data.codepulseToken}`
                },

                body: JSON.stringify(problem)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to add problem"
            );
        }

        message.textContent = "✓ Problem added successfully!";
        message.style.color = "#4ade80";

        addProblemButton.textContent = "✓ Added";

    } catch (error) {

        console.error("Add problem error:", error);

        message.textContent =
            error.message || "Unable to add problem.";

        message.style.color = "#f87171";

        addProblemButton.disabled = false;
        addProblemButton.textContent = "+ Add Problem";
    }
}
addProblemButton.addEventListener(
    "click",
    addProblem
);
// ========================================
// START
// ========================================

checkAuthentication();