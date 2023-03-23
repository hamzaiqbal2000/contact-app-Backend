const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const fs = require("fs");
const secretKey = "Damnnn";

router.post("/login", (req, res) => {
  const user = req.body;
  fs.readFile("loginData.txt", (err, data) => {
    if (err) {
      throw err;
    } else {
      const users = JSON.parse(data.toString());
      const foundUser = users.find((obj) => obj.email == user.email);
      console.log({ foundUser });
      if (foundUser.password != user.password) {
        res.send("Incorrect Password");
        return;
      }
      // res.send("correct password");
      const token = jwt.sign(
        user,
        secretKey,
        {
          expiresIn: "3600s",
        }
        // ,
        // (err, token) => {
        //   if (err) {
        //     throw err;
        //   }
        //   // res.send(token);
        // }
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .send({ message: "Logged in successfully 😊 👌" });
    }
  });

  // console.log({ user });
});

module.exports = router;
