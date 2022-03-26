const fs = require("fs");

export default function EnvironmentStatusPush(req, res) {
  let environment = req.query["environment"];

  if (req.method === "PUT") {
    console.log(req.body);
    fs.writeFile("/tmp/" + environment, JSON.stringify(req.body), (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: error });
      } else {
        res.status(200);
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
