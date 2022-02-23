export function getEnvironmentData(environment) {
  return getEnvironments().find((e) => e.params.environment == environment)
    .params;
}

export function getEnvironments() {
  return [
    {
      params: {
        environment: "data",
        url: "https://data.lsst.cloud/sherlock/",
      },
    },
    {
      params: {
        environment: "data-int",
        url: "https://data-int.lsst.cloud/sherlock/",
      },
    },
    {
      params: {
        environment: "data-dev",
        url: "https://data-dev.lsst.cloud/sherlock/",
      },
    },
    {
      params: {
        environment: "minikube",
        url: "https://minikube.lsst.codes/sherlock/",
      },
    },
  ];
}
