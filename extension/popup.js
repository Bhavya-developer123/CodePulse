const problemContainer =
    document.getElementById("problemContainer");

const addProblemButton =
    document.getElementById("addProblemButton");

const message =
    document.getElementById("message");

let currentProblem = null;

async function detectProblem() {
    problemContainer.innerHTML = `
        <p class="loading">
            Reading current page...
        </p>
    `;

    addProblemButton.disabled = true;

    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tabs || tabs.length === 0) {
        showError("Could not find active tab.");
        return;
    }

    const tab = tabs[0];

    console.log("ACTIVE TAB:");
    console.log(tab);

    if (!tab.url) {
        showError("Could not read tab URL.");
        return;
    }

    console.log("CURRENT URL:");
    console.log(tab.url);

    if (!tab.url.includes("leetcode.com")) {
        showError(
            "Please open a LeetCode problem."
        );
        return;
    }

    try {
        const results =
            await chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                func: () => {
                    const h1 =
                        document.querySelector("h1");
                    const pageTitle =
                        document.title;
                    const bodyText =
                        document.body.innerText;

                    return {
                        url:
                            window.location.href,
                        pageTitle:
                            pageTitle,
                        h1:
                            h1
                                ? h1.innerText
                                : "",
                        bodyStart:
                            bodyText.substring(0, 1000)
                    };
                }
            });

        console.log(
            "PAGE DATA:",
            results
        );

        if (
            !results ||
            results.length === 0
        ) {
            showError(
                "Chrome could not read the page."
            );
            return;
        }

        const data =
            results[0].result;

        console.log(
            "PAGE TITLE:",
            data.pageTitle
        );

        console.log(
            "H1:",
            data.h1
        );

        let title =
            data.h1.trim();

        /*
         * Example:
         * 1. Two Sum
         * becomes:
         * Two Sum
         */
        title =
            title.replace(
                /^\d+\.\s*/,
                ""
            );

        /*
         * Try to detect difficulty
         */
        let difficulty = "";

        const words = [
            "Easy",
            "Medium",
            "Hard"
        ];

        for (
            let i = 0;
            i < words.length;
            i++
        ) {
            if (
                data.bodyStart.includes(
                    words[i]
                )
            ) {
                difficulty =
                    words[i];
                break;
            }
        }

        /*
         * If H1 wasn't found,
         * try extracting title
         * from the page title.
         */
        if (!title) {
            title =
                data.pageTitle
                    .replace(
                        " - LeetCode",
                        ""
                    )
                    .trim();
        }

        if (!title) {
            showError(
                "Page opened, but problem title was not found."
            );
            return;
        }

        currentProblem = {
            title:
                title,
            difficulty:
                difficulty,
            platform:
                "LeetCode",
            url:
                data.url
        };

        displayProblem(
            currentProblem
        );

    } catch (error) {
        console.error(
            "CodePulse ERROR:",
            error
        );

        showError(
            "Chrome blocked page access. Check extension permissions."
        );
    }
}

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
                    ${problem.difficulty || "Not detected"}
                </span>
            </div>
        </div>
    `;

    addProblemButton.disabled = false;
}

function showError(text) {
    problemContainer.innerHTML = `
        <p class="loading">
            ${text}
        </p>
    `;

    addProblemButton.disabled = true;
}

addProblemButton.addEventListener(
    "click",
    function () {
        if (!currentProblem) {
            return;
        }

        message.textContent =
            "Problem detected successfully!";

        console.log(
            "CODEPULSE PROBLEM:",
            currentProblem
        );
    }
);

detectProblem();