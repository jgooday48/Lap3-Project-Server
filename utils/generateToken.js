// const jwt = require("jsonwebtoken")

// const generateToken = (res, userId) => {
//     const token = jwt.sign({userId}, process.env.JWT_SECRET, {   
//         expiresIn: "30d"
//     })

//     res.cookie("jwt", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "development",
//         sameSite: "strict",
//         maxAge: 30*24*60*60*1000
//     })
// }

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        resolve(token);
      }
    });
  });
};

module.exports = generateToken;
