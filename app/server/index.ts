import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as services from "services";

const application = express();

const appDir = process.env.PWD;

/// use json body parser
application.use(bodyParser.json());

application.use(express.static(path.resolve(appDir, "./public")));
application.use((request, response) => {
    response.sendFile(path.resolve(appDir, "./public/index.html"));
});

application.listen(process.env["PORT"] || 3000, () => {
    console.log("Server Started !");
});

console.log(services);