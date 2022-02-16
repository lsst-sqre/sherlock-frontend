export function getEnvironmentData(environment) {
  return getEnvironments().find(e => e.params.environment == environment).params
}

export function getEnvironments() {
  return [
    {
      params: {
        environment: "minikube",
        url: "https://minikube.lsst.codes/sherlock/"
      }
    },
    {
      params: {
        environment: "lsst-lsp-stable",
        url: "https://minikube.lsst.codes/sherlock/"
      }
    },
  ]
}
