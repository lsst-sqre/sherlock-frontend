import useSWR from 'swr'

import Service from '../components/service'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const path = require('path');

export default function Environment(props) {
  const statusUrl = path.join(props.url, 'status')
  const { data, error } = useSWR(statusUrl, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const errored = data.filter(s => s.status != 'normal')
  const services = props.all ? data: errored
  const status = errored.length == 0 ? '✅' : '❌'

  return (
    <div>
    <h3>{status} {props.name} {props.url}</h3>
    {services.map(item =>
      <div key={item.name}>
        <Service name={item.name} status={item.status} />
      </div>
    )}
    </div>
  )
}
