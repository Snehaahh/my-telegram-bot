var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json()); // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
); // for parsing application/x-www-form-urlencoded

// This is the route the API will call
app.post("/", function (req, res) {
    const message = req.body.message; // Fix here

    if (!message || message.text.toLowerCase().indexOf("hey") < 0) {
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
            // ...and here if it was not
            console.log("Error :", err);
            res.end("Error :" + err);
        });
});

// Export the app for Vercel
module.exports = app;
