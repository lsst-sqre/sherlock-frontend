import useSWR from 'swr'
import Link from 'next/link'

import Service from '../components/service'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const path = require('path');

export default function Environment(props) {
  const detailsUrl = path.join('/', props.name)
  const statusUrl = path.join(props.url, 'status')
  const { data, error } = useSWR(statusUrl, fetcher)

  if (error) return <div>{props.name} failed to contact</div>
  if (!data) return <div>{props.name} loading...</div>

  const errored = data.filter(s => s.status != 'normal')
  const services = props.all ? data: errored
  const status = errored.length == 0 ? '✅' : '❌'

  return (
    <div>
      <Link href={detailsUrl} passHref>
        <h1>{status} <a>{props.name}</a> {props.url}</h1>
      </Link>

    {services.map(item =>
      <div key={item.name}>
        <Service name={item.name} status={item.status} url={props.url} />
      </div>
    )}
    </div>
  )
}
