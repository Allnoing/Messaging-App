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

//  Function to get the current time in a readable format
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}


// Function to handle sending messages
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim(); // Remove whitespace
    const chatTitle = document.getElementById("chat-title").textContent;

    // Get the current friend from the chat title
    const currentFriend = chatTitle.replace("Chatting with ", "");

    let sender = "me";

    if (message !== "" && currentFriend) {
        // Timestamp for messages
        const Timestamp = getCurrentTime();

        // If there's no conversation for the current friend, create one
        if (!conversations[currentFriend]) {
            conversations[currentFriend] = [];
        }

        // Add the message to the conversation
        conversations[currentFriend].push({ sender: "me", content: message, time: Timestamp });

        // Display the message in the chat area
        const chatMessages = document.getElementById("chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;
        messageDiv.classList.add("message-sent");
        chatMessages.appendChild(messageDiv);

        messageDiv.innerHTML = ` <div>${message}</div> <div class="timestamp">${Timestamp}</div> `;

         // Add Delete button for sent messages
        if (sender === "me" ? "message-sent" : "message-received") {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑️";
            deleteButton.classList.add("delete-button");

            // Attach click event to delete the message
            deleteButton.addEventListener("click", function () {
                deleteMessage(messageDiv, currentFriend, message, Timestamp);
            });

            messageDiv.appendChild(deleteButton);
        } 

        // Append the message to the chat
        chatMessages.appendChild(messageDiv);

        // Scroll to the bottom of the chat area
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Clear the input field for the next message
        messageInput.value = "";

        // Simulates a reply after 2 seconds
        setTimeout(() => simulateReply(currentFriend), 2000);
    }
}

// Lookup object to map keywords to response templates
const replyTemplates = {
    greetings: {
        keywords: ["hello", "hi", "wassup", "sup", "hey"],
        responses: [
            "Hey there! How's it going?",
            "Hi! What's up?",
            "Hello! How can I help you today?",
        ],
    },
    howAreYou: {
        keywords: ["how are you", "how are you doing", "what about you"],
        responses: [
            "I'm just a bunch of code, but thanks for asking! How about you?",
            "Doing great! And yourself?",
            "I'm fantastic! What's new with you?",
        ],
    },
    thankYou: {
        keywords: ["thank you", "thanks"],
        responses: [
            "You're welcome! Let me know if you need anything else.",
            "No problem at all!",
            "Happy to help!",
        ],
    },
    goodbyes: {
        keywords: ["bye", "see you", "see ya", "goodbye", "farewell"],
        responses: [
            "Goodbye! Have a great day!",
            "See you later!",
            "Take care! Talk to you soon.",
        ],
    },
    fallback: {
        keywords: [],
        responses: [
            "That's interesting! Can you tell me more?",
            "Hmm, I’d love to hear more about that.",
            "Oh wow! What else?",
        ],
    },
};

// Utility function to pick a random response from the array
function pickRandom(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to generate a reply based on the user's message
function generateReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase(); // Normalize the input

    // Loop that iterates through the lookup object to find matching keywords
    for (const category in replyTemplates) {
        const { keywords, responses } = replyTemplates[category];
        if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
            // If a keyword matches, pick a random response from the corresponding category
            return pickRandom(responses);
        }
    }

    // If no keywords match, use the fallback responses
    return pickRandom(replyTemplates.fallback.responses);
}

// Simulate a reply using the generateReply function
function simulateReply(friendName) {
    const chatMessages = document.getElementById("chat-messages");

    // Get the last message sent by the user
    const lastMessage = conversations[friendName]?.slice(-1)[0]?.content || "";

    // Generate a reply based on the last message
    const reply = generateReply(lastMessage);

    // Timestamp for messages
    const Timestamp = getCurrentTime();

    // Add the reply to the conversation
    if (!conversations[friendName]) {
        conversations[friendName] = [];
    }
    conversations[friendName].push({ sender: "friend", content: reply });

    // Display the reply in the chat area
    const replyDiv = document.createElement("div");
    replyDiv.textContent = reply;
    replyDiv.classList.add("message-received");

     // reply content and timestamp
     replyDiv.innerHTML = ` <div>${reply}</div> <div class="timestamp">${Timestamp}</div> `;

    chatMessages.appendChild(replyDiv);

    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to trigger pop animation on the Send button
function triggerPopAnimation() {
    const sendButton = document.getElementById("send-button");
    
    // Add the 'pop' class
    sendButton.classList.add("pop");
    
    // Remove the 'pop' class after the animation ends
    setTimeout(() => {
        sendButton.classList.remove("pop");
    }, 200); // Match the animation duration (0.2s)
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

// Function to handle friend selection
function selectFriend(event) {
    // Get all the friend list items
    const allFriends = document.querySelectorAll("#friends-list li span");

    // Remove the active-friend class from all friends
    allFriends.forEach((friend) => {
        friend.classList.remove("active-friend");
    });

    // Add the active-friend class to the clicked friend
    event.target.classList.add("active-friend");

    // Update the chat title with the selected friend's name
    const friendName = event.target.textContent;
    document.getElementById("chat-title").textContent = `Chatting with ${friendName}`;
}

// Function to add a friend (with select functionality)
function addFriend() {
    const friendNameInput = document.getElementById("friend-name");
    const friendName = friendNameInput.value.trim();

    if (friendName !== "") {
        // Get the friends list container
        const friendsList = document.getElementById("friends-list");
        const friendItem = document.createElement("li");

        // Friend name (span for clickable element)
        const friendNameSpan = document.createElement("span");
        friendNameSpan.textContent = friendName;

        // Add click event listener to select this friend
        friendNameSpan.addEventListener("click", selectFriend);

        // Remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            friendsList.removeChild(friendItem);
        });

        // Append elements
        friendItem.appendChild(friendNameSpan);
        friendItem.appendChild(removeButton);
        friendsList.appendChild(friendItem);

        // Clear input
        friendNameInput.value = "";
    } else {
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


// Function to handle deleting messages sent
function deleteMessage(messageDiv, currentFriend, messageContent, Timestamp) {
    const chatMessages = document.getElementById("chat-messages");

    // Removes the message from the Dom
    chatMessages.removeChild(messageDiv);

    // Removes the message from the conversations array
    conversations[currentFriend] = conversations[currentFriend].filter(
        (msg) => !(msg.content === messageContent && msg.time === Timestamp)
    );
}
