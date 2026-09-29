function getApiErrorMessage(error) {

    if (!error.response) {
        return "Unable to connect to the server.";
    }

    const status = error.response.status;

    if (status === 400) {
        return "Invalid request.";
    }

    if (status === 401) {
        return "Your session has expired. Please login again.";
    }

    if (status === 403) {
        return "You do not have permission to perform this action.";
    }

    if (status === 404) {
        return "The requested resource was not found.";
    }

    if (status === 409) {
        return "This data already exists.";
    }

    if (status >= 500) {
        return "Server error. Please try again later.";
    }

    return "Something went wrong. Please try again.";
}

export default getApiErrorMessage;