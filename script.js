// Switch from Login Page to Chat Page
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form's default behavior (e.g., page refresh)

    // Grab the username from the input field (currently just for display/debug purposes)
    const username = document.getElementById("username").value;

    // Transition: Hide the login page and display the chat page
    document.getElementById("login-page").style.display = "none";
    document.getElementById("chat-page").style.display = "flex";

    // Log the user's login for debugging; you may replace this with backend login logic later
    console.log(`User logged in as: ${username}`);
});

// Handle Sending Messages
document.getElementById("send-button").addEventListener("click", function () {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim(); // Remove whitespace from the message

    if (message !== "") {
        // Grab the chat messages container
        const chatMessages = document.getElementById("chat-messages");

        // Create a new message element and append the user's message
        const newMessage = document.createElement("div");
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);

        // Clear the input field for the next message
        messageInput.value = "";
    }
});

// Add a Friend Function
function addFriend() {
    const friendNameInput = document.getElementById("friend-name");
    const friendName = friendNameInput.value.trim(); // Get and sanitize the input value

    if (friendName !== "") {
        // Get the friends list container
        const friendsList = document.getElementById("friends-list");

        // Create a new list item for the friend
        const friendItem = document.createElement("li");

        // Add the friend's name inside a span for styling/structure
        const friendNameSpan = document.createElement("span");
        friendNameSpan.textContent = friendName;

        // Add a "Remove" button next to the friend's name
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            friendsList.removeChild(friendItem); // Remove the friend from the list
        });

        // Append the friend's name and remove button to the list item
        friendItem.appendChild(friendNameSpan);
        friendItem.appendChild(removeButton);

        // Add the new friend to the friends list
        friendsList.appendChild(friendItem);

        // Clear the input field for the next friend
        friendNameInput.value = "";
    } else {
        // Debug log for invalid or empty input
        console.log("Invalid name. Try again.");
    }
}

// Add Friend on Button Click
document.getElementById("add-friend").addEventListener("click", addFriend); // Trigger adding a friend when the button is clicked

// Add Friend on Enter Key
document.getElementById("friend-name").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or default Enter behavior
        addFriend(); // Trigger the same addFriend function as the button click
    }
});