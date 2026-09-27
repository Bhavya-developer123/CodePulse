const addProblemButton =
    document.getElementById("addProblemButton");

const message =
    document.getElementById("message");

addProblemButton.addEventListener("click", function () {

    message.textContent =
        "Problem detection will be added next.";

});