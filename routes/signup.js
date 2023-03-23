const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/signup", (req, res) => {
  const usersData = req.body;
  console.log({ usersData });
  fs.readFile("loginData.txt", (err, data) => {
    if (err) {
      throw err;
    }
    console.log("tostring", data.toString());
    data = data.toString();
    let users;
    if (data) {
      users = JSON.parse(data);
    } else {
      users = [];
    }
    users.push(usersData);
    fs.writeFile("loginData.txt", JSON.stringify(users), (err) => {
      if (err) {
        throw err;
      }
      res.status(200).send({ message: "signed up successfully" });
    });
  });
});

module.exports = router;
