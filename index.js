const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual bot token
const BOT_TOKEN = "6546219051:AAHmWKloQQurtSw9LqOSuseKb3RSvwNqZeA";

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const body = req.body;
  console.log("Getting message:", body);

  if (body) {
    const chatId = body.message.from.id;
    // Splitting ['/start 001'] and retrieving 001
    const text = body.message.text.split(" ")[1];

    // Send a reply to the user
    axios
      .post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: text,
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
