var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.disable("etag");

var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);
