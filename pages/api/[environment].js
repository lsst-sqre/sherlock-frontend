import { getEnvironmentData } from "../../lib/environments";

const fs = require("fs");

export default function EnvironmentStatusPush(req, res) {
  let environment = req.query["environment"];
  let envData = getEnvironmentData(environment);

  if (!envData) {
    console.error("Invalid environment " + environment);
    res.status(404).end();
    return;
  }

  if (req.method === "PUT") {
    if (req.headers["authorization"] != "token " + envData.key) {
      res.status(403).end();
      return;
    }

    fs.writeFile("/tmp/" + environment, JSON.stringify(req.body), (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).end();
      }
    });
    res.status(200).json({ status: "ok" });
  } else if (req.method == "GET") {
    fs.readFile("/tmp/" + environment, (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).json(data);
      }
    });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method not allowed" });
  }
}
