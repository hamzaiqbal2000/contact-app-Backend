const http = require("http");
const axios = require("axios");

const host = "localhost";
const port = 4000;

const requestListener = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days

  if (req.method === "GET" && req.url === "/getUsers") {
    axios
      .get(`https://dummyjson.com/users`)
      .then((data) => {
        res.end(JSON.stringify(data.data.users));
      })
      .catch((err) => console.log(err));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`server is running on https://${host}:${port}`);
});
