const fs = require("fs");

let rawdata = fs.readFileSync("/etc/sherlock/environments.json");
let envData = JSON.parse(rawdata);

export function getEnvironments() {
  return envData;
}

export function getEnvironmentData(environment) {
  let env = getEnvironments().find((e) => e.params.environment == environment);

  if (env) {
    return env.params;
  } else {
    return null;
  }
}
