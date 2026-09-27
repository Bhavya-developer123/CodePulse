// ==========================================
// CODEPULSE BACKGROUND SERVICE WORKER
// ==========================================

console.log(
    "CodePulse background service worker started."
);


// ==========================================
// CONTENT SCRIPT MESSAGE
// ==========================================

chrome.runtime.onMessage.addListener(
    async function(message) {

        // ======================================
        // SUBMISSION STARTED
        // ======================================

        if (
            message.type ===
            "SUBMISSION_STARTED"
        ) {

            await chrome.storage.local.set({

                codepulseSubmissionReady:
                    false,

                codepulseAcceptedProblem:
                    null

            });

            console.log(
                "CodePulse: New submission started."
            );

            return;
        }


        // ======================================
        // ACCEPTED
        // ======================================

        if (
            message.type ===
            "ACCEPTED_SUBMISSION"
        ) {

            await chrome.storage.local.set({

                codepulseSubmissionReady:
                    true,

                codepulseAcceptedProblem:
                    message.problem

            });

            console.log(
                "CodePulse: NEW ACCEPTED submission stored."
            );

            return;
        }


        // ======================================
        // NOT ACCEPTED
        // ======================================

        if (
            message.type ===
            "SUBMISSION_NOT_ACCEPTED"
        ) {

            await chrome.storage.local.set({

                codepulseSubmissionReady:
                    false,

                codepulseAcceptedProblem:
                    null

            });

            console.log(
                "CodePulse: Submission was not accepted."
            );

            return;
        }
    }
);