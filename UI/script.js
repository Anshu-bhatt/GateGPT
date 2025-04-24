function sendMessage() {
    const userInputField = document.getElementById("userInput");
    const userInput = userInputField.value.trim();

    if (userInput === "") return; // Prevent empty messages

    addMessage(userInput, "user-message");
    userInputField.value = ""; // Clear input after sending
    userInputField.disabled = true; // Disable input while processing

    fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.response || data.response.trim() === "") {
            addMessage("Sorry, I couldn't find an answer. Try a different question.", "bot-message");
        } else {
            addMessage(data.response, "bot-message");
        }
    })
    .catch(error => {
        addMessage("Error fetching response. Please try again later.", "bot-message");
        console.error("Fetch Error:", error);
    })
    .finally(() => {
        userInputField.disabled = false; // Re-enable input
        userInputField.focus(); // Set focus back to input field
    });
}

function addMessage(message, className) {
    const chatContainer = document.getElementById("chatContainer");
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);

    // Auto-scroll to the latest message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
