// importeer packages van uit node modules
import express from "express";
import fetch from "node-fetch";
import { postJson } from "./helpers/fetchWrapper.js";

//start server met express
const server = express();
// api url as constant onstellen
const url = "https://api.buurtcampus-oost.fdnd.nl/api/v1/";
const query = "stekjes";
//setup server poort
const port = 2200;
server.set(port);
server.listen(port),
  () => {
    console.log("http://localhost:" + port);
  };

// standaard instellen voor data verwerking
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//aangeven hoe de view gerendered moet worden
server.set("view engine", "ejs");
server.set("views", "views");

// public map linken aan ejs
server.use(express.static("public"));

//route voor homepage
server.get("/", function (request, response) {
  // const url = 'https://api.buurtcampus-oost.fdnd.nl/api/v1/'
  // const query = 'stekjes'

  fetch(url + query)
    .then((response) => response.json())
    .then((data) => {
      response.render("index", {
        stekjes: data.stekjes,
      });
    })
    .catch((err) => console.error(err));
});

