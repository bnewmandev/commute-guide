const express = require("express");
const app = express();

require("dotenv").config();

app.get("/ping", (req, res) => {
	res.send("pong");
});

app.listen(process.env.PORT, () => {
	console.log(`Server opened on port ${process.env.PORT}`);
});
