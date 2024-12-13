// Switch from Login Page to Chat Page
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form's default behavior (e.g., page refresh)

    // Grab the username from the input field (currently just for display/debug purposes)
    const username = document.getElementById("username").value;

    // Transition: Hide the login page and display the chat page
    document.getElementById("login-page").style.display = "none";
    document.getElementById("chat-page").style.display = "flex";

    // Log the user's login for debugging; (replace this with backend login logic later)
    console.log(`User logged in as: ${username}`);
});

// placeholder conversations object for storing messages per friend
const conversations = {};

// Load Conversation for selected friend
function loadConversation(friendName) {
    const chatTitle = document.getElementById("chat-title");
    const chatMessages = document.getElementById("chat-messages");

    // Update chat title
    chatTitle.textContent = `chatting with ${friendName}`;

    // Clear previous messages in the chat area
    chatMessages.innerHTML = "";

    // Load messsages for the selected friend
    const messages = conversations[friendName] || [];
    messages.forEach((msg) => {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = msg.content;

        // Style message sent validation based on sender
        if (msg.sender === "me") {
            messageDiv.classList.add("message-sent");
        } else {
            messageDiv.classList.add("message-recieved");
        }

        chatMessages.appendChild(messageDiv);
    });

    // Scorll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight
}


// Function to handle sending messages
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim(); // Remove whitespace
    const chatTitle = document.getElementById("chat-title").textContent;

    // Get the current friend from the chat title
    const currentFriend = chatTitle.replace("Chatting with ", "");

    if (message !== "" && currentFriend) {
        // If there's no conversation for the current friend, create one
        if (!conversations[currentFriend]) {
            conversations[currentFriend] = [];
        }

        // Add the message to the conversation
        conversations[currentFriend].push({ sender: "me", content: message });

        // Display the message in the chat area
        const chatMessages = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add("message-sent");
        chatMessages.appendChild(messageDiv);

        // Scroll to the bottom of the chat area
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Clear the input field for the next message
        messageInput.value = "";
    }
}

// click event listener for the send button
document.getElementById("send-button").addEventListener("click", sendMessage);

// keydown event listener for the Enter key
document.getElementById("message-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter behavior
        sendMessage(); // Call the sendMessage function
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
            friendsList.removeChild(friendItem); // Removes the friend from the list
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
