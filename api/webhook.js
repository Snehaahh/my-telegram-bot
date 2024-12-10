const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json()); // For parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // For parsing application/x-www-form-urlencoded
// This is the route the API will call
app.post("/", function (req, res) {
  // Log the incoming request body to check the structure
  console.log("Incoming request body:", req.body);
  // Ensure the message is correctly extracted from the request body
  const message = req.body?.message;  // Using optional chaining to prevent errors if message is undefined

  if (!message || !message.text || message.text.toLowerCase().indexOf("hey") < 0) {
    // If no message or message doesn't contain "hey", do nothing
    return res.end();
  }
  // Respond with "heyyy!!" if "hey" is found in the message
  axios
    .post(
      "https://api.telegram.org/bot7182128495:AAGXGWKwBXtjFVjkG14hwnVEPmkEndvRn0I/sendMessage",
      {
        chat_id: message.chat.id,
        text: "heyyy!!",
      }
    )
    .then((response) => {
      // We get here if the message was successfully posted
      console.log("Message posted");
      res.end("ok");
    })
    .catch((err) => {
      // Handle error and log it
      console.log("Error:", err);
      res.end("Error: " + err);
    });
});
// Export the app for Vercel
module.exports = app;
