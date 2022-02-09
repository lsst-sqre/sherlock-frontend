import useSWR from 'swr'
import Service from '../components/service'
import LogTable from '../components/logtable'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const path = require('path');

export default function Environment(props) {
  var statusUrl = path.join(props.url, "status")

  const { data, error } = useSWR(statusUrl, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
    <h3>{props.name} {props.url}</h3>
    {data.map(item =>
      <div key={item.name}>
        <Service name={item.name} status={item.status} />
        <LogTable url={path.join(props.url, "service", item.name, "/")} />
      </div>
    )}
      <LogTable url={path.join(props.url, "errors")} />
    </div>
  );
}
