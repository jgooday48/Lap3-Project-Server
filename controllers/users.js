const asyncHandler = require("express-async-handler");

const hello = (req, res) => {
    res.send("hellooooo")
}

module.exports = {
    hello,
}
