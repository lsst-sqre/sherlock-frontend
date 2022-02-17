import LogLink from '../components/loglink'

const path = require('path');

export default function Service(props) {
  const logsUrl = path.join(props.url, 'service', props.name, '/')
  const errorsUrl = path.join(logsUrl, 'errors')

  var status = '✅'
  var links = <LogLink url={logsUrl} label='Logs' title={`Logs for ${props.name}`} />

  if (props.status != 'normal') {
    status = '❌'
    links += <LogLink url={errorsUrl} label='Errors' title={`Errors for ${props.name}`} />
  }

  return (
    <div>
      {status} {props.name} {links}
    </div>
  );
}
