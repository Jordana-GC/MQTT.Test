const brokerURL = "wss://test.mosquitto.org:8081"; // WebSocket MQTT broker URL
const topics = ["test/topic1", "test/topic2", "test/topic3"];

// Connect to the MQTT broker
const client = mqtt.connect(brokerURL);

// On successful connection
client.on("connect", () => {
    console.log("Connected to broker:", brokerURL);
    // Subscribe to all topics
    topics.forEach((topic) => {
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to topic: ${topic}`);
            } else {
                console.error("Subscription error:", err);
            }
        });
    });
});

// On receiving a message
client.on("message", (topic, message) => {
    console.log(`Message received from ${topic}: ${message.toString()}`);
    updateUI(topic, message.toString());
});

// Handle connection errors
client.on("error", (err) => {
    console.error("Connection error:", err);
});

// Update the UI with messages from different topics
function updateUI(topic, message) {
    const container = document.getElementById("data");

    // Check if the topic already exists in the UI
    let topicElement = document.getElementById(topic);
    if (!topicElement) {
        // Create a new element for the topic
        topicElement = document.createElement("div");
        topicElement.id = topic;
        topicElement.innerHTML = `<strong>${topic}</strong>: <span>${message}</span>`;
        container.appendChild(topicElement);
    } else {
        // Update the existing topic's message
        const messageElement = topicElement.querySelector("span");
        messageElement.textContent = message;
    }
}
