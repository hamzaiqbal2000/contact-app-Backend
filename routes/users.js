const express = require("express");
const fs = require("fs");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

// const users = [];

/* GET users listing. */
// router.get("/getUsers", (req, res) => {
//   axios
//     .get(`https://dummyjson.com/users`)
//     .then((data) => {
//       res.write(JSON.stringify(data.data.users));
//       fs.writeFile(
//         "UserData.txt",
//         JSON.stringify(data.data.users),
//         (err, data) => {
//           if (err) {
//             throw err;
//           } else {
//           }
//         }
//       );
//       res.end();
//     })
//     .catch((err) => console.log(err));
// });

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

router.get("/getUsers", verifyToken, (req, res) => {
  fs.readFile("UserData.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else if (data) {
      res.send(JSON.parse(data));
    }
  });
});

router.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  console.log({ id });
  fs.readFile("UserData.txt", "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      const newData = JSON.parse(data);
      const result = newData.filter((obj) => obj.id != id);
      fs.writeFile("UserData.txt", JSON.stringify(result), (err) => {
        if (err) {
          throw err;
        } else {
          res.send({ message: "user card deleted" });
        }
      });
    }
  });
  // res.send("deleted");
});

module.exports = router;
