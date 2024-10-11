const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = "6546219051:AAHmWKloQQurtSw9LqOSuseKb3RSvwNqZeA";

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const message = req.body.message;

  if (message) {
    const chatId = message.chat.id;
    const responseText = message.text;

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

    // if (text === "/start") {
    //   // Handle the 'start' command
    //   console.log("Received /start command from chat:");
    // }
  } else {
    res.send("No message received");
  }
});

app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
