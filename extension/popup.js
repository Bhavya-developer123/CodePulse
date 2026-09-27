// ==========================================
// CODEPULSE POPUP
// ==========================================

const API_URL = "http://localhost:8080";


// ==========================================
// ELEMENTS
// ==========================================

const authSection =
    document.getElementById("authSection");

const connectedSection =
    document.getElementById("connectedSection");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const connectButton =
    document.getElementById("connectButton");

const disconnectButton =
    document.getElementById("disconnectButton");

const authMessage =
    document.getElementById("authMessage");

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const connectedEmail =
    document.getElementById("connectedEmail");

const problemContainer =
    document.getElementById("problemContainer");

const addProblemButton =
    document.getElementById("addProblemButton");

const message =
    document.getElementById("message");


// ==========================================
// AUTH UI
// ==========================================

function showAuth() {

    authSection.hidden = false;

    connectedSection.hidden = true;
}


function showConnected(email) {

    authSection.hidden = true;

    connectedSection.hidden = false;

    connectedEmail.textContent = email;

    detectCurrentProblem();
}


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

togglePassword.addEventListener(
    "click",
    function () {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "Show";
        }
    }
);


// ==========================================
// LOGIN
// ==========================================

async function login() {

    emailError.textContent = "";

    passwordError.textContent = "";

    authMessage.textContent = "";


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    if (!email) {

        emailError.textContent =
            "Email is required.";

        emailInput.focus();

        return;
    }


    if (!password) {

        passwordError.textContent =
            "Password is required.";

        passwordInput.focus();

        return;
    }


    connectButton.disabled = true;

    connectButton.textContent =
        "Connecting...";


    try {

        const response =
            await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


        let data = {};

        try {

            data =
                await response.json();

        } catch (error) {

            console.log(
                "Response is not JSON."
            );
        }


        if (!response.ok) {

            authMessage.textContent =
                data.message ||
                "Invalid email or password.";

            return;
        }


        if (!data.token) {

            authMessage.textContent =
                "JWT token was not returned.";

            return;
        }


        await chrome.storage.local.set({

            codepulseToken:
                data.token,

            codepulseEmail:
                email

        });


        passwordInput.value = "";

        authMessage.textContent =
            "Connected successfully.";


        showConnected(email);

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        authMessage.textContent =
            "Cannot connect to CodePulse backend.";

    } finally {

        connectButton.disabled = false;

        connectButton.textContent =
            "🔐 Connect to CodePulse";
    }
}


// ==========================================
// LOGIN BUTTON
// ==========================================

connectButton.addEventListener(
    "click",
    login
);


// ==========================================
// GET ACTIVE TAB
// ==========================================

async function getActiveTab() {

    const tabs =
        await chrome.tabs.query({
            active: true,
            currentWindow: true
        });


    if (
        !tabs ||
        tabs.length === 0
    ) {

        return null;
    }


    return tabs[0];
}


// ==========================================
// DETECT CURRENT PROBLEM
// ==========================================

async function detectCurrentProblem() {

    disableAddButton();

    message.textContent =
        "Checking current submission result...";


    try {

        const tab =
            await getActiveTab();


        if (!tab) {

            showProblemError(
                "No active tab found."
            );

            return;
        }


        if (
            !tab.url ||
            !tab.url.includes(
                "leetcode.com/problems/"
            )
        ) {

            showProblemError(
                "Open a LeetCode problem first."
            );

            return;
        }


        const results =
            await chrome.scripting.executeScript({

                target: {
                    tabId: tab.id
                },

                func:
                    readCurrentLeetCodeState
            });


        if (
            !results ||
            results.length === 0 ||
            !results[0].result
        ) {

            showProblemError(
                "Could not read LeetCode."
            );

            return;
        }


        const result =
            results[0].result;


        displayProblem(
            result.problem
        );


        console.log(
            "CodePulse current LeetCode state:",
            result
        );


        // ==================================
        // ONLY CURRENT RESULT MATTERS
        // ==================================

        if (
            result.status ===
            "ACCEPTED"
        ) {

            enableAddButton();

        } else {

            disableAddButton();
        }

    } catch (error) {

        console.error(
            "LeetCode detection error:",
            error
        );


        showProblemError(
            "Could not read LeetCode page."
        );
    }
}


// ==========================================
// READ CURRENT LEETCODE STATE
// ==========================================
//
// IMPORTANT:
//
// We DO NOT search the entire page for
// the word "Accepted".
//
// We first target LeetCode's submission-result
// element.
//
// This prevents an old Accepted submission
// from being mistaken for the current result.
// ==========================================

function readCurrentLeetCodeState() {

    // ======================================
    // TITLE
    // ======================================

    let title = "";

    const heading =
        document.querySelector("h1");


    if (heading) {

        title =
            heading.innerText.trim();
    }


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
                    .map(
                        function(word) {

                            return (
                                word
                                    .charAt(0)
                                    .toUpperCase()
                                +
                                word.slice(1)
                            );
                        }
                    )
                    .join(" ");
        }
    }


    // ======================================
    // DIFFICULTY
    // ======================================

    let difficulty =
        "Not detected";


    const elements =
        document.querySelectorAll(
            "span, div, a"
        );


    for (
        let i = 0;
        i < elements.length;
        i++
    ) {

        const text =
            elements[i]
                .innerText
                .trim();


        if (text === "Easy") {

            difficulty =
                "Easy";

            break;
        }


        if (text === "Medium") {

            difficulty =
                "Medium";

            break;
        }


        if (text === "Hard") {

            difficulty =
                "Hard";

            break;
        }
    }


    // ======================================
    // CURRENT SUBMISSION RESULT
    // ======================================

    let status =
        "NONE";


    /*
     * Primary detector.
     *
     * Current LeetCode implementations expose
     * the submission verdict through:
     *
     * [data-e2e-locator="submission-result"]
     */

    const resultElement =
        document.querySelector(
            '[data-e2e-locator="submission-result"]'
        );


    if (resultElement) {

        const resultText =
            resultElement.innerText
                .trim()
                .toLowerCase();


        console.log(
            "CodePulse submission-result:",
            resultText
        );


        if (
            resultText.includes(
                "accepted"
            )
        ) {

            status =
                "ACCEPTED";

        } else if (
            resultText.includes(
                "wrong answer"
            )
        ) {

            status =
                "WRONG";

        } else if (
            resultText.includes(
                "compile error"
            )
        ) {

            status =
                "COMPILE_ERROR";

        } else if (
            resultText.includes(
                "runtime error"
            )
        ) {

            status =
                "RUNTIME_ERROR";

        } else if (
            resultText.includes(
                "time limit exceeded"
            )
        ) {

            status =
                "TIME_LIMIT";

        } else if (
            resultText.includes(
                "memory limit exceeded"
            )
        ) {

            status =
                "MEMORY_LIMIT";
        }
    }


    return {

        problem: {

            title:
                title,

            difficulty:
                difficulty,

            platform:
                "LeetCode"
        },

        status:
            status
    };
}


// ==========================================
// DISPLAY PROBLEM
// ==========================================

function displayProblem(problem) {

    problemContainer.innerHTML =
        "";


    const card =
        document.createElement(
            "div"
        );

    card.className =
        "problem-card";


    const title =
        document.createElement(
            "h2"
        );

    title.textContent =
        problem.title;


    const difficulty =
        document.createElement(
            "p"
        );

    difficulty.className =
        "difficulty-badge";

    difficulty.textContent =
        `Difficulty: ${problem.difficulty}`;


    card.appendChild(title);

    card.appendChild(difficulty);

    problemContainer.appendChild(card);
}


// ==========================================
// ENABLE
// ==========================================

function enableAddButton() {

    addProblemButton.disabled =
        false;

    addProblemButton.textContent =
        "+ Add Problem";


    message.textContent =
        "✅ Current submission is Accepted. You can add this problem.";
}


// ==========================================
// DISABLE
// ==========================================

function disableAddButton() {

    addProblemButton.disabled =
        true;

    addProblemButton.textContent =
        "+ Add Problem";


    message.textContent =
        "❌ Current submission is not Accepted.";
}


// ==========================================
// ERROR
// ==========================================

function showProblemError(text) {

    problemContainer.innerHTML =
        "";


    const p =
        document.createElement(
            "p"
        );

    p.className =
        "loading";

    p.textContent =
        text;


    problemContainer.appendChild(p);


    disableAddButton();
}


// ==========================================
// ADD PROBLEM
// ==========================================

async function addProblem() {

    /*
     * SECURITY CHECK:
     *
     * Check the CURRENT LeetCode result
     * one more time before POST.
     */

    addProblemButton.disabled =
        true;

    addProblemButton.textContent =
        "Checking...";


    try {

        const tab =
            await getActiveTab();


        if (!tab) {

            message.textContent =
                "No active tab.";

            return;
        }


        const results =
            await chrome.scripting.executeScript({

                target: {
                    tabId: tab.id
                },

                func:
                    readCurrentLeetCodeState
            });


        if (
            !results ||
            !results[0] ||
            !results[0].result
        ) {

            message.textContent =
                "Could not verify LeetCode result.";

            return;
        }


        const currentState =
            results[0].result;


        /*
         * THIS IS THE FINAL GATE.
         */

        if (
            currentState.status !==
            "ACCEPTED"
        ) {

            message.textContent =
                "❌ This submission is not Accepted. Problem was NOT added.";

            return;
        }


        // ==================================
        // GET JWT
        // ==================================

        const auth =
            await chrome.storage.local.get([
                "codepulseToken",
                "codepulseEmail"
            ]);


        if (!auth.codepulseToken) {

            message.textContent =
                "Please connect to CodePulse.";

            return;
        }


        // ==================================
        // BUILD REQUEST
        // ==================================

        const problemData = {

            username:
                auth.codepulseEmail,

            title:
                currentState.problem.title,

            difficulty:
                currentState.problem.difficulty,

            topic:
                "Unknown",

            platform:
                "LeetCode",

            solvedDate:
                new Date()
                    .toISOString()
                    .split("T")[0]
        };


        addProblemButton.textContent =
            "Adding...";


        // ==================================
        // SEND TO SPRING BOOT
        // ==================================

        const response =
            await fetch(
                `${API_URL}/api/v1/problems`,
                {
                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${auth.codepulseToken}`
                    },

                    body:
                        JSON.stringify(
                            problemData
                        )
                }
            );


        let data = {};


        try {

            data =
                await response.json();

        } catch (error) {

            console.log(
                "No JSON response."
            );
        }


        // ==================================
        // DUPLICATE
        // ==================================

        if (
            response.status ===
            409
        ) {

            message.textContent =
                "⚠️ This problem is already added.";

            return;
        }


        // ==================================
        // UNAUTHORIZED
        // ==================================

        if (
            response.status ===
            401
        ) {

            message.textContent =
                "❌ Session expired. Please connect again.";

            return;
        }


        // ==================================
        // OTHER ERROR
        // ==================================

        if (!response.ok) {

            console.error(
                "Backend error:",
                data
            );

            message.textContent =
                "❌ Failed to add problem.";

            return;
        }


        // ==================================
        // SUCCESS
        // ==================================

        message.textContent =
            "✅ Problem added successfully!";


    } catch (error) {

        console.error(
            "Add problem error:",
            error
        );


        message.textContent =
            "❌ Could not connect to CodePulse.";

    } finally {

        addProblemButton.disabled =
            true;

        addProblemButton.textContent =
            "+ Add Problem";
    }
}


// ==========================================
// ADD BUTTON
// ==========================================

addProblemButton.addEventListener(
    "click",
    addProblem
);


// ==========================================
// DISCONNECT
// ==========================================

disconnectButton.addEventListener(
    "click",
    async function() {

        await chrome.storage.local.remove([
            "codepulseToken",
            "codepulseEmail",
            "codepulseSubmissionReady",
            "codepulseAcceptedProblem"
        ]);


        emailInput.value =
            "";

        passwordInput.value =
            "";

        passwordInput.type =
            "password";

        togglePassword.textContent =
            "Show";


        showAuth();

        emailInput.focus();
    }
);


// ==========================================
// INITIALIZE
// ==========================================

async function initialize() {

    emailInput.disabled =
        false;

    passwordInput.disabled =
        false;


    const data =
        await chrome.storage.local.get([
            "codepulseToken",
            "codepulseEmail"
        ]);


    if (
        data.codepulseToken &&
        data.codepulseEmail
    ) {

        showConnected(
            data.codepulseEmail
        );

    } else {

        showAuth();

        setTimeout(
            function() {

                emailInput.focus();

            },
            100
        );
    }
}


initialize();