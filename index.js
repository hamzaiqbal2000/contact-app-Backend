const http = require("http");
const fs = require("fs");

const host = "localhost";
const port = 4000;

const users = [];

const requestListener = (req, res) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };

  // if (req.method === "GET" && req.url === "/getUsers") {
  //   res.writeHead(200, headers);

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
  // }
  if (req.method === "POST" && req.url === "/addUsers") {
    res.writeHead(201, headers);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      users.push({ ...data });
      console.log("users", users);
      fs.writeFile("UserData.txt", JSON.stringify(users), (err) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("File written successfully");
        }
      });
      res.write(JSON.stringify({ message: "User created successfully" }));
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/getFormUsers") {
    fs.readFile("UserData.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        throw err;
      } else {
        res.writeHead(200, headers);
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, PATCH",
      "Access-Control-Allow-Headers": "*",
    });
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server is running on https://${host}:${port}`);
});
