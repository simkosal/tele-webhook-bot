const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual bot token
const BOT_TOKEN = "6546219051:AAHmWKloQQurtSw9LqOSuseKb3RSvwNqZeA";

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const message = req.body.message;

  if (message) {
    console.log("Getting message:", message);
    const chatId = message.message_id;
    // Splitting ['/start 001'] and retrieving 001
    const responseText = message.text.split(" ")[1];

    // Send a reply to the user
    axios
      .post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: responseText,
      })
      .then(() => {
        res.send("Message sent");
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        res.send("Error sending message");
      });
  } else {
    res.send("No message received");
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
