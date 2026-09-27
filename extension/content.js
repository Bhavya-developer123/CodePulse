// ==========================================
// CODEPULSE LEETCODE CONTENT SCRIPT
// ==========================================

console.log(
    "CodePulse: content script loaded."
);


// ==========================================
// STATE
// ==========================================

let submissionInProgress = false;

let baselineSnapshot = null;

let checkTimer = null;


// ==========================================
// GET PROBLEM DETAILS
// ==========================================

function getProblemDetails() {

    let title = "";

    const heading =
        document.querySelector("h1");

    if (heading) {

        title =
            heading.innerText.trim();
    }


    // ======================================
    // TITLE FALLBACK
    // ======================================

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


    // ======================================
    // URL FALLBACK
    // ======================================

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


    return {

        title:
            title,

        difficulty:
            difficulty,

        platform:
            "LeetCode"
    };
}


// ==========================================
// GET STATUS
// ==========================================

function getStatus() {

    const elements =
        document.querySelectorAll(
            "div, span, button"
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


        if (
            text === "Accepted"
        ) {

            return "ACCEPTED";
        }


        if (
            text === "Wrong Answer"
        ) {

            return "WRONG";
        }


        if (
            text === "Compile Error"
        ) {

            return "ERROR";
        }


        if (
            text === "Runtime Error"
        ) {

            return "ERROR";
        }


        if (
            text ===
            "Time Limit Exceeded"
        ) {

            return "ERROR";
        }


        if (
            text ===
            "Memory Limit Exceeded"
        ) {

            return "ERROR";
        }
    }


    return "NONE";
}


// ==========================================
// GET SUBMISSION HISTORY SIGNATURE
// ==========================================

function getSubmissionHistorySignature() {

    const bodyText =
        document.body.innerText;


    /*
     * LeetCode displays submission timestamps
     * around submission history/result areas.
     *
     * We collect the visible "submitted at"
     * information so an old Accepted result
     * cannot be mistaken for the new one.
     */

    const matches =
        bodyText.match(
            /submitted at[^\n]*/gi
        );


    if (
        !matches ||
        matches.length === 0
    ) {

        return "";
    }


    return matches
        .slice(-5)
        .join("|");
}


// ==========================================
// CREATE SNAPSHOT
// ==========================================

function getSubmissionSnapshot() {

    const status =
        getStatus();


    const history =
        getSubmissionHistorySignature();


    return {

        status:
            status,

        history:
            history,

        fingerprint:
            status +
            "::" +
            history
    };
}


// ==========================================
// CHECK IF SUBMIT BUTTON
// ==========================================

function isSubmitButton(element) {

    if (!element) {

        return false;
    }


    const button =
        element.closest("button");


    if (!button) {

        return false;
    }


    const text =
        button.innerText
            .trim()
            .toLowerCase();


    return (
        text === "submit"
    );
}


// ==========================================
// START MONITORING
// ==========================================

function startSubmissionMonitoring() {

    if (
        submissionInProgress
    ) {

        return;
    }


    submissionInProgress =
        true;


    baselineSnapshot =
        getSubmissionSnapshot();


    console.log(
        "CodePulse: Submission started."
    );


    console.log(
        "CodePulse baseline:",
        baselineSnapshot
    );


    chrome.runtime.sendMessage({

        type:
            "SUBMISSION_STARTED"

    });


    startPolling();
}


// ==========================================
// POLLING
// ==========================================

function startPolling() {

    if (checkTimer) {

        clearInterval(
            checkTimer
        );
    }


    let attempts = 0;


    checkTimer =
        setInterval(
            function() {

                attempts++;


                const currentSnapshot =
                    getSubmissionSnapshot();


                console.log(
                    "CodePulse submission check:",
                    currentSnapshot
                );


                /*
                 * Ignore the first few seconds.
                 *
                 * LeetCode needs time to judge
                 * the submission.
                 */

                if (
                    attempts < 3
                ) {

                    return;
                }


                /*
                 * We need a NEW submission state.
                 */

                const changed =
                    currentSnapshot.fingerprint
                    !==
                    baselineSnapshot.fingerprint;


                if (!changed) {

                    /*
                     * Old result is still visible.
                     */

                    if (
                        attempts >= 60
                    ) {

                        stopPolling();


                        submissionInProgress =
                            false;


                        console.log(
                            "CodePulse: No new submission result detected."
                        );
                    }


                    return;
                }


                // ==================================
                // NEW RESULT DETECTED
                // ==================================

                if (
                    currentSnapshot.status ===
                    "ACCEPTED"
                ) {

                    stopPolling();


                    submissionInProgress =
                        false;


                    const problem =
                        getProblemDetails();


                    console.log(
                        "CodePulse: NEW ACCEPTED submission detected."
                    );


                    console.log(
                        "CodePulse problem:",
                        problem
                    );


                    chrome.runtime.sendMessage({

                        type:
                            "ACCEPTED_SUBMISSION",

                        problem:
                            problem
                    });


                    return;
                }


                // ==================================
                // NEW WRONG/ERROR RESULT
                // ==================================

                if (
                    currentSnapshot.status ===
                    "WRONG"
                    ||
                    currentSnapshot.status ===
                    "ERROR"
                ) {

                    stopPolling();


                    submissionInProgress =
                        false;


                    chrome.runtime.sendMessage({

                        type:
                            "SUBMISSION_NOT_ACCEPTED"

                    });


                    console.log(
                        "CodePulse: New submission was not accepted."
                    );
                }

            },
            1000
        );
}


// ==========================================
// STOP POLLING
// ==========================================

function stopPolling() {

    if (checkTimer) {

        clearInterval(
            checkTimer
        );

        checkTimer =
            null;
    }
}


// ==========================================
// LISTEN FOR SUBMIT
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        if (
            isSubmitButton(
                event.target
            )
        ) {

            startSubmissionMonitoring();
        }

    },
    true
);


// ==========================================
// MUTATION OBSERVER
// ==========================================

const observer =
    new MutationObserver(
        function() {

            if (
                submissionInProgress
            ) {

                /*
                 * Polling handles the actual
                 * submission detection.
                 *
                 * MutationObserver simply helps
                 * us notice that LeetCode changed.
                 */
            }
        }
    );


observer.observe(
    document.body,
    {
        childList: true,
        subtree: true,
        characterData: true
    }
);


// ==========================================
// READY
// ==========================================

console.log(
    "CodePulse: submission monitoring ready."
);