const brokerURL = "wss://test.mosquitto.org:8081"; // WebSocket MQTT broker URL
const topic = "test/topic"; // MQTT topic to subscribe to

// Connect to MQTT broker
const client = mqtt.connect(brokerURL);

client.on("connect", () => {
    console.log("Connected to broker");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        } else {
            console.error("Subscription error:", err);
        }
    });
});

// Handle incoming messages
client.on("message", (topic, message) => {
    console.log("Message received:", message.toString());
    document.getElementById("data").textContent = `Topic: ${topic}, Message: ${message}`;
});

// Handle errors
client.on("error", (err) => {
    console.error("Connection error:", err);
});
