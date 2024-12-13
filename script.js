// Switch from Login Page to Chat Page
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get username (for now, just a placeholder action)
    const username = document.getElementById("username").value;

    // Hide Login Page, Show Chat Page
    document.getElementById("login-page").style.display = "none";
    document.getElementById("chat-page").style.display = "flex";

    console.log(`User logged in as: ${username}`);
});

// Handle Sending Messages
document.getElementById("send-button").addEventListener("click", function () {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    if (message.trim() !== "") {
        // Add message to chat
        const chatMessages = document.getElementById("chat-messages");
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);

        // Clear input
        messageInput.value = "";
    }
});

// Add a Friend
document.getElementById("add-friend").addEventListener("click", function () {
    const friendNameInput = document.getElementById("friend-name");
    const friendName = friendNameInput.value.trim();

    if (friendName !== "") {
        // Add friend to list
        const friendsList = document.getElementById("friends-list");
        const friendItem = document.createElement("li");

        // Friend name
        const friendNameSpan = document.createElement("span");
        friendNameSpan.textContent = friendName;

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            friendsList.removeChild(friendItem);
        });

        // Append to friend item
        friendItem.appendChild(friendNameSpan);
        friendItem.appendChild(removeButton);

        // Append to list
        friendsList.appendChild(friendItem);

        // Clear input
        friendNameInput.value = "";
    }
});
