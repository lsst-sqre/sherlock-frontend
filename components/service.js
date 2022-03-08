import LogLink from "../components/loglink";

const path = require("path");

export default function Service(props) {
  const logsUrl = props.url + "service/" + props.name + "/";
  const errorsUrl = logsUrl + "errors";

  var status = "✅";
  const logs = (
    <LogLink url={logsUrl} label="Logs" title={`Logs for ${props.name}`} />
  );

  if (props.status != "normal") {
    status = "❌";
    const errors = (
      <LogLink
        url={errorsUrl}
        label="Errors"
        title={`Errors for ${props.name}`}
      />
    );
  }

  return (
    <div>
      {status} {props.name} {logs} {errors}
    </div>
  );
}
