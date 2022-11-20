const url = require("url");
const formidable = require("formidable");
const fs = require("fs");

const index_router = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(pathname);

  // renderer function
  const render = (pathToRender) => {
    res.writeHead(200, { "Content-type": "text/html" });
    fs.readFile(pathToRender, "utf-8", (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    });
  };

  // get method handling
  switch (pathname) {
    case "/": //index page
      if (req.method === "GET") {
        render("./views/index.ejs");
      }
      break;

    case "/login": //login page
      if (req.method === "GET") {
        render("./views/login.ejs")
      }
      break;

    default: //404 error
      res.writeHead(404, { "Content-type": "text/html" });
      fs.readFile("./views/errors/404.ejs", "utf-8", (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end();
      });

      break;
  }

  //login post data handling
  if (req.method == "POST" && pathname == "/login") {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      res.writeHead(301, { Location: "/" });
      res.end();
      console.log(fields);
      console.log(files);
    });
  }
};

module.exports = index_router;
