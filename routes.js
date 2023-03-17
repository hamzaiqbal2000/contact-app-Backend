const express = require("express");
const axios = require("axios");
const fs = require("fs");
const router = express.Router();

// const users = [];

/* GET users listing. */
router.get("/getUsers", (req, res) => {
  axios
    .get(`https://dummyjson.com/users`)
    .then((data) => {
      res.send(data.data.users);
    })
    .catch((err) => console.log(err));
});

router.post("/addUsers", (req, res) => {
  const objData = req.body;
  console.log({ objData });

  fs.readFile("UserData.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else if (data) {
      const users = JSON.parse(data);
      users.push(objData);
      fs.writeFile("UserData.txt", JSON.stringify(users), (err) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("File written successfully");
          res.send({ message: "User created successfully" });
        }
      });
    }
  });
});

router.get("/addFormUsers", (req, res) => {
  fs.readFile("UserData.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else if (data) {
      res.send(JSON.parse(data));
    }
  });
});

module.exports = router;
