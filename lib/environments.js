const fs = require("fs");

let envData = require("/etc/sherlock/environments.json");

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
